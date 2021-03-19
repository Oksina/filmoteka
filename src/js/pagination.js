import refs from './refs.js';
import addPaginationMarkup from './pagenationMarkup.js';
import { forwardOnePage, backOnePage, movieApiService } from './homePage.js';
import MovieApiService from './apiService.js';

addPaginationMarkup();

// const pagingItems = document.querySelectorAll('.js-page-number');
// const backPageBtn = document.querySelector('.js-move-left');
// const forwardPageBtn = document.querySelector('.js-move-right');
// const firstBtn = document.getElementById('pag1');
// const secondBtn = document.getElementById('pag2');
// const thirdBtn = document.getElementById('pag3');
// const fourthBtn = document.getElementById('pag4');
// const fifthBtn = document.getElementById('pag5');
// const sixthBtn = document.getElementById('pag6');
// const seventhBtn = document.getElementById('pag7');
// // const eightBtn = document.getElementById('pag8');
// const ninthBtn = document.getElementById('pag9');

// ///////////////////////////////////

const nextPartPage = document.querySelector('.next-part-page');
// const paginationBox = document.querySelector('.js-pagination-box_pages');

// paginationBox.addEventListener('click', event => {
//   event.preventDefault();

//   console.log(event.target);
// });
// // nextPartPage.addEventListener('click', () => {
// console.log(nextPartPage);
// // });

// //////////////////////////////////////////

// refs.pagingList.addEventListener('click', setNumberOfPageBtn);
// refs.pagingList.addEventListener('click', setCurrentColor);
// backPageBtn.addEventListener('click', backOnePage);
// forwardPageBtn.addEventListener('click', forwardOnePage);
// refs.libraryBtnRef.addEventListener('click', hidePaging);
// refs.homeBtn.addEventListener('click', showPaging);

// function hidePaging(event) {
//   event.preventDefault();
//   refs.paginationBox.classList.add('is-hidden');
// }
// function showPaging(event) {
//   event.preventDefault();
//   refs.paginationBox.classList.remove('is-hidden');
// }

// // console.dir(movieApiService);
// const maxPages = 1000;
// function setNumberOfPageBtn(event, total_results) {
//   event.preventDefault();
//   // const maxPages = 1000;
//   let currentNumberOfPageBtn = 1;
//   if (event.target.nodeName == 'SPAN') {
//     currentNumberOfPageBtn = +event.target.textContent;
//     console.log(currentNumberOfPageBtn);
//   } else if (event.target == backPageBtn) {
//     let beforePage;
//     for (let i = 0; i < pagingItems.length; i += 1) {
//       if (
//         pagingItems[i].classList.value.includes('js-current-number-page_Btn')
//       ) {
//         beforePage = +pagingItems[i].textContent - 1;
//       }
//     }
//     currentNumberOfPageBtn = beforePage;
//     console.log(currentNumberOfPageBtn);
//   } else if (event.target == forwardPageBtn) {
//     let afterePage;
//     for (let i = 0; i < pagingItems.length; i += 1) {
//       if (
//         pagingItems[i].classList.value.includes('js-current-number-page_Btn')
//       ) {
//         afterePage = +pagingItems[i].textContent + 1;
//       }
//     }
//     currentNumberOfPageBtn = afterePage;
//     // console.log(currentNumberOfPageBtn);
//   }
//   if (currentNumberOfPageBtn <= 5) {
//     removeTextContentBtn();
//     secondBtn.classList.remove('three-dots');
//     secondBtn.textContent = 2;
//     thirdBtn.textContent = 3;
//     fourthBtn.textContent = 4;
//     fifthBtn.textContent = 5;
//     sixthBtn.textContent = 6;
//     seventhBtn.textContent = 7;
//     // eightBtn.textContent = '';
//     // eightBtn.classList.add('three-dots');
//   } else if (
//     currentNumberOfPageBtn > 5 &&
//     currentNumberOfPageBtn < maxPages - 4
//   ) {
//     removeTextContentBtn();
//     secondBtn.textContent = '';
//     secondBtn.classList.add('three-dots');
//     thirdBtn.textContent = +currentNumberOfPageBtn - 2;
//     fourthBtn.textContent = +currentNumberOfPageBtn - 1;
//     fifthBtn.textContent = +currentNumberOfPageBtn;
//     sixthBtn.textContent = +currentNumberOfPageBtn + 1;
//     seventhBtn.textContent = +currentNumberOfPageBtn + 2;
//     // eightBtn.classList.add('three-dots');
//   } else if (currentNumberOfPageBtn >= maxPages - 4) {
//     removeTextContentBtn();
//     secondBtn.classList.add('three-dots');
//     thirdBtn.textContent = maxPages - 6;
//     fourthBtn.textContent = maxPages - 5;
//     fifthBtn.textContent = maxPages - 4;
//     sixthBtn.textContent = maxPages - 3;
//     seventhBtn.textContent = maxPages - 2;
//     // eightBtn.classList.remove('three-dots');
//     // eightBtn.textContent = maxPages - 1;
//   }
// }

// function removeTextContentBtn() {
//   for (let i = 1; i < pagingItems.length - 1; i += 1) {
//     pagingItems[i].textContent = '';
//   }
// }

// let beforePage;
// let afterPageNumb;

// function setCurrentColor(event) {
//   event.preventDefault();
//   if (event.target.nodeName === 'SPAN') {
//     if (
//       event.target.textContent <= 5 ||
//       event.target.textContent >= maxPages - 4
//     ) {
//       for (let i = 0; i < pagingItems.length; i += 1) {
//         pagingItems[i].classList.remove('js-current-number-page_Btn');
//       }
//       event.target.classList.add('js-current-number-page_Btn');
//     }
//     if (
//       event.target.textContent > 5 &&
//       event.target.textContent < maxPages - 4
//     ) {
//       for (let i = 0; i < pagingItems.length; i += 1) {
//         pagingItems[i].classList.remove('js-current-number-page_Btn');
//       }
//       fifthBtn.classList.add('js-current-number-page_Btn');
//     }
//   } else if (event.target === backPageBtn) {
//     let beforePageNumb;
//     for (let i = 0; i < pagingItems.length; i += 1) {
//       if (pagingItems[i].className.includes('js-current-number-page_Btn')) {
//         beforePageNumb = +pagingItems[i].textContent - 1;

//         pagingItems[i].classList.remove('js-current-number-page_Btn');
//       }
//     }
//     console.log(beforePageNumb);
//     if (beforePageNumb < 1) {
//       firstBtn.classList.add('js-current-number-page_Btn');
//     } else if (beforePageNumb <= 5 || beforePageNumb >= maxPages - 4) {
//       for (let i = 0; i < pagingItems.length - 1; i += 1) {
//         if (pagingItems[i].textContent.includes(beforePageNumb)) {
//           pagingItems[i].classList.add('js-current-number-page_Btn');
//         }
//       }
//     } else if (beforePageNumb > 5 && beforePageNumb < maxPages - 4) {
//       for (let i = 0; i < pagingItems.length - 1; i += 1) {
//         if (pagingItems[i].textContent.includes(beforePageNumb)) {
//           fifthBtn.classList.add('js-current-number-page_Btn');
//         }
//       }
//     }
//   } else if (event.target === forwardPageBtn) {
//     let afterPageNumb;
//     for (let i = 0; i < pagingItems.length; i += 1) {
//       if (pagingItems[i].className.includes('js-current-number-page_Btn')) {
//         afterPageNumb = +pagingItems[i].textContent + 1;

//         pagingItems[i].classList.remove('js-current-number-page_Btn');
//       }
//     }

//     if (afterPageNumb <= 5 || afterPageNumb >= maxPages - 4) {
//       for (let i = 0; i < pagingItems.length - 1; i += 1) {
//         if (pagingItems[i].textContent.includes(afterPageNumb)) {
//           pagingItems[i].classList.add('js-current-number-page_Btn');
//         }
//       }
//     } else if (afterPageNumb > 5 && afterPageNumb < maxPages - 4) {
//       for (let i = 0; i < pagingItems.length - 1; i += 1) {
//         if (pagingItems[i].textContent.includes(afterPageNumb)) {
//           fifthBtn.classList.add('js-current-number-page_Btn');
//         }
//       }
//     } else if (afterPageNumb > maxPages) {
//       ninthBtn.classList.add('js-current-number-page_Btn');
//     }
//   }
// }

// export default nextPartPage;
