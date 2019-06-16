import React, { Component } from 'react'
import logo from '../assets/logo.svg'
import '../css/App.css'

import Establishment from './establishments/Establishment'
import AddEstablishment from './AddEstablishment'

import {base} from '../base'

import { library } from '@fortawesome/fontawesome-svg-core'
import { faThumbsDown, faThumbsUp, faStar } from '@fortawesome/free-solid-svg-icons'

library.add(faThumbsDown, faThumbsUp, faStar)

export default class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            pseudo: "Inconnu",
            establishments: [],
            userSearch: ""
        }
    }

    handleChange = (e) => {
        this.setState({
            userSearch: e.target.value.toLowerCase()
        })
    }

    randomPseudo = () => {
        let randomPseudo = ""
        const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
        const size = Math.floor(Math.random() * 10) + 5
        for( let i=0; i < size; i++ ){
            randomPseudo += possible.charAt(Math.floor(Math.random() * possible.length))
        }
        this.setState({
            pseudo : randomPseudo
        })
    }

    addVote = (key, vote) => {
        let establishments = this.state.establishments.map((establishment) => {
            if (establishment.key === key) {
                if (vote === 'up') {
                    establishment.like += 1
                } else if (vote === 'down') {
                    establishment.dislike += 1
                }
            }
            return establishment
        })
        this.setState({
            establishments: establishments
        })
    }

    toggleFav = (key) => {
        let establishments = this.state.establishments.map((establishment) => {
            if (establishment.key === key) {
                establishment.fav = !establishment.fav
            }
            return establishment
        })
        this.setState({
            establishments: establishments
        })
    }

    handleSubmit = (data) => {
        console.log('submit', data)
        data.like = 0
        data.dislike = 0
        data.fav = 0
        let establishments = [...this.state.establishments, data]
        this.setState({
            establishments: establishments
        })
    }

    componentWillMount() {
        console.log('Will mount')
    }

    componentDidMount() {
        console.log('Did mount')
        this.firebase = base.syncState('establishments', {
            context: this,
            state: 'establishments',
            asArray: true
        })
    }

    componentWillUnmount() {
        console.log('Will unmount')
        base.removeBinding(this.firebase)
    }

    render() {
        const { title } = this.props
        const { pseudo, userSearch, establishments } = this.state

        console.log(establishments)

        const searchedEstablishments = establishments.filter((establishment) => {
                let toMatch = (`${establishment.name} ${establishment.description}`).toLowerCase()
                return toMatch.includes(userSearch)
            })

        const listEstablishments = searchedEstablishments.map(establishment => {
            return (
                <Establishment establishment={establishment} key={establishment.key} addVote={ this.addVote } fav={ establishment.fav } toggleFav={ this.toggleFav } />
            )
        })

        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <h3>Welcome { pseudo } to { title }</h3>
                </header>

                <div className="App-intro">
                    <span className="changePseudo" onClick={() => { this.randomPseudo() } }>
                        Changer le pseudo !
                    </span>

                    <div>
                        <input 
                            className="userInput" 
                            type="text" 
                            placeholder="search" 
                            value={ this.userSearch } 
                            onChange={(e) => { this.handleChange(e) }} 
                        />
                    </div>

                    <AddEstablishment handleSubmit={ this.handleSubmit } />
                    
                    { establishments[0] ?
                        listEstablishments
                    :
                        <div>Loading...</div>
                    }
                </div>
            </div>
        )
    }
}