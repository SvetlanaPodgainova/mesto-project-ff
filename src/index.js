import "./pages/index.css";
import {
  initialCards,
  cardsTemplate,
  cardsList,
  addCard,
  deleteCard,
} from "./components/cards";


// Константы кнопок вызова форм

const editProfileButton = document.querySelector(".profile__edit-button"); 
const addNewCardButton = document.querySelector(".profile__add-button");



// Константы попапов

const popupProfileEdit = document.querySelector(".popup_type_edit");
const popupNewCard = document.querySelector(".popup_type_new-card");



// Слушатели

editProfileButton.addEventListener("click", () => {
  openModal(popupProfileEdit);
});
addNewCardButton.addEventListener("click", () => {
  openModal(popupNewCard);
});



// Открытие модальныx окон

function openModal(modalWindow) {
  modalWindow.classList.add("popup_is-opened");
  document.addEventListener("click", closeModalByBtn);
  document.addEventListener("keydown", closeModalByEsc);
  document.addEventListener("click", closeModelOverlay);
}

// Закрытие модальных окон

function closeModal(modalWindow) {
  modalWindow.classList.remove("popup_is-opened");
  document.removeEventListener("click", closeModalByBtn);
  document.removeEventListener("keydown", closeModalByEsc);
  document.removeEventListener("keydown", closeModelOverlay);
}

// Закрытие модального окна по кнопке

function closeModalByBtn(evt) {
  if (evt.target.closest(".popup__close")) {
    const closedModal = evt.target.closest(".popup");
    closeModal(closedModal);
  }
}

// Закрытие модального окна по ESC

function closeModalByEsc(evt) {
  if (evt.key === "Escape") {
    const modalForClose = document.querySelector(".popup_is-opened");
    closeModal(modalForClose);
  }
}

// Закрытие модального окна кликом на оверлей

function closeModelOverlay(evt) {
  if (evt.target.closest(".popup_is-opened")) {
    const modalForClose = document.querySelector(".popup_is-opened");
    closeModal(modalForClose);
  }
}
