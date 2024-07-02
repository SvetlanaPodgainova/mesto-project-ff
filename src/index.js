import "./pages/index.css";
import { openModal, openPopupImg } from "./components/modal";
import {
  initialCards,
  cardsTemplate,
  cardsList,
  addCard,
  deleteCard,
  likeCard,
} from "./components/cards";

// Кнопки для вызова форм

const editProfileButton = document.querySelector(".profile__edit-button");
const addNewCardButton = document.querySelector(".profile__add-button");

// Виды попапов

const popupProfileEdit = document.querySelector(".popup_type_edit");
const popupNewCard = document.querySelector(".popup_type_new-card");
const popupForImage = document.querySelector(".popup_type_image");

// Редактирование профиля пользователя

const userName = document.querySelector(".profile__title");
const userJob = document.querySelector(".profile__description");

const popupUserForm = document.querySelector(".popup__form");
const nameInput = popupUserForm.querySelector(".popup__input_type_name");
const jobInput = popupUserForm.querySelector(".popup__input_type_description");

function openPopupUserProfile() {
  nameInput.value = userName.textContent;
  jobInput.value = userJob.textContent;
  openModal(popupProfileEdit);
}

// function handleFormSubmit(evt) {
//   evt.preventDefault();
//   nameInput.value = .textContent;
//   jobInput.value = .textContent;

// }



editProfileButton.addEventListener("click", openPopupUserProfile);
addNewCardButton.addEventListener("click", () => {
  openModal(popupNewCard);
});
// popupEditUser.addEventListener('submit', handleFormSubmit);

// Вывести карточки на страницу

initialCards.forEach(function (item) {
  cardsList.append(addCard(item, deleteCard, likeCard));
});
