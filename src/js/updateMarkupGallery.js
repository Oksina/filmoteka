import refs from './refs.js';
// import LoadMoreBtn from './loadMoreBtn.js';
import galleryTpl from '../templates/cardMainPage.hbs';
// const loadMoreBtn = new LoadMoreBtn({
//   selector: '.js-load_more', // Создаю экземпляр кнопки загрузить еще
//   hidden: true,
// });
export default function updateMarcup(results) {
  // loadMoreBtn.show();
  // loadMoreBtn.disable();
  refs.gallery.insertAdjacentHTML('beforeend', galleryTpl(results));
  // loadMoreBtn.enable();
}
