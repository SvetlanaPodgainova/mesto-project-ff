export {addCard };
import { likeCard, unlikeCard } from "./api";

// @todo: Темплейт карточки

const cardsTemplate = document.querySelector("#card-template").content;

// @todo: Функция создания карточки

function addCard(card, myId, openPopupImage, openPopupDeleteCard) {
  const cardsItem = cardsTemplate.querySelector(".card").cloneNode(true);

  const cardImage = cardsItem.querySelector(".card__image");
  cardImage.src = card.link;
  cardImage.alt = `фотография ${card.name}`;

  cardImage.addEventListener("click", () => {
    openPopupImage(card);
  });

  const cardTitle = cardsItem.querySelector(".card__title");
  cardTitle.textContent = card.name;

  // лайки

  const likeButton = cardsItem.querySelector(".card__like-button");

  countLikes(card.likes.length);

  // проверка на мой Id

  function checkForMyId() {
    return card.likes.some(({ _id }) => {
      return _id === myId;
    });
  }

  if (checkForMyId()) {
    likeButton.classList.add("card__like-button_is-active");
  }

  // отображение счетчика лайков

  function countLikes(likesLength) {
    cardsItem.querySelector(".card__like-counter").textContent = likesLength;
    if (likesLength > 0) {
      cardsItem.querySelector(".card__like-counter").style.display = "inline";
    } else {
      cardsItem.querySelector(".card__like-counter").style.display = "none";
    }
  }

  // слушатель для кнопки лайка

  likeButton.addEventListener("click", (evt) => {
    if (!evt.target.classList.contains("card__like-button_is-active")) {
      likeCard(card._id)
      .then((data) => {
        countLikes(data.likes.length);
        evt.target.classList.add("card__like-button_is-active");
      })
      .catch(err => renderError(err))
    } else {
      unlikeCard(card._id)
      .then((data) => {
        countLikes(data.likes.length);
        evt.target.classList.remove("card__like-button_is-active");
      })
      .catch(err => renderError(err))
    }
  });

  // удаление карточки

  const deleteButton = cardsItem.querySelector(".card__delete-button");

  // слушатель с проверкой на Id

  if (card.owner._id === myId) {
    deleteButton.addEventListener("click", () => {
      openPopupDeleteCard(card, cardsItem);
    });
  } else {
    deleteButton.style.display = "none";
  }

  return cardsItem;
}
