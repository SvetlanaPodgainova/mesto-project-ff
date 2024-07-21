import "./pages/index.css";
import { initialCards } from "./components/cards";
import {
  cardsTemplate,
  addCard,
  deleteCard,
  likeCard,
} from "./components/card";
import { openModal, closeModal } from "./components/modal";
import {
  validationConfig,
  clearValidation,
  enableValidation,
} from "./components/validation";
import {
  getUserInfo,
  getCardInfo,
  updateUserInfo,
  updateCardInfo,
  deleteCardById,
} from "./components/api";

// профиль пользователя

const popupProfileEdit = document.querySelector(".popup_type_edit");
const buttonProfileEdit = document.querySelector(".profile__edit-button");

const userName = document.querySelector(".profile__title");
const userDescription = document.querySelector(".profile__description");
const userAvatar = document.querySelector(".profile__image");

const userForm = popupProfileEdit.querySelector(".popup__form");
const nameInput = userForm.querySelector(".popup__input_type_name");
const jobInput = userForm.querySelector(".popup__input_type_description");

// слушатели

userForm.addEventListener("submit", handleProfileFormSubmit);
buttonProfileEdit.addEventListener("click", openPopupUserProfile);

// открытие формы с заполненными данными

function openPopupUserProfile() {
  nameInput.value = userName.textContent;
  jobInput.value = userDescription.textContent;
  clearValidation(popupProfileEdit, validationConfig);
  openModal(popupProfileEdit);
}

// заполняет профиль данными с сервера

function renderUserInfo(data) {
  userName.textContent = data.name;
  userDescription.textContent = data.about;
}

// обработчик для кнопки "Сохранить" в форме профиля

function handleProfileFormSubmit(evt) {
  evt.preventDefault();

  const userConfig = {
    name: nameInput.value,
    about: jobInput.value,
  };

  updateUserInfo(userConfig).then((data) => renderUserInfo(data));

  closeModal(popupProfileEdit);
}

// -------------------------------------------------------------------------->

// добавление новой карточки пользователем

const popupNewCard = document.querySelector(".popup_type_new-card");
const newCardForm = popupNewCard.querySelector(".popup__form");
const newCardButton = document.querySelector(".profile__add-button");

// слушатели

newCardButton.addEventListener("click", () => {
  newCardForm.reset();
  clearValidation(popupNewCard, validationConfig);
  openModal(popupNewCard);
});
newCardForm.addEventListener("submit", handleFormNewCard);

// вывести карточки на страницу

const cardsList = document.querySelector(".places__list");

// отрисовывает начальные карточки из сервера

function renderCardInfo(data) {
  data.forEach((item) => {
    cardsList.prepend(addCard(item, deleteCard, likeCard, openPopupImage));
  });
}

// обработчик для кнопки "Сохранить" в форме добавления новой карточки

function handleFormNewCard(evt) {
  evt.preventDefault();

  const newPlaceName = newCardForm.querySelector(
    ".popup__input_type_card-name"
  );
  const newPlaceLink = newCardForm.querySelector(".popup__input_type_url");

  const newCardConfig = {
    name: newPlaceName.value,
    link: newPlaceLink.value,
  };

  updateCardInfo(newCardConfig).then((data) => renderCardInfo(data));

  closeModal(popupNewCard);
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

// -------------------------------------------------------------------------->

// включение валидации форм

enableValidation();

// -------------------------------------------------------------------------->

Promise.all([getUserInfo(), getCardInfo()])
  .then(([userInfo, cardInfo]) => {
    const myId = userInfo._id;
    renderUserInfo(userInfo);
    renderCardInfo(cardInfo);
  })
  .catch((err) => {
    console.log(err);
  });
