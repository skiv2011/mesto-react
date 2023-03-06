import React from 'react';
import api from '../Utils/Api';
import Card from './Card';

const Main = (props) => {
    const [userName, setUserName] = React.useState('');
    const [userDescription, setUserDescription] = React.useState('');
    const [userAvatar, setUserAvatar] = React.useState('');
    const [cards, setCards] = React.useState([]);
    React.useEffect(
        function getInitialInfo() {
            Promise.all([
                api.getUserInfo(),
                api.getInitialCards()])
                .then(([user, initialCards]) => {
                    setUserName(user.name);
                    setUserDescription(user.about);
                    setUserAvatar(user.avatar);
                    setCards(initialCards);
                })
                .catch((err) => {
                    console.log(err);
                })
        }, []);

    return (
        <main className="main">
            <section className="profile">
                <div className="profile__user">
                    <div className="profile__avatar" onClick={props.onEditAvatar}>
                        <img className="profile__avatar-img" src={userAvatar} alt="фото пользователя" />
                    </div>
                    <div className="profile__info">
                        <h1 className="profile__title">{userName}</h1>
                        <button aria-label="Редактировать" className="profile__edit-button" type="button" onClick={props.onEditProfile}></button>
                        <p className="profile__subtitle">{userDescription}</p>
                    </div>
                </div>
                <button aria-label="Добавить" className="profile__add-button" type="button" onClick={props.onAddPlace}></button>
            </section>

            <section className="elements">
                <ul className="element">
                    {cards.map((card) => (
                        <Card card={card} key={card._id} onCardClick={props.onCardClick} />
                    ))}
                </ul>
            </section>
        </main>
    );
}

export default Main;

