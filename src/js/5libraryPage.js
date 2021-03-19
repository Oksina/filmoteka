'use strict';
import refs from './refs';
import cards from '../templates/cardsLibrary.hbs';
import { sendToHomePage, clearGallery } from './homePage';
import spinner from './spinner';
//import { firebase, openLoginForm } from './firebase';

refs.libraryRef.addEventListener('click', event => {
  if (firebase.auth() === null) {
    showFilms('filmsWatched');
    myLibraryBtn();
  }
  return;
});
refs.watchedBtnRef.addEventListener('click', event => {
  showFilms('filmsWatched');
  watchedBtn();
});
refs.queueBtnRef.addEventListener('click', event => {
  showFilms('filmsQueue');
  queueBtn();
});

function myLibraryBtn() {
  refs.searchForm.classList.add('is-hidden');
  refs.watchedBtnRef.classList.remove('is-hidden');
  refs.queueBtnRef.classList.remove('is-hidden');
  refs.headerRef.classList.add('bcg-libr');
  refs.libraryRef.classList.add('current');
  refs.homeBtn.classList.remove('current');
  refs.paginationBox.classList.add('is-hidden');
}
function queueBtn() {
  refs.watchedBtnRef.classList.remove('orange');
  refs.queueBtnRef.classList.add('orange');
}
function watchedBtn() {
  refs.watchedBtnRef.classList.add('orange');
  refs.queueBtnRef.classList.remove('orange');
}
function renderItems(movie) {
  const markup = cards(movie);
  refs.gallery.insertAdjacentHTML('beforeend', markup);
}
function fetchItem(item) {
  return fetch(
    `https://api.themoviedb.org/3/movie/${item}?api_key=c2406e33bae3c04a8fdebb618c81ede7`,
  ).then(response => response.json());
}
function showFilms(key) {
  clearGallery();
  const localStr = localStorage.getItem(key);
  const parse = JSON.parse(localStr);
  if (localStr === null || parse.length === 0) {
    spinner.hide();
    refs.gallery.classList.add('gallery-bgr');
    refs.gallery.insertAdjacentHTML('beforeend', addText());
    linkHomePage();
  } else refs.gallery.classList.remove('gallery-bgr');
  spinner.show();
  for (let item of parse) {
    fetchItem(item).then(movie => {
      renderItems(movie);
      spinner.hide();
    });
  }
}
function linkHomePage() {
  const linkHomePage = document.querySelector('.choose');
  linkHomePage.addEventListener('click', sendToHomePage);
}
function addText() {
  return `<p class="empty-library">You have not chosen a movie<br/><a href="#" class="choose">Choose now</a></p>`;
}
