export { cardsTemplate, addCard, deleteCard };
import { likeCard, unlikeCard } from "./api";

// @todo: Темплейт карточки

const cardsTemplate = document.querySelector("#card-template").content;

// @todo: Функция создания карточки

function addCard(card, myId, deleteCard, openPopupImage) {
  const cardsItem = cardsTemplate.querySelector(".card").cloneNode(true);

  const cardImage = cardsItem.querySelector(".card__image");
  cardImage.src = card.link;
  cardImage.alt = `фотография ${card.name}`;

  cardImage.addEventListener("click", () => {
    openPopupImage(card.link, card.name);
  });

  const cardTitle = cardsItem.querySelector(".card__title");
  cardTitle.textContent = card.name;

  const deleteButton = cardsItem.querySelector(".card__delete-button");
  deleteButton.addEventListener("click", () => {
    deleteCard(cardsItem);
  });

  const likeButton = cardsItem.querySelector(".card__like-button");

  countLikes(card.likes.length);

  // проверка и отображение только моих лайков

  function checkLikeId() {
    return card.likes.some(({ _id }) => {
      return _id === myId;
    });
  }

  if (checkLikeId()) {
    likeButton.classList.add("card__like-button_is-active");
  }

  // отображение счетчика лайков

  if (card.likes.length > 0) {
    cardsItem.querySelector(".card__like-counter").style.display = "inline";
  }

  // слушатель для кнопки лайка

  likeButton.addEventListener("click", (evt) => {
    if (!evt.target.classList.contains("card__like-button_is-active")) {
      likeCard(card._id).then((data) => {
        countLikes(data.likes.length);
        evt.target.classList.add("card__like-button_is-active");
      });
    } else {
      unlikeCard(card._id).then((data) => {
        countLikes(data.likes.length);
        evt.target.classList.remove("card__like-button_is-active");
      });
    }
  });

  function countLikes(likesLength) {
    cardsItem.querySelector(".card__like-counter").textContent = likesLength;
  }

  return cardsItem;
}

// @todo: Функция удаления карточки

function deleteCard(item) {
  item.remove();
}
