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
  clearValidation(popupProfileEdit, validationConfig);
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

const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inputErrorClass: "popup__input_type_error",
  errorSpanClass: "popup__input-error_active",
};

// добавляет класс с ошибкой

function showInputError(formElement, formInput, errorMessage) {
  const errorSpan = formElement.querySelector(`.${formInput.id}-error`);

  formInput.classList.add(validationConfig.inputErrorClass);
  errorSpan.textContent = errorMessage;
  errorSpan.classList.add(validationConfig.errorSpanClass);
}

// удаляет класс с ошибкой

function hideInputError(formElement, formInput) {
  const errorSpan = formElement.querySelector(`.${formInput.id}-error`);

  formInput.classList.remove(validationConfig.inputErrorClass);
  errorSpan.textContent = "";
  errorSpan.classList.remove(validationConfig.errorSpanClass);
}

// проверяет валидность поля

function checkInputValidity(formElement, formInput) {
  if (formInput.validity.patternMismatch) {
    formInput.setCustomValidity(formInput.dataset.errorMessage);
  } else {
    formInput.setCustomValidity("");
  }

  if (!formInput.validity.valid) {
    showInputError(formElement, formInput, formInput.validationMessage);
  } else {
    hideInputError(formElement, formInput);
  }
}

// добавляем слушатель всем формам

function setEventListeners(formElement) {
  const inputList = Array.from(
    formElement.querySelectorAll(validationConfig.inputSelector)
  );
  const formButton = formElement.querySelector(
    validationConfig.submitButtonSelector
  );

  inputList.forEach((formInput) => {
    formInput.addEventListener("input", () => {
      checkInputValidity(formElement, formInput);
      toggleButtonState(inputList, formButton);
    });
  });
}

// находим, перебираем и вешаем слушателя на все формы на сайте

function enableValidation() {
  const formList = Array.from(
    document.querySelectorAll(validationConfig.formSelector)
  );

  formList.forEach((formElement) => {
    setEventListeners(formElement);
  });
}

// проверка инпутов на валидность (возваращает true если поле не валидно)

function hasInvalidInput(inputList) {
  return inputList.some((formInput) => {
    return !formInput.validity.valid;
  });
}

// переключение состояние кнопки

function toggleButtonState(inputList, formButton) {
  if (hasInvalidInput(inputList)) {
    formButton.disabled = true;
  } else {
    formButton.disabled = false;
  }
}

// очистка ошибок валидации вызовом clearValidation

function clearValidation(formElement, validationConfig) {
  const inputList = Array.from(
    formElement.querySelectorAll(validationConfig.inputSelector)
  );

  inputList.forEach((formInput) => {
    hideInputError(formElement, formInput);
  });
  toggleButtonState(
    inputList,
    formElement.querySelector(validationConfig.submitButtonSelector)
  );
}

enableValidation();
