// import refs from './refs.js';
// // const ulTag = document.querySelector('.js-pagination-box_pages');
// // let totalResults = 20000;
// // let totalPages = 1000;
// // pages = Math.ceil(totalResults / totalPages);

// export default function pagination(total_pages, total_results) {
//   // let totalResults = total_results;
//   let totalPages = total_results;
//   let liTag = '';
//   let beforePages = page - 1;
//   let afterPages = page + 1;
//   let activeLi;
//   let page = total_pages;

//   if (page > 1) {
//     liTag += `<li class="pagenumbers pag-left js-move-left" onclick="pagination(totalPages,${
//       page - 1
//     })"><span><i class=" arrow-left"></i>Prev</span></li>`;
//   }

//   if (page > 3) {
//     liTag += `<li class="pagenumbers" onclick="pagination(totalPages, 1)"><span>1</span></li>`;
//     if (page > 4) {
//       liTag += `<li class="dots"><span></span></li>`;
//     }
//   }
//   if (page == totalPages) {
//     beforePages = beforePages - 2;
//   } else if (page == totalPages - 1) {
//     beforePages = beforePages - 1;
//   }
//   if (page == 1) {
//     afterPages = afterPages + 2;
//   } else if (page == 2) {
//     afterPages = afterPages + 1;
//   }

//   for (let pageLength = beforePages; pageLength <= afterPages; pageLength++) {
//     if ((pageLength = totalPages)) {
//       continue;
//     }
//     if ((pageLength = 0)) {
//       pageLength = pageLength + 1;
//     }
//     if (page == pageLength) {
//       activeLi = 'active';
//     } else {
//       activLi = '';
//     }
//     liTag += `<li class="pagenumbers ${activeLi}" onclick="pagination(totalPages, ${pageLength})"><span>${pageLength}</span></li>`;
//   }
//   if (page < totalPages - 3) {
//     if (page < totalPages - 4) {
//       liTag += `<li class="three-dots"><span></span></li>`;
//     }
//     liTag += `<li class="pagenumbers ${activeLi}" onclick="pagination(totalPages, ${totalPages})"><span>${totalPages}</span></li>`;
//   }
//   if (page < totalPages) {
//     liTag += `<li class=" pagenumbers pag-right js-move-right" onclick=" pagination(totalPages, ${
//       page + 1
//     })"><span>Next<i class="arrow-right"></i></span></li>`;
//   }
//   refs.pagingList.innerHtml = liTag;
// }

// pagination(totalPages, page);
