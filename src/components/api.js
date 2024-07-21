export { getUserInfo, getCardInfo, updateUserInfo, updateCardInfo, deleteCardById};

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

function deleteCardById(id) {
  return fetch(`${config.baseUrl}/cards/${id}`, {
    headers: config.headers,
    method: 'DELETE',
  })
  .then(res => checkResultStatus(res))
}



