import * as basicLightbox from 'basiclightbox';
import 'basiclightbox/dist/basicLightbox.min.css';
import refs from './refs';

const BASE_URL = 'https://api.themoviedb.org/3/';
const API_KEY = 'c2406e33bae3c04a8fdebb618c81ede7';

let id;

function fetchTrailerFilm(id) {
  return fetch(`${BASE_URL}movie/${id}/videos?api_key=${API_KEY}`)
    .then(response => response.json())
    .then(videos => {
      const trailerKey = videos.results[0].key;
      const trailer = basicLightbox.create(`
  <iframe width="450" height="320" src='https://www.youtube.com/embed/${trailerKey}'frameborder="0" allowfullscreen class="trailer_video"></iframe>
`);
      trailer.show();
    })
    .catch(error => {
      const noTrailer = basicLightbox.create(`
  <img width="450" height="320" src="https://hsto.org/webt/un/y2/nu/uny2nux8h1_fmgig2g-odesccse.jpeg" alt="no found trailer" class="trailer_video">
`);
      //<img width="450" height="320" src="https://hsto.org/webt/un/y2/nu/uny2nux8h1_fmgig2g-odesccse.jpeg" alt="no found trailer" class="trailer_video">
      noTrailer.show();
    });
}

refs.gallery.addEventListener('click', hadleClickTrailer);

function hadleClickTrailer(e) {
  id = event.target.dataset.id;

  const targetClass = e.target.className;
  if (targetClass === 'trailer-div' || targetClass === 'trailer-space') {
    fetchTrailerFilm(id);
  }
  return;
}
