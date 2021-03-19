// import refs from './refs.js';
// // refs.pagingList.addEventListener('click', element);
// let totalResults = 20000;
// let totalPages = 1000;
// let perPage = 20;
// let currentPage = 5;

// function element(totalPages, currentPage) {
//   let spanTag;
//   let activeLi;
//   let beforePages = currentPage - 2;
//   let afterPages = currentPage + 2;
//   if (currentPage > 1) {
//     ////Показывает кнопку стрелка влево, если активная стр. больше 1
//     spanTag += `
//       <li class="pagenumbers pag-left js-move-left"
//           onclick="element(totalPages, ${currentPage - 1})">
//         <span>Prev</span>
//       </li>
//     `;
//   }
//   // let first = 1;
//   if (currentPage > 2) {
//     // показывать 1, если активная стр. >2  onclick="element(totalPages, 1)"
//     spanTag += `<li class="pagenumbers js-page js-page-number hide-page_btn"  id="pag1"><span >1</span></li>`;
//     if (currentPage > 3) {
//       //если акстивная стр. больше 3 показывать троеточие
//       spanTag += `<li class="pagenumbers js-page-number hide-page_btn three-dots" id="pag8"><span></span></li>`;
//     }
//   }
//   if (currentPage == totalPages) {
//     beforePages = beforePages - 2;
//   } else if (currentPage == totalPages - 1) {
//     beforePages = beforePages - 1;
//   }
//   if (currentPage == 1) {
//     afterPages = afterPages + 2;
//   } else if (currentPage == 2) {
//     afterPages = afterPages + 1;
//   }
//   for (let pageLength = beforePages; pageLength <= afterPages; pageLength++) {
//     if (pageLength == totalPages) {
//       continue;
//     }
//     if (pageLength == 0) {
//       pageLength = pageLength + 1;
//     }
//     if (currentPage == pageLength) {
//       activeLi = 'active';
//     } else {
//       activeLi = '';
//     }
//     // console.log(pageLength);
//     spanTag += `<li class="pagenumbers js-page ${activeLi} js-page-number"   id="pag3"><span>${pageLength}</span></li>`;
//   } //показывает кнопки рядом с активной  onclick="element(totalPages, ${pageLength})"
//   if (currentPage < totalPages) {
//     //показывает стрелку вправо, если активная стр меньше общего кол-ва стр  onclick="element(totalPages, ${
//     currentPage + 1;
//     // })
//     spanTag += `<li class="pagenumbers pag-right js-arrow-right" "><span>Next<span></li>`;

//     refs.pagingList.innerHTML = spanTag;
//     // console.log(pageLength);
//   }
//   refs.pagingList.addEventListener('click', onClickEl);
//   function onClickEl(event) {
//     if (event.target.nodeName === 'SPAN' || event.target.nodeName === 'LI') {
//       const currentActivePage = event.currentTarget.querySelector('.active');
//       // console.log(currentActivePage);

//       if (currentActivePage) {
//         currentActivePage.classList.remove('active');
//       }

//       const nextActivePage = event.target;

//       nextActivePage.classList.add('active');
//     }
//   }
// }

// element(totalPages, currentPage);
// // console.log(pageLength);
