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

// Модальное окна редактора профиля

const editProfileButton = document.querySelector(".profile__edit-button");

editProfileButton.addEventListener("click", () => {
  openModal(popupProfileEdit);
});

// Попап добавления новой карточки

const popupNewCard = document.querySelector(".popup_type_new-card");
const addNewCardButton = document.querySelector(".profile__add-button");

addNewCardButton.addEventListener("click", () => {
  openModal(popupNewCard);
});

// Открытие модальныx окон

function openModal(modalWindow) {
  modalWindow.classList.add("popup_is-opened");
  document.addEventListener("click", closeModalByBtn);
  document.addEventListener("keydown", closeModalByEsc);
}

// Закрытие модальных окон

function closeModal(modalWindow) {
  modalWindow.classList.remove("popup_is-opened");
  document.removeEventListener("click", closeModalByBtn);
  document.removeEventListener("keydown", closeModalByEsc);
}

// Закрытие модального окна по кнопке

function closeModalByBtn(evt) {
  if (evt.target.classList.contains("popup__close")) {
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

// function closeModalByEsc(evt) {
//   if (evt.key === 'Escape') {
//     const modalClosed = document.querySelector('.popup_is-opened');
//     closeModal(modalClosed);
//   }
// }
