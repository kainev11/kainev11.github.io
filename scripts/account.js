let profileBlock = document.querySelector(".header__nav_profile");
let button = profileBlock.querySelector(".header__nav_profile-button");
let profileMenu = profileBlock.querySelector(".header__nav_profile-menu");
button.addEventListener("click", function () {
    button.classList.toggle("header__nav_profile-button-opened");
    profileMenu.classList.toggle("header__nav_profile-menu-opened");
});

let notificationButton = document.querySelector(".header__nav_menu-button");
let notificationCount = document.querySelectorAll(".header__nav_menu-notification.new").length;
let notifications = document.querySelectorAll(".header__nav_menu-notification");
let notificationBlock = document.querySelector(".header__nav_menu-notifications");
let notificationCounter = notificationButton.querySelector(".header__nav_menu-notifications-counter");
notificationButton.addEventListener("click", function () {
    notificationButton.classList.toggle("header__nav_menu-button-active");
    notificationBlock.classList.toggle("header__nav_menu-notifications-opened");
    notificationCounter.innerHTML = 0;
    if (!notificationButton.classList.contains("header__nav_menu-button-active")) {
        for (let i = 0; i < notificationCount; i++) 
            notifications[i].classList.remove("new");
    }
    
});
