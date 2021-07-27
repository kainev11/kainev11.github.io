const bestTeams = document.querySelector('.content__best_teams');
SortList(bestTeams);

const bestPlayers = document.querySelector('.content__best_players');
SortList(bestPlayers);

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