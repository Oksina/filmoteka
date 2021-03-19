import refs from './refs';

const spinner = {
  show() {
    refs.spinnerRef.classList.remove('is-hidden');
  },
  hide() {
    setTimeout(() => {
      refs.spinnerRef.classList.add('is-hidden');
    }, 550);
  },
};

export default spinner;
