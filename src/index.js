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

// профиль пользователя

const popupProfileEdit = document.querySelector(".popup_type_edit");
const editProfileButton = document.querySelector(".profile__edit-button");

const userName = document.querySelector(".profile__title");
const userJob = document.querySelector(".profile__description");

const userForm = popupProfileEdit.querySelector(".popup__form");
const nameInput = userForm.querySelector(".popup__input_type_name");
const jobInput = userForm.querySelector(".popup__input_type_description");

// слушатели

userForm.addEventListener("submit", handleFormSubmit);
editProfileButton.addEventListener("click", openPopupUserProfile);

// открытие формы с заполненными данными

function openPopupUserProfile() {
  nameInput.value = userName.textContent;
  jobInput.value = userJob.textContent;
  openModal(popupProfileEdit);
}

// обработчик для кнопки "Сохранить" в форме профиля

function handleFormSubmit(evt) {
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

  cardsList.prepend(addCard(newCardUser, deleteCard, likeCard, openPopupImage));
  closeModal(popupNewCard);
  newCardForm.reset();
}

// -------------------------------------------------------------------------->

// открыть картинку в модальном окне
const popupCardImage = document.querySelector(".popup_type_image");

// открытие формы с заполненными данными

function openPopupImage(evt) {
  const card = evt.target.closest(".card");
  const cardImg = card.querySelector(".card__image");
  const cardTitle = card.querySelector(".card__title");
  
  const popupImage = popupCardImage.querySelector(".popup__image");
  const popupCaption = popupCardImage.querySelector(".popup__caption");

  popupImage.src = cardImg.src;
  popupImage.alt = cardImg.alt;
  popupCaption.textContent = cardTitle.textContent;
  openModal(popupCardImage);
}

// слушатели

// вывести карточки на страницу

initialCards.forEach(function (item) {
  cardsList.append(addCard(item, deleteCard, likeCard, openPopupImage));
});

// -------------------------------------------------------------------------->
