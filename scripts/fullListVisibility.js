const tournamentDescription = document.querySelector('.content__info_description');
const tournamentDescriptionShadow = tournamentDescription.querySelector('.content__info_description-shadow');
const tournamentDescriptionButton = document.querySelector('.content__info_description-more');
let fullText = false;
tournamentDescriptionButton.addEventListener('click', function() {
    fullText = !fullText;
    if (fullText)
        tournamentDescriptionButton.textContent = 'Скрыть полное описание';
    else
        tournamentDescriptionButton.textContent = 'Показать описание полностью';
    tournamentDescription.classList.toggle('content__info_description-full');
    tournamentDescriptionShadow.classList.toggle('hidden');
});

const tournamentHiddenParents = document.querySelectorAll('.content-with-hide');
for (const parent of tournamentHiddenParents) {
    const tournamentHiddenButton = parent.querySelector('.content__more-button');
    const hiddenBlocks = parent.querySelectorAll('.content-with-hide_block');
    let blocksVisible = false;
    tournamentHiddenButton.addEventListener('click', function() {
        blocksVisible = !blocksVisible;
        if (blocksVisible)
            tournamentHiddenButton.textContent = 'Скрыть полный список';
        else
            tournamentHiddenButton.textContent = 'Показать полный список';
        for (const block of hiddenBlocks) {
            if (blocksVisible)
                block.style.display = 'block';
            else
                block.removeAttribute('style')
            setTimeout(() => {  block.classList.toggle('content-with-hide_block-hidden'); }, 0);
        }
    });
}