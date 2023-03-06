import React from 'react';
import '../index.css';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({ isOpen: false, link: '#', name: '#' });

  React.useEffect(() => {
    const handleEscClose = (evt) => {
      closeAllPopups(evt);
    }
    if (isEditProfilePopupOpen || isAddPlacePopupOpen || isEditAvatarPopupOpen || selectedCard.isOpen) {
      document.addEventListener('keydown', handleEscClose);
    }
    else {
      document.removeEventListener('keydown', handleEscClose);
    }
    return () => {
      document.removeEventListener('keydown', handleEscClose);
    }
  }, [isEditProfilePopupOpen, isAddPlacePopupOpen, isEditAvatarPopupOpen, selectedCard.isOpen]);

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }
  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }
  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }
  function handleCardClick(card) {
    setSelectedCard({ isOpen: true, link: card.link, name: card.name });
  };

  function closeAllPopups(evt) {
    if (evt.target === evt.currentTarget || evt.key === 'Escape') {
      setIsAddPlacePopupOpen(false);
      setIsEditProfilePopupOpen(false);
      setIsEditAvatarPopupOpen(false);
      setSelectedCard({ isOpen: false, link: '#', name: '#' });
    }
  }

  return (
    <div className="page">
      <Header />
      <Main
        onEditProfile={handleEditProfileClick}
        onEditAvatar={handleEditAvatarClick}
        onAddPlace={handleAddPlaceClick}
        onCardClick={handleCardClick}
      />
      <Footer />
      <PopupWithForm
        title="Редактировать профиль"
        name="edit"
        buttonTitle="Сохранить"
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}>
        <form className="popup__form popup__form-edit" name="profile" noValidate>
          <fieldset className="popup__field">
            <input type="text" className="popup__decription popup__decription_type_name" name="name" id="input-name"
              placeholder="имя" minLength="2" maxLength="40" required />
            <span className="popup__error" id="input-name-error"></span>
            <input type="text" className="popup__decription popup__decription_type_job" name="job" id="input-job"
              placeholder="о себе" minLength="2" maxLength="200" required />
            <span className="popup__error" id="input-job-error"></span>
          </fieldset>
        </form>
      </ PopupWithForm>

      <PopupWithForm
        title="Обновить аватар"
        name="avatar"
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
        buttonTitle="Сохранить">
        <form className="popup__form popup__form-edit-avatar" name="form_avatar" noValidate>
          <fieldset className="popup__field">
            <input type="url" className="popup__decription popup__decription_type_link" name="avatar" id="input-avatar"
              placeholder="Ссылка на аватар" required />
            <span className="popup__error" id="input-avatar-error"></span>
          </fieldset>
        </form>
      </ PopupWithForm>

      <PopupWithForm
        title="Новое место"
        name="card"
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}
        buttonTitle="Создать">
        <form className="popup__form popup__form-add" name="add-plase" noValidate>
          <fieldset className="popup__field">
            <input type="text" className="popup__decription popup__decription_type_title" name="title" id="input-title"
              placeholder="Название" minLength="2" maxLength="30" required />
            <span className="popup__error" id="input-title-error"></span>
            <input type="url" className="popup__decription popup__decription_type_link" name="link" id="input-link"
              placeholder="Ссылка на картинку" required />
            <span className="popup__error" id="input-link-error"></span>
          </fieldset>
        </form>
      </ PopupWithForm>
      <ImagePopup card={selectedCard} onClose={closeAllPopups} />
      <PopupWithForm title="Вы уверены?"
        name="delete"
        buttonText='Да'>
      </PopupWithForm>
    </div>
  );
}

export default App;
