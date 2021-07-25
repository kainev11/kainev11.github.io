let profileBlock = document.querySelector('.header__nav_profile-info');
let button = profileBlock.querySelector('.header__nav_profile-button');
let profileMenu = document.querySelector('.header__nav_profile-menu');
profileBlock.addEventListener('click', function () {
    button.classList.toggle('header__nav_profile-button-opened');
    profileMenu.classList.toggle('header__nav_profile-menu-opened');
});

let notificationButton = document.querySelector('.header__nav_menu-button');
let notificationCount = document.querySelectorAll('.header__nav_menu-notification.new').length;
let notifications = document.querySelectorAll('.header__nav_menu-notification');
let notificationBlock = document.querySelector('.header__nav_menu-notifications');
let notificationCounter = notificationButton.querySelector('.header__nav_menu-notifications-counter');
notificationButton.addEventListener('click', function () {
    notificationButton.classList.toggle('header__nav_menu-button-active');
    notificationBlock.classList.toggle('header__nav_menu-notifications-opened');
    if (!notificationButton.classList.contains('header__nav_menu-button-active')) {
        for (let i = 0; i < notificationCount; i++)
            notifications[i].classList.remove('new');
    }
    notificationCounter.style.display = 'none';
});

let eventItems = document.querySelector('.content__events_wrapper');
let listOpeningButton = eventItems.querySelector('.content__events_item-more');
let eventItemList = eventItems.querySelectorAll('.content__events_item');
let eventListOpened = false;
listOpeningButton.addEventListener('click', function () {
    if (!eventListOpened)
        listOpeningButton.textContent = 'Скрыть полный список событий';
    else
        listOpeningButton.textContent = 'Показать полный список событий';
    eventListOpened = !eventListOpened;
    for (let i = 2; i < eventItemList.length; i++) {
        eventItemList[i].classList.toggle('content__events_item-hidden');
    }
})


let teams = document.querySelectorAll('.content__results_team');
let teamLists = document.querySelectorAll('.content__results_team-list');
let currentTeam = -1;
let closed = true;
teams[0] = teams[1];
for (let i = 0; i < teams.length; i++) {
    teams[i].addEventListener('click', function () {
        if (!closed) {
            teams[currentTeam].classList.remove('content__results_team-opened');
            teamLists[currentTeam].classList.remove('opened');
            teamLists[currentTeam].querySelector('.content__results_team-teammates').classList.remove('opened');
            let teammatesList = teamLists[currentTeam].querySelectorAll('.content__results_team-teammate');
            for (const teammate of teammatesList) {
                teammate.classList.remove('opened');
            }
            teamLists[currentTeam].querySelector('img').classList.remove('opened');
            closed = !closed;
            if (currentTeam === i)
                return;
        }
        if (closed) {
            teams[i].classList.add('content__results_team-opened');
            teamLists[i].classList.add('opened');
            teamLists[i].querySelector('.content__results_team-teammates').classList.add('opened');
            teammatesList = teamLists[i].querySelectorAll('.content__results_team-teammate');
            for (const teammate of teammatesList) {
                teammate.classList.add('opened');
            }
            teamLists[i].querySelector('img').classList.add('opened');
            closed = !closed;
            currentTeam = i;
        }
    });
}

const bestPlayers = document.querySelector('.content__best_players');
SortList(bestPlayers);

const bestTeams = document.querySelector('.content__best_teams');
SortList(bestTeams);

function SortList(sortingList) {
    const filter = sortingList.querySelector('.content__best_filter');
    const currentFilter = filter.querySelector('.content__best_filter-current');
    const filterList = filter.querySelector('.content__best_filter-list');
    const filterDamage = filterList.querySelectorAll('span')[0];
    const filterKills = filterList.querySelectorAll('span')[1];
    const bestPlayersList = sortingList.querySelector('.content__best_columns');
    const bestPlayers = bestPlayersList.querySelectorAll('.content__best_players-data');
    const bestPlayersArray = Array.prototype.slice.call(bestPlayers, 0);
    let defaultSorted = true;
    filterDamage.addEventListener('click', function() {
        filterList.classList.remove('opened');
        currentFilter.classList.remove('content__best_filter-button-opened');
        currentFilter.innerHTML = 'По урону';
        Sort(defaultSorted, bestPlayersArray, bestPlayersList);
    });
    filterKills.addEventListener('click', function() {
        filterList.classList.remove('opened');
        currentFilter.classList.remove('content__best_filter-button-opened');
        currentFilter.innerHTML = 'По убийствам';
        Sort(!defaultSorted, bestPlayersArray, bestPlayersList);
    });
    currentFilter.addEventListener('click', function() {
        filterList.classList.toggle('opened');
        currentFilter.classList.toggle('content__best_filter-button-opened');
    });
}

function Sort(defaultSorted, bestPlayersArray, bestPlayersList) {
    const selector = defaultSorted ? '.content__best_players-stat p:first-child' : '.content__best_players-stat p:last-child';
    const getNumber = (el) => el.querySelector(selector).textContent.replace(/\D/g, '');
    bestPlayersArray.sort((a, b) => getNumber(a) - getNumber(b));
    while (bestPlayersList.firstChild)
        bestPlayersList.removeChild(bestPlayersList.firstChild);
    for (const bestPlayer of bestPlayersArray)
        bestPlayersList.appendChild(bestPlayer);
}