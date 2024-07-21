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

// обработчик для кнопки "Сохранить" в форме профиля

function handleProfileFormSubmit(evt) {
  evt.preventDefault();

  const userConfig = {
    name: nameInput.value,
    about: jobInput.value,
  };

  updateUserInfo(userConfig).then((data) => {
    renderUserInfo(data);
  });

  closeModal(popupProfileEdit);
}

// заполняет профиль данными с сервера

function renderUserInfo(data) {
  userName.textContent = data.name;
  userDescription.textContent = data.about;
}

// обновляет данные пользователя на сервере

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

// Валидация форм

enableValidation();

// -------------------------------------------------------------------------->

// API

const config = {
  baseUrl: "https://mesto.nomoreparties.co/wff-cohort-19",
  headers: {
    authorization: "59657830-69a6-429d-89da-23a4d1d1cdd0",
    "Content-Type": "application/json",
  },
};

// проверяем статус ответа

function checkResStatus(res) {
  if (res.ok) {
    return res.json();
  } else {
    return Promise.reject(`Ошибка: ${res.status}`);
  }
}

// запрашиваем данные пользователя

function getUserInfo() {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers,
    method: "GET",
  }).then((res) => checkResStatus(res));
}

getUserInfo().then((data) => {
  console.log(data);
});

// заполняет профиль данными с сервера

// function renderUserInfo(data) {
//   userName.textContent = data.name
//   userDescription.textContent = data.about
// }

// обновляет данные пользователя на сервере

function updateUserInfo(info) {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers,
    method: "PATCH",
    body: JSON.stringify({
      name: info.name,
      about: info.about,
    }),
  }).then((res) => checkResStatus(res));
}
