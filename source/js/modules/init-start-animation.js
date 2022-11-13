import {initSimpleAnimation} from './init-simple-animation';

export const initStartAnimation = () => {
  const header = document.querySelector('.header');

  if (!header) {
    return;
  }

  document.body.classList.add('no-pointer');

  setTimeout(() => {
    header.classList.add('is-shown');
    initSimpleAnimation();
  }, 1000);

  setTimeout(() => {
    window.ls.start();
    document.body.classList.remove('no-pointer');
  }, 2000);
};
