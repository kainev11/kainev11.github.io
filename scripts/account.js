let profileBlock = document.querySelector(".header__nav_profile");
let button = profileBlock.querySelector(".header__nav_profile-button");
let listOpened = false;
button.addEventListener("click", function() {
    listOpened = !listOpened;
    button.classList.toggle("header__nav_profile-button-opened");
    
});