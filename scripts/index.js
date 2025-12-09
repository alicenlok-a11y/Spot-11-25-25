const editbtn = document.querySelector(".profile__edit-btn");
const editProfileModal = document.querySelector("#edi-profile-modal");
const editbtnclose = document.querySelector(".modal__close-btn");

const newPstBtn = document,querySelector(".profile__new-post-btn")
const newPostModal = document.querySelector("#new-post-modal")
const newPostCloseBtn = document.querySelector(".modal__close-btn")

editbtn.addEventListener("click", function () {
  editProfileModal.classList.add("modal__is-opened")
}

editbtnclose.addEventListener("click", function () {
  editProfileModal.classList.remove("modal__is-opened")
}

newPstBtn.addEventListener("click", function () {
  newPostModal.classList.add("modal__is-opened");
}

newPostCloseBtn.addEventListener("click", function () {
  newPostModal.classList.remove("modal__is-opened");
}