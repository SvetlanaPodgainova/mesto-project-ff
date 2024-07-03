import { openModal } from "./modal";

export {
  initialCards,
  cardsTemplate,
  cardsList,
  addCard,
  deleteCard,
  likeCard,
};

const initialCards = [
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];

// @todo: Темплейт карточки

const cardsTemplate = document.querySelector("#card-template").content;
const cardsList = document.querySelector(".places__list");



// @todo: Функция создания карточки

function addCard(card, deleteCard, likeCard, openPopupImage) {
  const cardsItem = cardsTemplate.querySelector(".card").cloneNode(true);

  const cardImage = cardsItem.querySelector(".card__image");
  cardImage.src = card.link;
  cardImage.alt = `фотография ${card.name}`;

  cardImage.addEventListener("click", openPopupImage);

  const cardTitle = cardsItem.querySelector(".card__title");
  cardTitle.textContent = card.name;

  const deleteButton = cardsItem.querySelector(".card__delete-button");

  deleteButton.addEventListener("click", () => {
    deleteCard(cardsItem);
  });

  const likeButton = cardsItem.querySelector(".card__like-button");

  likeButton.addEventListener("click", likeCard);

  return cardsItem;
}

// @todo: Функция удаления карточки

function deleteCard(item) {
  item.remove();
}

// Лайк карточки

function likeCard(evt) {
  if (evt.target.closest(".card__like-button")) {
    evt.target.classList.toggle("card__like-button_is-active");
  }
}
