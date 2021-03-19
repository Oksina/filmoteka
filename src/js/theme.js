import refs from './refs.js';

const Theme = {
  LIGHT: 'light-theme',
  DARK: 'dark-theme',
};

if (localStorage.getItem('DARK')) {
  refs.main.classList.add(Theme.DARK);
  refs.themeSwitchRef.checked = true;
}

refs.themeSwitchRef.addEventListener('change', changeThemes);

function changeThemes() {
  if (refs.themeSwitchRef.checked) {
    refs.main.classList.add(Theme.DARK);
    refs.main.classList.remove('bgr');
    localStorage.setItem('DARK', Theme.DARK);
  } else {
    refs.main.classList.remove(Theme.DARK);
    refs.main.classList.add('bgr');
    localStorage.removeItem('DARK');
  }
}
