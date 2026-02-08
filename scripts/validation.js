const settings = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__submit-btn",
  inactiveButtonClass: "modal__submit-btn_disabled",
  inputErrorClass: "modal__input_state_error",
  errorClass: "modal__error",
};

const showInputError = (formElement, inputElement, errorMsg, config) => {
  const errorMsgElement = formElement.querySelector(
    `#${inputElement.id}-error`,
  );
  errorMsgElement.textContent = errorMsg;
  inputElement.classList.add(config.inputErrorClass);
  errorMsgElement.style.display = "block";
};

const hideInputError = (formElement, inputElement, config) => {
  const errorMsgElement = formElement.querySelector(
    `#${inputElement.id}-error`,
  );
  errorMsgElement.textContent = "";
  inputElement.classList.remove(config.inputErrorClass);
  errorMsgElement.style.display = "none";
};

const checkInputValidity = (formElement, inputElement, config) => {
  if (!inputElement.validity.valid) {
    showInputError(
      formElement,
      inputElement,
      inputElement.validationMessage,
      config,
    );
  } else {
    hideInputError(formElement, inputElement, config);
  }
};

const hasInvalidInput = (inputList, buttonElement) => {
  inputList.some((input) => {
    return !input.validity.valid;
  });
};

const toggleButtonState = (inputList, buttonElement, config) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.disabled = true;
    buttonElement.classList.add("config.inactiveButtonClass");
  } else {
    buttonElement.disabled = false;
    buttonElement.classList.remove("config.inactiveButtonClass");
  }
};

const resetValidation = (formElement, config) => {
  const inputList = Array.from(
    formElement.querySelectorAll(config.inputSelector),
  );
  inputList.forEach((input) => {
    hideInputError(formElement, input, config);
  });

  const buttonElement = formElement.querySelector(config.submitButtonSelector);
  if (buttonElement) {
    toggleButtonState(inputList, buttonElement, config);
  }
};

const setEventListeners = (formElement, config) => {
  const inputList = Array.from(
    formElement.querySelectorAll(config.inputSelector),
  );
  const buttonElement = formElement.querySelector(config.submitButtonSelector);

  toggleButtonState(inputList, buttonElement, config);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", function () {
      checkInputValidity(formElement, inputElement, config);
      toggleButtonState(inputList, buttonElement, config);
    });
  });
};

const disableButton = (buttonElement) => {
  buttonElement.disabled = true;
  buttonElement.classList.add("config.inactiveButtonClass");
};

const enableValidation = (config) => {
  const formList = Array.from(document.querySelectorAll(config.formSelector));
  formList.forEach((formElement) => {
    setEventListeners(formElement, config);
  });
};

enableValidation(settings);
