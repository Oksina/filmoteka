import refs from './refs.js';
// console.dir(refs.notFoundNotice);
// console.log(refs.notFoundNotice.textContent);
const notFoundNotification = function notFoundNotification() {
  refs.notFoundNotice.textContent =
    'Search result not successful! Enter the correct movie name.'; // нотификашка 'некорректный запрос.Введите название фильма'
  refs.notFoundNotice.classList.remove('is-hidden');
};

const allFoundFilmsNotification = function allFoundFilmsNotification() {
  refs.notFoundNotice.textContent = 'These are all the films we found!'; // нотификашка 'это все фильмы, которые мы нашли'
  refs.notFoundNotice.classList.remove('is-hidden');
};

const errorRequest = function errorRequestNotification() {
  refs.notFoundNotice.textContent = 'Please check your request and try again!'; // нотификашка 'это все фильмы, которые мы нашли'
  refs.notFoundNotice.classList.remove('is-hidden');
};

const removeNotifications = function removeNotifications() {
  refs.notFoundNotice.textContent = '';
  refs.notFoundNotice.classList.add('is-hidden');
};
// refs.notFoundNotice.textContent =
//   'Please check your request and try again!';
export default {
  notFoundNotification,
  allFoundFilmsNotification,
  errorRequest,
  removeNotifications,
};
