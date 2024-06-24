import '../pages/index.css';

const cardsList = document.querySelector('.places__list');

// @todo: Темплейт карточки

const cardsTemplate = document.querySelector('#card-template').content;

// @todo: DOM узлы

// @todo: Функция создания карточки

function addCard (card, deleteCard) {
  const cardsItem = cardsTemplate.querySelector('.card').cloneNode(true);
  
  const cardImage = cardsItem.querySelector('.card__image');
  cardImage.src = card.link;
  cardImage.alt = `фотография ${card.name}`;
  
  const cardTitle = cardsItem.querySelector('.card__title');
  cardTitle.textContent = card.name;

  const deleteButton = cardsItem.querySelector('.card__delete-button');
  deleteButton.addEventListener('click', deleteCard);  
  
  return cardsItem;
}

// @todo: Функция удаления карточки

function deleteCard (event) {
  const deletedCard = event.target.closest('.card')
  deletedCard.remove()
}

// @todo: Вывести карточки на страницу

initialCards.forEach(function(card) {
  cardsList.append(addCard(card, deleteCard));
})
