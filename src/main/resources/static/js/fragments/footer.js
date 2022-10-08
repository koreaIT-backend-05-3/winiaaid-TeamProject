const familySiteButton = document.querySelector('.scrollbar-button button')
const openFamilySiteUl = document.querySelector('.open-familysite')

familySiteButton.onclick = () => {
	familySiteButton.classList.toggle('on');
	openFamilySiteUl.classList.toggle('on');
}