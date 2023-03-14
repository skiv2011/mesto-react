import React from 'react';
import {CurrentUserContext} from '../contexts/CurrentUserContext';

export default function Card(props) {

    const currentUser = React.useContext(CurrentUserContext);

    function handleClick() {
        props.onCardClick(props.card);
    }
    return (
        <li className="element__card">
            <img className="element__image" src={props.card.link} alt={props.card.name} onClick={handleClick} />
            <button aria-label="Удалить" className="element__button-delete" type="button"></button>
            <div className="element__discription">
                <h2 className="element__subtitle">{props.card.name ?? 'Картинка без названия'}</h2>
                <div className="element__like-container">
                    <button aria-label="Лайк" className="element__button-like" type="button"></button>
                    <span className="element__like-count">{props.card.likes?.length ?? 0}</span>
                </div>
            </div>
        </li>
    );
}