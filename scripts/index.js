import "../pages/index.css";
import Api from "../utils/Api.js";

function handleUserInfo(userData) {
  // Set the avatar image source
  const profileAvatarEl = document.querySelector(".profile__avatar");
  profileAvatarEl.src = userData.avatar;

  // Set the user name text
  const profileNameEl = document.querySelector(".profile__name");
  profileNameEl.textContent = userData.name;

  // Optionally, set other fields like description if needed
  const profileDescriptionEl = document.querySelector(".profile__description");
  profileDescriptionEl.textContent = userData.about;
}

const initialCards = [
  {
    name: "Golden Gate Bridge",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/7-photo-by-griffin-wooldridge-from-pexels.jpg",
  },
  {
    name: "Val Thorens",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/1-photo-by-moritz-feldmann-from-pexels.jpg",
  },
  {
    name: "Restaurant terrace",
    link: "../images/2-photo-by-ceiline-from-pexels_compressed.jpg",
  },
  {
    name: "An outdoor cafe",
    link: "../images/3-photo-by-tubanur-dogan-from-pexels_compressed.jpg",
  },
  {
    name: "A very long bridge, over the forest communist",
    link: "../images/4-photo-by-maurice-laschet-from-pexels.webp",
  },

  {
    name: "Tunnel with morning light",
    link: "../images/5-photo-by-van-anh-nguyen-from-pexels.webp",
  },

  {
    name: "Mountain house",
    link: "../images/6-photo-by-moritz-feldmann-from-pexels.jpg",
  },
];

const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "c56e30dc-2883-4270-a59e-b2f7bae969c6",
    "Content-Type": "application/json",
  },
});

function handleUserInfo(data) {
  profileNameEl.textContent = data.name;
  profileDescriptionEl.textContent = data.about;
}

api
  .getAppInfo()
  .then(([cards, userData]) => {
    handleUserInfo(userData);

    cards.forEach((item) => {
      const cardElement = getCardElement(item);
      cardsList.append(cardElement);
    });
  })
  .catch(console.error);

const editProfileBtn = document.querySelector(".profile__edit-btn");
const editProfileModal = document.querySelector("#edit-profile-modal");
const editProfileCloseBtn = editProfileModal.querySelector(".modal__close-btn");
const editProfileForm = editProfileModal.querySelector(".modal__form");
const cardFormSubmitBtn = editProfileModal.querySelector(".modal__button");
const editProfileNameInput = editProfileModal.querySelector(
  "#profile-name-input",
);

const editProfileDescriptionInput = editProfileModal.querySelector(
  "#profile-description-input",
);

const newPostBtn = document.querySelector(".profile__new-post-btn");
const newPostModal = document.querySelector("#new-post-modal");
const newPostCloseBtn = newPostModal.querySelector(".modal__close-btn");
const newPostForm = newPostModal.querySelector(".modal__form");
const newPostFormSubmit = newPostModal.querySelector(".modal__submit-btn");

const profileNameEl = document.querySelector(".profile__name");
const profileDescriptionEl = document.querySelector(".profile__description");

const cardTemplate = document
  .querySelector("#card-template")
  .content.querySelector(".card");
const cardsList = document.querySelector(".cards__list");

const previewModal = document.querySelector("#preview-modal");
const previewModalCloseBtn = previewModal.querySelector(".modal__close-btn");
const previewImageEl = previewModal.querySelector(".modal__image");
const previewCaption = previewModal.querySelector(".modal__caption");

function getCardElement(data) {
  const cardElemant = cardTemplate.cloneNode(true);
  const cardTitleEl = cardElemant.querySelector(".card__title");
  const cardImageEl = cardElemant.querySelector(".card__image");

  cardImageEl.src = data.link;
  cardImageEl.alt = data.name;
  cardTitleEl.textContent = data.name;

  const cardLikeButton = cardElemant.querySelector(".card__like-button");
  cardLikeButton.addEventListener("click", () => {
    cardLikeButton.classList.toggle("card__like-button_active");
  });

  const cardDeleteButton = cardElemant.querySelector(".card__delete-button");
  cardDeleteButton.addEventListener("click", () => {
    cardElemant.remove();
  });
  cardImageEl.addEventListener("click", () => {
    previewImageEl.src = data.link;
    previewImageEl.alt = data.name;
    previewCaption.textContent = data.name;
    openModal(previewModal);
  });

  return cardElemant;
}

previewModalCloseBtn.addEventListener("click", function () {
  closeModal(previewModal);
});

function openModal(modal) {
  modal.classList.add("modal_is-open");
}

function closeModal(modal) {
  modal.classList.remove("modal_is-open");
}

function handleDeleteSubmit(evt) {
  evt.preventDefault();

  api
    .deleteCard(selectedCardId)
    .then(() => {
      selectedCard.remove();
      closeModal(deleteModal);
    })
    .catch(console.error);
}

function handleLike(evt, id) {
  const isLiked = evt.target.classList.contains("card__like-btn_active");

  api
    .handleLike(id, isLiked)
    .then((updatedCard) => {
      if (updatedCard.isLiked) {
        evt.target.classList.add("card__like-btn_active");
      } else {
        evt.target.classList.remove("card__like-btn_active");
      }
    })
    .catch(console.error);
}

// profile
const editModalBtn = document.querySelector(".profile__edit-btn");
const cardModalBtn = document.querySelector(".profile__new-post-btn");
const avatarModalBtn = document.querySelector(".profile__avatar-btn");
const profileNameEl = document.querySelector(".profile__name");
const profileDescriptionEl = document.querySelector(".profile__description");
// AvatarEditBox
const avatarModal = document.querySelector("#avatar-modal");
const avatarForm = avatarModal.querySelector(".modal__form");
const avatarSubmitBtn = avatarModal.querySelector(".modal__button");
const avatarCloseBtn = avatarModal.querySelector(".modal__close");
const avatarInput = avatarModal.querySelector("#profile-avatar-input");
// delete form elements
const deleteModal = document.querySelector("#delete-modal");
const deleteForm = deleteModal.querySelector(".modal__form:");

editProfileBtn.addEventListener("click", function () {
  editProfileNameInput.value = profileNameEl.textContent;
  editProfileDescriptionInput.value = profileDescriptionEl.textContent;
  resetValidation(editProfileForm, settings);
  openModal(editProfileModal);
});

editProfileCloseBtn.addEventListener("click", function () {
  closeModal(editProfileModal);
});

newPostBtn.addEventListener("click", function () {
  openModal(newPostModal);
});

newPostCloseBtn.addEventListener("click", function () {
  closeModal(newPostModal);
});

function handleEditProfileSubmit(evt) {
  evt.preventDefault();

  const submitBtn = evt.subtter;
  submitBtn.textContent = "Saving...";

  api
    .editUserInfo({
      name: nameInput.value,
      about: descriptionInput.value,
    })
    .then((userData) => {
      profileNameEl.textContent = userData.name;
      profileDescriptionEl.textContent = userData.about;
      closeModal(editProfileModal);
    })
    .catch(console.error);
  submitBtn.textContent = "Save";
}

editProfileForm.addEventListener("submit", handleEditProfileSubmit);

const captionInput = newPostForm.querySelector("#caption-input");
const cardImageInput = newPostForm.querySelector("#card-image-input");

function handleAddCardSubmit(evt) {
  evt.preventDefault();
  const cardElemant = getCardElement({
    name: captionInput.value,
    link: cardImageInput.value,
  });
  cardsList.prepend(cardElemant);
  evt.target.reset();
  disableButton(newPostFormSubmit);
  closeModal(newPostModal);
}
newPostForm.addEventListener("submit", handleAddCardSubmit);

deleteForm.addEventListener("submit", handleDeleteSubmit);

resetValidation(editProfileForm, settings);

function handleEscClose(evt) {
  if (evt.key === "Escape") {
    const openedModal = document.querySelector(".modal_is-open");
    if (openedModal) {
      closeModal(openedModal);
    }
  }
}

function openModal(modal) {
  modal.classList.add("modal_is-open");
  document.addEventListener("keydown", handleEscClose);
}

function closeModal(modal) {
  modal.classList.remove("modal_is-open");
  document.removeEventListener("keydown", handleEscClose);
}

document.querySelectorAll(".modal").forEach((modal) => {
  modal.addEventListener("mousedown", (evt) => {
    if (evt.target === modal) {
      closeModal(modal);
    }
  });
});

avatarModalBtn.addEventListener("click", () => {
  openModal(avatarModal);
});

avatarCloseBtn.addEventListener("click", () => {
  closeModal(avatarModal);
});

function handleAvatarSubmit(evt) {
  evt.preventDefault();

  console.log(avatarInput.value);

  api
    .editAvatarInfo(avatarInput.value)
    .then((data) => {
      console.log(data.avatar);
      closeModal(avatarModal);
    })
    .catch(console.error);
}

function handleDeleteCard(cardElemant, cardId) {
  selectedCard = cardElemant;
  selectedCardId = cardId;
  openModal(deletModal);
}

// const settings = {
//   formSelector: ".modal__form",
//   inputSelector: ".modal__input",
//   submitButtonSelector: ".modal__button",
//   inactiveButtonClass: "modal__button_disabled",
//   inputErrorClass: "modal__input_type_error",
//   errorClass: "modal__input-error_active",
// };
