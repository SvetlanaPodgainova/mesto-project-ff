// открытие модальныx окон

export function openModal(popup) {
  popup.classList.add("popup_is-opened");
  popup.addEventListener("click", closeModalByBtn);
  popup.addEventListener("click", closeModelOverlay);
  document.addEventListener("keydown", closeModalByEsc);
}

// закрытие модальных окон

export function closeModal(popup) {
  popup.classList.remove("popup_is-opened");
  popup.removeEventListener("click", closeModalByBtn);
  popup.removeEventListener("click", closeModelOverlay);
  document.removeEventListener("keydown", closeModalByEsc);
}

// закрытие модального окна по кнопке-крестику

function closeModalByBtn(evt) {
  if (evt.target.classList.contains("popup__close")) {
    closeModal(evt.target.closest(".popup"));
  }
}

// закрытие модального окна по ESC

function closeModalByEsc(evt) {
  if (evt.key === "Escape") {
    closeModal(document.querySelector(".popup_is-opened"));
  }
}

// закрытие модального окна кликом на оверлей

function closeModelOverlay(evt) {
  if (evt.target.classList.contains("popup_is-opened")) {
    closeModal(evt.target.closest(".popup"));
    evt.stopPropagation();
  }
}
