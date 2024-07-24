export {
  getUserInfo,
  getCardInfo,
  updateUserInfo,
  updateCardInfo,
  likeCard,
  unlikeCard,
  updateUserAvatar,
  handleDeletCardSubmit,
};

const config = {
  baseUrl: "https://mesto.nomoreparties.co/wff-cohort-19",
  headers: {
    authorization: "59657830-69a6-429d-89da-23a4d1d1cdd0",
    "Content-Type": "application/json",
  },
};

// проверяем статус ответа

function checkResultStatus(res) {
  if (res.ok) {
    return res.json();
  } else {
    return Promise.reject(`Ошибка: ${res.status}`);
  }
}

// запрашиваем данные пользователя с сервера

function getUserInfo() {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers,
    method: "GET",
  }).then((res) => checkResultStatus(res));
}

// обновляет данные пользователя на сервере

function updateUserInfo(info) {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers,
    method: "PATCH",
    body: JSON.stringify({
      name: info.name,
      about: info.about,
    }),
  }).then((res) => checkResultStatus(res));
}

// запрашиваем данные для карточек с сервера

function getCardInfo() {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers,
    method: "GET",
  }).then((res) => checkResultStatus(res));
}

// добавляем новую карточку на сервер

function updateCardInfo(card) {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers,
    method: "POST",
    body: JSON.stringify({
      name: card.name,
      link: card.link,
    }),
  }).then((res) => checkResultStatus(res));
}

// запутить лайк

function likeCard(cardID) {
  return fetch(`${config.baseUrl}/cards/like/${cardID}`, {
    headers: config.headers,
    method: "PUT",
  }).then((res) => checkResultStatus(res));
}

// удалить лайк с сервера

function unlikeCard(cardID) {
  return fetch(`${config.baseUrl}/cards/like/${cardID}`, {
    headers: config.headers,
    method: "DELETE",
  }).then((res) => checkResultStatus(res));
}

// обновляем аватар пользователя на сервере

function updateUserAvatar(info) {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    headers: config.headers,
    method: "PATCH",
    body: JSON.stringify({
      avatar: info.avatar,
    }),
  }).then((res) => checkResultStatus(res));
}

// удалить карточку с сервера

function handleDeletCardSubmit(card) {
  return fetch(`${config.baseUrl}/cards/${card._id}`, {
    headers: config.headers,
    method: "DELETE",
  })
  .then(res => checkResultStatus(res))  
}


