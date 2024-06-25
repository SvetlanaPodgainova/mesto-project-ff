import "./pages/index.css";
import {
  initialCards,
  cardsTemplate,
  cardsList,
  addCard,
  deleteCard,
} from "./scripts/cards";

// Модальное окно редактирования профиля

const popupProfileEdit = document.querySelector(".popup_type_edit");
const profileEditForm = popupProfileEdit.querySelector(".popup__form");
const profileNameInput = profileEditForm.querySelector(
  ".popup__input_type_name"
);
const profileJobInput = profileEditForm.querySelector(
  ".popup__input_type_description"
);

// Поля формы заполнены информацией из профиля

const profileTitle = document.querySelector("profile__title");
const profileDescription = profileEditForm.querySelector(
  ".profile__description"
);

// function handleEditForm() {
//   profileNameInput.value = profileTitle.textContent;
//   profileJobInput.value = profileDescription.textContent;
//  }

const editProfileButton = document.querySelector(".profile__edit-button");
editProfileButton.addEventListener("click", () => {
  openModal(popupProfileEdit);
});

// Функция открытия модального окна

function openModal(modalWindow) {
  modalWindow.classList.add("popup_is-opened");
  document.addEventListener("keydow", closePopupEsc);
}

// Функция закрытия модального окна
function closeModal(modalWindow) {
  modalWindow.classList.remove("popup_is-opened");
}

Закрытие модального окна оп ESC

function closeModalByEsc(evt) {
  if (evt.key === 'Escape') {
    const modalClosed = document.querySelector('.popup_is-opened')
      closeModal(modalClosed)
  }
}

