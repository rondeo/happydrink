import React, { Component } from 'react'

import '../css/AddEstablishment.css'

export default class AddEstablishment extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: '',
            description: '',
            id: ''
        }
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    render() {
        const { handleSubmit } = this.props

        return (
            <form id="addEstablishment" onSubmit={(e, data) => { e.preventDefault(); handleSubmit(this.state) }} >
                <p>Add a new bar :</p>
                <input type="text" placeholder="id" name="id" id="id" onChange={(e) => { this.handleChange(e) }} />
                <input type="text" placeholder="name" name="name" id="name" onChange={(e) => { this.handleChange(e) }} />
                <br/>
                <textArea type="text" placeholder="description" name="description" id="description" onChange={(e) => { this.handleChange(e) }}></textArea>
                <br/>
                <button type="submit">Submit</button>
            </form>
        )
    }
}