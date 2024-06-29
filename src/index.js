import "./pages/index.css";
import { openModal, openPopupImg } from "./components/modal";
import {
  initialCards,
  cardsTemplate,
  cardsList,
  addCard,
  deleteCard,
  likeCard
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

// Вывести карточки на страницу

initialCards.forEach(function (item) {
  cardsList.append(addCard(item, deleteCard, likeCard));
});


