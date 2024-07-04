import "./pages/index.css";
import { initialCards } from "./components/cards";
import {
  cardsTemplate,
  addCard,
  deleteCard,
  likeCard,
} from "./components/card";
import { openModal, closeModal } from "./components/modal";

// профиль пользователя

const popupProfileEdit = document.querySelector(".popup_type_edit");
const buttonProfileEdit = document.querySelector(".profile__edit-button");

const userName = document.querySelector(".profile__title");
const userJob = document.querySelector(".profile__description");

const userForm = popupProfileEdit.querySelector(".popup__form");
const nameInput = userForm.querySelector(".popup__input_type_name");
const jobInput = userForm.querySelector(".popup__input_type_description");

// слушатели

userForm.addEventListener("submit", handleProfileFormSubmit);
buttonProfileEdit.addEventListener("click", openPopupUserProfile);

// открытие формы с заполненными данными

function openPopupUserProfile() {
  nameInput.value = userName.textContent;
  jobInput.value = userJob.textContent;
  openModal(popupProfileEdit);
}

// обработчик для кнопки "Сохранить" в форме профиля

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  userName.textContent = nameInput.value;
  userJob.textContent = jobInput.value;
  closeModal(popupProfileEdit);
}

// -------------------------------------------------------------------------->

// добавление новой карточки пользователем

const popupNewCard = document.querySelector(".popup_type_new-card");
const newCardForm = popupNewCard.querySelector(".popup__form");
const newCardButton = document.querySelector(".profile__add-button");

// слушатели

newCardButton.addEventListener("click", () => {
  openModal(popupNewCard);
});
newCardForm.addEventListener("submit", handleFormNewCard);

// обработчик для кнопки "Сохранить" в форме добавления новой карточки

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

  cardsList.prepend(
    addCard(newCardUser, deleteCard, likeCard, openPopupImage)
  );
  closeModal(popupNewCard);
  newCardForm.reset();
}

// -------------------------------------------------------------------------->

// попап для картинок

const popupCardImage = document.querySelector(".popup_type_image");

// открытие формы с отображением картинки и названия

function openPopupImage(link, name) {
  const popupImage = popupCardImage.querySelector(".popup__image");
  const popupCaption = popupCardImage.querySelector(".popup__caption");
  popupImage.src = link;
  popupImage.alt = name;
  popupCaption.textContent = name;
  openModal(popupCardImage);
}

// -------------------------------------------------------------------------->

// вывести карточки на страницу

const cardsList = document.querySelector(".places__list");

initialCards.forEach(function (item) {
  cardsList.append(addCard(item, deleteCard, likeCard, openPopupImage));
});

// -------------------------------------------------------------------------->
