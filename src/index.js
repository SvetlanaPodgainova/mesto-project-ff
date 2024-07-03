import "./pages/index.css";
import { openModal, closeModal } from "./components/modal";
import {
  initialCards,
  cardsTemplate,
  cardsList,
  addCard,
  deleteCard,
  likeCard,
} from "./components/cards";

// Профиль пользователя

const popupProfileEdit = document.querySelector(".popup_type_edit");
const userForm = document.querySelector(".popup__form");
const editProfileButton = document.querySelector(".profile__edit-button");
const nameInput = userForm.querySelector(".popup__input_type_name");
const jobInput = userForm.querySelector(".popup__input_type_description");
const userName = document.querySelector(".profile__title");
const userJob = document.querySelector(".profile__description");

// Слушатели

userForm.addEventListener("submit", handleFormSubmit);
editProfileButton.addEventListener("click", openPopupUserProfile);

// Открытие формы с заполненными данными

function openPopupUserProfile() {
  nameInput.value = userName.textContent;
  jobInput.value = userJob.textContent;
  openModal(popupProfileEdit);
}

// Обработчик для кнопки "Сохранить" в форме профиля

function handleFormSubmit(evt) {
  evt.preventDefault();
  userName.textContent = nameInput.value;
  userJob.textContent = jobInput.value;
  closeModal(popupProfileEdit);
}

// -------------------------------------------------------------------------->

// Добавление новой карточки пользователем

const popupNewCard = document.querySelector(".popup_type_new-card");
const newCardForm = popupNewCard.querySelector(".popup__form");
const newCardButton = document.querySelector(".profile__add-button");

// Слушатели

newCardButton.addEventListener("click", () => {
  openModal(popupNewCard);
});
newCardForm.addEventListener("submit", handleFormNewCard);

// Обработчик для кнопки "Сохранить" в форме добавления новой карточки

function handleFormNewCard(evt) {
  evt.preventDefault();

  const newPlaceName = newCardForm.querySelector(
    ".popup__input_type_card-name"
  );
  const newPlaceLink = newCardForm.querySelector(".popup__input_type_url");

  const newCardUser = {
    name: newPlaceName.value,
    link: newPlaceLink.value,
  };

  cardsList.prepend(addCard(newCardUser, deleteCard, likeCard));
  closeModal(popupNewCard);
  newCardForm.reset(); 
}

// -------------------------------------------------------------------------->

// Вывести карточки на страницу

initialCards.forEach(function (item) {
  cardsList.append(addCard(item, deleteCard, likeCard));
});
