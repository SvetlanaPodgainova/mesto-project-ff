const countLikes = (info) => {
  const likeCounter = cardElement.querySelector(".card__like-button_counter");
  likeCounter.textContent = info;
};

//слушатель на лайк
likeBtn.addEventListener("click", function (evt) {
  like(evt.target, card, countLikes);
});

function like(button, card, countLikes) {
  if (button.classList.contains("card__like-button_is-active")) {
    unlikeCard(card)
      .then((data) => {
        button.classList.remove("card__like-button_is-active");
        countLikes(data.likes.length);
      })
      .catch((err) => {
        console.log(err);
      });
  } else {
    likeCard(card)
      .then((data) => {
        countLikes(data.likes.length);
        button.classList.add("card__like-button_is-active");
      })
      .catch((err) => {
        console.log(err);
      });
  }
}


// проверка на айди для отображения моих лайков
const isMyLike = card.likes.some(({_id}) => {
  return _id === myId
});

if (isMyLike) {
  likeBtn.classList.add('card__like-button_is-active')
};