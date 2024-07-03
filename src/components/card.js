export {
  cardsTemplate,
  addCard,
  deleteCard,
  likeCard,
};

// @todo: Темплейт карточки

const cardsTemplate = document.querySelector("#card-template").content;


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
