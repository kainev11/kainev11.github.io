let profileBlock = document.querySelector(".header__nav_profile-info");
let button = profileBlock.querySelector(".header__nav_profile-button");
let profileMenu = document.querySelector(".header__nav_profile-menu");
profileBlock.addEventListener("click", function () {
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
    if (!notificationButton.classList.contains("header__nav_menu-button-active")) {
        for (let i = 0; i < notificationCount; i++)
            notifications[i].classList.remove("new");
    }
    notificationCounter.style.display = "none";
});

let teams = document.querySelectorAll(".content__results_team");
let teamLists = document.querySelectorAll(".content__results_team-list");
let currentTeam = -1;
let closed = true;
for (let i = 0; i < teams.length; i++) {
    teams[i].addEventListener("click", function () {
        if (!closed) {
            teams[currentTeam].classList.remove("content__results_team-opened");
            teamLists[currentTeam].classList.remove("opened");
            teamLists[currentTeam].querySelector(".content__results_team-teammates").classList.remove("opened");
            let teammatesList = teamLists[currentTeam].querySelectorAll(".content__results_team-teammate");
            for (let teammate of teammatesList) {
                teammate.classList.remove("opened");
            }
            teamLists[currentTeam].querySelector("img").classList.remove("opened");
            closed = !closed;
            if (currentTeam === i)
                return;
        }
        if (closed) {
            teams[i].classList.add("content__results_team-opened");
            teamLists[i].classList.add("opened");
            teamLists[i].querySelector(".content__results_team-teammates").classList.add("opened");
            teammatesList = teamLists[i].querySelectorAll(".content__results_team-teammate");
            for (let teammate of teammatesList) {
                teammate.classList.add("opened");
            }
            teamLists[i].querySelector("img").classList.add("opened");
            closed = !closed;
        }
        currentTeam = i;
    });
}
