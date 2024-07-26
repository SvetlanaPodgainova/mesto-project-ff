// Валидация форм

export { clearValidation, enableValidation };

// Валидация форм

// добавляет класс с ошибкой

function showInputError(
  formElement,
  formInput,
  errorMessage,
  validationConfig
) {
  const errorSpan = formElement.querySelector(`.${formInput.id}-error`);

  formInput.classList.add(validationConfig.inputErrorClass);
  errorSpan.textContent = errorMessage;
  errorSpan.classList.add(validationConfig.errorSpanClass);
}

// удаляет класс с ошибкой

function hideInputError(formElement, formInput, validationConfig) {
  const errorSpan = formElement.querySelector(`.${formInput.id}-error`);

  formInput.classList.remove(validationConfig.inputErrorClass);
  errorSpan.textContent = "";
  errorSpan.classList.remove(validationConfig.errorSpanClass);
  formInput.setCustomValidity("");
}

// проверяет валидность поля

function checkInputValidity(formElement, formInput, validationConfig) {
  if (formInput.validity.patternMismatch) {
    formInput.setCustomValidity(formInput.dataset.errorMessage);
  } else {
    formInput.setCustomValidity("");
  }

  if (!formInput.validity.valid) {
    showInputError(formElement, formInput, formInput.validationMessage, validationConfig);
  } else {
    hideInputError(formElement, formInput, validationConfig);
  }
}

// добавляем слушатель всем формам

function setEventListeners(formElement, validationConfig) {
  const inputList = Array.from(
    formElement.querySelectorAll(validationConfig.inputSelector)
  );
  const formButton = formElement.querySelector(
    validationConfig.submitButtonSelector
  );

  inputList.forEach((formInput) => {
    formInput.addEventListener("input", () => {
      checkInputValidity(formElement, formInput, validationConfig);
      toggleButtonState(inputList, formButton);
    });
  });
}

// находим, перебираем и вешаем слушателя на все формы на сайте

function enableValidation(validationConfig) {
  const formList = Array.from(
    document.querySelectorAll(validationConfig.formSelector)
  );

  formList.forEach((formElement) => {
    setEventListeners(formElement, validationConfig);
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
    hideInputError(formElement, formInput, validationConfig);
  });
  toggleButtonState(
    inputList,
    formElement.querySelector(validationConfig.submitButtonSelector)
  );
}
