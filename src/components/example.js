
const popupEditUser = document.querySelector('.popup__form');
const nameInput = popupEditUser.querySelector('.popup__input_type_name');
const jobInput = popupEditUser.querySelector('.popup__input_type_description');


function handleFormSubmit(evt) {
    evt.preventDefault(); 
    nameInput.value = document.querySelector('.profile__title').textContent;
    jobInput.value = document.querySelector('.profile__description').textContent;

}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
popupEditUser.addEventListener('submit', handleFormSubmit);