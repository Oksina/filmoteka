import refs from './refs';
import modalTpl from '../templates/detailsPage.hbs';
import MovieApiService from './apiService.js';
import { parse } from 'handlebars';

const BASE_URL = 'https://api.themoviedb.org/3/';

const API_KEY = 'c2406e33bae3c04a8fdebb618c81ede7';

// console.log(refs.openModal);
// console.log(refs.modal);

refs.openModal.addEventListener('click', openModal);
refs.overlayRef.addEventListener('click', onOverlayClick);

let id;

function openModal(event) {
  event.preventDefault();
  // console.log(event.target);

  if (event.target.nodeName !== 'IMG') {
    return;
  }
  id = event.target.dataset.id;
  // console.log(id);
  refs.modalBox.classList.remove('is-hidden');
  // refs.header.classList.add('is-hidden');
  refs.searchForm.classList.add('visabilyty-off');
  refs.footer.classList.add('is-hidden');
  refs.main.classList.add('is-hidden');
  fetchFilm(id);
  refs.openModal.removeEventListener('click', openModal);
  refs.logoBtn.addEventListener('click', closeModal);
  refs.homeBtn.addEventListener('click', closeModal);
  refs.libraryBtnRef.addEventListener('click', closeModal);
  refs.watchedBtnRef.addEventListener('click', closeModal);
  refs.queueBtnRef.addEventListener('click', closeModal);
  window.addEventListener('keydown', onEscPress);
  // refs.backdrop.addEventListener('click', closeModal);
}

function closeModal(e) {
  // e.preventDefault();
  refs.modalBox.classList.add('is-hidden');
  // refs.header.classList.remove('is-hidden');
  refs.searchForm.classList.remove('visabilyty-off');
  refs.footer.classList.remove('is-hidden');
  refs.main.classList.remove('is-hidden');
  refs.modalContent.innerHTML = '';
  window.removeEventListener('keydown', onEscPress);
  // refs.backdrop.removeEventListener('click', closeModal);
  refs.openModal.addEventListener('click', openModal);
  // console.log('close modal window');
}

function onEscPress(event) {
  if (event.code === 'Escape') {
    closeModal();
  }
}

function onOverlayClick(event) {
  if (event.target === event.currentTarget) {
    closeModal();
  }
}

function fetchFilm(id) {
  return fetch(`${BASE_URL}movie/${id}?api_key=${API_KEY}`)
    .then(response => response.json())
    .then(movie => {
      appendMarkup(movie);
    });
}

function appendMarkup(movie) {
  const modalContent = modalTpl(movie);
  refs.modalContent.insertAdjacentHTML('beforeend', modalContent);

  /*==============LocalStorage=============*/

  const watchedBtn = document.querySelector('.watched-btn');
  const queueBtn = document.querySelector('.queue-btn');
  monitorBtnChange();
  watchedBtn.addEventListener('click', handleBtnWatched);
  queueBtn.addEventListener('click', handleBtnQueue);

  function handleBtnWatched() {
    toggleToWatched(id);
  }

  function handleBtnQueue() {
    toggleToQueue(id);
  }

  /*функции проверяющие есть ли в массивах текущий фильм, если нет - добавляет его в локальное хранилище*/

  function toggleToWatched() {
    let filmsWatched = [];
    let localStorageData = localStorage.getItem('filmsWatched');
    if (localStorageData) {
      filmsWatched = [...JSON.parse(localStorageData)];
    }
    let currentIdFilm = id;
    const index = filmsWatched.indexOf(currentIdFilm);
    if (index > -1) {
      filmsWatched.splice(index, 1);
    } else filmsWatched.push(id);
    localStorage.setItem('filmsWatched', JSON.stringify(filmsWatched));
    monitorBtnChange();
  }

  function toggleToQueue() {
    let filmsQueue = [];
    let localStorageData = localStorage.getItem('filmsQueue');
    if (localStorageData) {
      filmsQueue = [...JSON.parse(localStorageData)];
    }
    let currentIdFilm = id;
    const index = filmsQueue.indexOf(currentIdFilm);
    if (index > -1) {
      filmsQueue.splice(index, 1);
    } else filmsQueue.push(id);
    localStorage.setItem('filmsQueue', JSON.stringify(filmsQueue));
    monitorBtnChange();
  }

  function monitorBtnChange() {
    let filmsWatched = [];
    let localStorageData = localStorage.getItem('filmsWatched');
    if (localStorageData) {
      filmsWatched = [...JSON.parse(localStorageData)];
    }
    let currentIdFilm = id;

    let filmId = filmsWatched.find(el => el === currentIdFilm);
    if (filmId === currentIdFilm) {
      watchedBtn.textContent = 'Delete from watched';
      watchedBtn.classList.remove('active');
    } else {
      watchedBtn.textContent = 'Add to watched';
      watchedBtn.classList.add('active');
    }

    let filmsQueue = [];
    localStorageData = localStorage.getItem('filmsQueue');
    if (localStorageData) {
      filmsQueue = [...JSON.parse(localStorageData)];
    }

    filmId = filmsQueue.find(el => el === currentIdFilm);
    if (filmId === currentIdFilm) {
      queueBtn.textContent = 'Delete from Queue';
      queueBtn.classList.remove('active');
    } else {
      queueBtn.textContent = 'Add to Queue';
      queueBtn.classList.add('active');
    }
  }
}

//Footer in modal tooltip
const tooltipContainer = document.querySelector(
  '.film-tooltip-container-modal',
);

tooltipContainer.addEventListener('mouseover', () => {
  const tooltip = tooltipContainer.querySelector('.film-tooltip-modal');
  tooltip.classList.add('active');
});

tooltipContainer.addEventListener('mouseleave', () => {
  const tooltip = tooltipContainer.querySelector('.film-tooltip-modal');
  tooltip.classList.remove('active');
});
