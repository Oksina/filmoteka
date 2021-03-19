import refs from './refs';
import notifications from './notifications.js';
import updateMarcup from './updateMarkupGallery.js';
import MovieApiService from './apiService.js';
import nextPartPage from './pagination.js';

const movieApiService = new MovieApiService(); //Создаю экземпляр класса поиска фильмов

refs.submitBtn.addEventListener('submit', fetchMoviesByQuery);
refs.homeBtn.addEventListener('click', sendToHomePage); // слушатель на кнопке НОМЕ- отправляет на основную(первую) стр.
refs.logoBtn.addEventListener('click', sendToHomePage); // слушатель на кнопке Filmoteka ^ делает то же самое
// refs.pagingList.addEventListener('click', updateMarkupByPages);

fetchPopMovies(); //Запрос и отрисовка главной страницы при  первой загрузке

// ф-ция запроса популярных фильмов и отрисовки результата запроса

function fetchPopMovies() {
  movieApiService
    .createPopMovieListWithGenres()
    .then(results => {
      notifications.removeNotifications();
      updateMarcup(results);
    })
    .catch(error => {
      notifications.errorRequest();
    });
}
///////////// ф-ция запроса  по ключевому слову и отрисовки результата запроса
function fetchMoviesByQuery(event) {
  event.preventDefault();
  movieApiService.query = event.target.elements.search.value;
  // notifications.removeNotifications();
  movieApiService
    .createQueryMovieListWithGenres()
    .then(results => {
      notifications.removeNotifications();
      if (results.length === 0) {
        notifications.notFoundNotification();
      }

      clearGallery();
      updateMarcup(results);
    })
    .catch(error => {
      notifications.errorRequest();
    });
}

/// Очистка галлереи
function clearGallery() {
  refs.gallery.innerHTML = '';
}

////Отправка на домашнюю страницу
function sendToHomePage(event) {
  event.preventDefault();
  refs.inputForm.value = '';
  movieApiService.query = '';
  clearGallery();
  movieApiService.resetPage();
  notifications.removeNotifications();
  fetchPopMovies();

  // логика убирания кнопок галереи
  refs.searchForm.classList.remove('is-hidden');
  refs.watchedBtnRef.classList.add('is-hidden');
  refs.queueBtnRef.classList.add('is-hidden');
  refs.headerRef.classList.remove('bcg-libr');
  refs.libraryBtnRef.classList.remove('current');
  refs.homeBtn.classList.add('current');
  refs.gallery.classList.remove('gallery-bgr');
  refs.paginationBox.classList.remove('is-hidden');
}
/////ф-ция подгрузки в зависимости от типа запроса
function uploadMovies() {
  // event.preventDefault();
  if (refs.inputForm.value != '') {
    movieApiService.query = refs.inputForm.value;

    clearGallery();
    movieApiService
      .createQueryMovieListWithGenres()
      .then(results => {
        if (results.length === 0) {
          notifications.allFoundFilmsNotification();
        }
        updateMarcup(results);
      })
      .catch(error => {
        notifications.errorRequest;
      });
  } else if (!refs.inputForm.value) {
    clearGallery();
    fetchPopMovies();
  }
}

///////////////////////////////////////////////
let currentNumberOfPageBtn = 1;

/////ф-ция  подгрузки фильмов постранично
function updateMarkupByPages(event) {
  if (event.target.nodeName !== 'SPAN') {
    return;
  }
  event.preventDefault();
  currentNumberOfPageBtn = +event.target.textContent;
  movieApiService.page = +currentNumberOfPageBtn;
  uploadMovies();
}

/////////// на одну страницу вперед от текущей
function forwardOnePage(event) {
  if (movieApiService.page === 1000) {
    return;
  }
  const toNumbPage = Number(movieApiService.page);
  movieApiService.page = toNumbPage + 1;
  uploadMovies();
}
/////////// на одну страницу назад от текущей
function backOnePage(event) {
  if (movieApiService.page === 1) {
    return;
  }
  const toNumbPage = Number(movieApiService.page);
  movieApiService.page = toNumbPage - 1;
  uploadMovies();
}

/////////////////////////////////////////Pagination popular/////////////////////////////////////////////////////
refs.pagingList.addEventListener('click', paginationPop);

function paginationPop(event) {
  event.preventDefault();
  const currentBtn = event.target;
  const toNumbPage = Number(movieApiService.page);
  const nextPartPage = document.querySelector('.next-part-page');
  const prevPartPage = document.querySelector('.prev-part-page');
  const rightBtn = document.querySelector('.pag-right');
  const leftBtn = document.querySelector('.pag-left');
  const numberPages = document.querySelectorAll('.change');
  const arr = Array.prototype.slice.call(numberPages);
  let currentNumberOfPageBtn = 1;

  //страница вправо
  if (
    currentBtn.classList.contains('pag-right') &&
    movieApiService.page <= 999
  ) {
    movieApiService.page = toNumbPage + 1;
    if (movieApiService.page < 995) {
      changeNum(arr);
    }
  }

  //страница влево
  if (currentBtn.classList.contains('pag-left') && movieApiService.page > 1) {
    movieApiService.page = toNumbPage - 1;
    if (movieApiService.page >= 2) {
      if (movieApiService.page < 994) {
        for (let i = 0; i < arr.length; i++) {
          arr[i].textContent = +arr[i].textContent - 1;
        }
      }
    }
  }

  //////постранично
  if (currentBtn.classList.contains('pag-numb')) {
    currentNumberOfPageBtn = +event.target.textContent;
    movieApiService.page = +currentNumberOfPageBtn;
    if (movieApiService.page < 994) {
      changeNum(arr);
    }
  }

  //////нажатие на три точки в конце
  if (
    currentBtn.classList.contains('next-part-page') &&
    movieApiService.page < 994
  ) {
    // movieApiService.page = Number(movieApiService.page) + 6;
    if (movieApiService.page === 993) {
      for (let item of arr) {
        item.textContent = +item.textContent + 1;
      }
      movieApiService.page = +arr[0].textContent;
    }
    if (movieApiService.page < 993) {
      for (let item of arr) {
        item.textContent = +item.textContent + 6;
      }
      movieApiService.page = +arr[0].textContent; ////////////////////////
    }
  }

  ////нажитие на три точки в начале
  if (
    currentBtn.classList.contains('prev-part-page') &&
    movieApiService.page > 6
  ) {
    movieApiService.page = Number(movieApiService.page) - 6;
    for (let item of arr) {
      item.textContent = +item.textContent - 6;
    }
    movieApiService.page = +arr[0].textContent; /////////////////////
  }
  if (
    currentBtn.classList.contains('prev-part-page') &&
    movieApiService.page <= 7
  ) {
    goToFirstPage(arr);
    nextPartPage.classList.remove('is-hidden');
  }

  ////логика отрисовки при клике на 1
  if (+currentBtn.textContent === 1) {
    goToFirstPage(arr);
    nextPartPage.classList.remove('is-hidden');
  }

  ////логика отрисовки при клике на 1000
  if (+currentBtn.textContent === 1000) {
    movieApiService.page = 1000;
    let x = 6;
    for (let i = 0; i < arr.length; i++) {
      arr[i].textContent = 1000 - x;
      x -= 1;
    }
  }

  //////показать\скрыть три точки в начале
  if (movieApiService.page > 5) {
    prevPartPage.classList.remove('is-hidden');
  }
  if (+arr[0].textContent <= 2) {
    prevPartPage.classList.add('is-hidden');
  }

  ////скрытие трех точек в конце
  if (+arr[0].textContent >= 994) {
    nextPartPage.classList.add('is-hidden');
  } else if (+arr[0].textContent <= 993) {
    nextPartPage.classList.remove('is-hidden');
  }

  ////неакт стрелка влево
  leftBtn.disabled = true;
  if (+movieApiService.page > 1) {
    leftBtn.disabled = false;
  }
  ////неакт стрелка вправо
  if (+movieApiService.page === 1000) {
    rightBtn.disabled = true;
  } else {
    rightBtn.disabled = false;
  }

  uploadMovies();
  currentHover();
}
function goToFirstPage(arr) {
  movieApiService.page = 1;
  for (let i = 0; i < arr.length; i++) {
    arr[i].textContent = i + 2;
  }
}
function currentHover() {
  const numPages = document.querySelectorAll('.nb');
  const array = Array.prototype.slice.call(numPages);
  const curPage = array.find(el => +el.textContent === movieApiService.page);

  const activBtn = document.querySelector('.js-current-number-page_Btn');
  if (activBtn) {
    activBtn.classList.remove('js-current-number-page_Btn');
  }
  curPage.classList.add('js-current-number-page_Btn');
}
function changeNum(arr) {
  if (movieApiService.page >= 6) {
    for (let i = 0; i < arr.length; i++) {
      arr[i].textContent = +arr[i].textContent + 1;
    }
  }
}

export {
  sendToHomePage,
  updateMarkupByPages,
  clearGallery,
  forwardOnePage,
  backOnePage,
};
