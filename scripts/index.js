document.addEventListener("DOMContentLoaded", function () {
  // Edit Profile Modal
  const editBtn = document.querySelector(".profile__edit-btn");
  const editProfileModal = document.querySelector("#edit-profile-modal");
  const editBtnClose = editProfileModal?.querySelector(".modal__close-btn");

  // New Post Modal
  const newPostBtn = document.querySelector(".profile__new-post-btn");
  const newPostModal = document.querySelector("#new-post-modal");
  const newPostCloseBtn = newPostModal?.querySelector(".modal__close-btn");

  // Only add event listeners if elements exist
  if (editBtn && editProfileModal && editBtnClose) {
    editBtn.addEventListener("click", function () {
      editProfileModal.classList.add("modal__is-opened");
    });

    editBtnClose.addEventListener("click", function () {
      editProfileModal.classList.remove("modal__is-opened");
    });
  }

  if (newPostBtn && newPostModal && newPostCloseBtn) {
    newPostBtn.addEventListener("click", function () {
      newPostModal.classList.add("modal__is-opened");
    });

    newPostCloseBtn.addEventListener("click", function () {
      newPostModal.classList.remove("modal__is-opened");
    });
  }
});
