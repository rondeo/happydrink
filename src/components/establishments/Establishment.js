import React from 'react'
import '../../css/establishment.css'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Establishement = ({establishment, addVote, fav, toggleFav}) => {
    return (
        <li key={establishment.key} className='establishment'>
            <FontAwesomeIcon className={ "fav " + (fav ? "active" : "")} icon="star" onClick={() => { toggleFav(establishment.key)}} />
            <h3>{ establishment.name }</h3>
            <p>{ establishment.description }</p>
            <div id="votesLayout">
                <span className="vote" onClick={() => { addVote(establishment.key, 'up') }}>
                    <FontAwesomeIcon icon="thumbs-up" /> | { establishment.like }
                </span>
                <span className="vote" onClick={() => { addVote(establishment.key, 'down') }}>
                    <FontAwesomeIcon icon="thumbs-down" /> |  { establishment.dislike }
                </span>
            </div>
        </li>
    )
}

export default Establishement