// Валидация форм

export { validationConfig, clearValidation, enableValidation };

const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inputErrorClass: "popup__input-type-error",
  errorClass: "popup__input-error_active",
};

// добавляет класс с ошибкой

function showInputError(formElement, formInput, errorMessage) {
  const errorSpan = formElement.querySelector(`.${formInput.id}-error`);

  formInput.classList.add(validationConfig.inputErrorClass);
  errorSpan.textContent = errorMessage;
  errorSpan.classList.add(validationConfig.errorClass);
}

// удаляет класс с ошибкой

function hideInputError(formElement, formInput) {
  const errorSpan = formElement.querySelector(`.${formInput.id}-error`);

  formInput.classList.remove(validationConfig.inputErrorClass);
  errorSpan.textContent = "";
  errorSpan.classList.remove(validationConfig.errorClass);
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

  toggleButtonState(inputList, formButton);

  inputList.forEach((formInput) => {
    formInput.addEventListener("input", () => {
      checkInputValidity(formElement, formInput);
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
