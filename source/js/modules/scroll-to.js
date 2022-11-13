import {ScrollToPlugin} from '../vendor/ScrollToPlugin';

window.gsap.registerPlugin(ScrollToPlugin);

class ScrollTo {
  constructor(props) {
    this.link = props.link;
    this.offset = 0;
    this.duration = 1;
    this._header = document.querySelector('[data-header]');
    this._menu = document.querySelector('[data-menu]');
    this.init();
  }

  scrollTo(e) {
    e.preventDefault();

    let target = document.getElementById(this.link.dataset.scrollTo);

    if (!target) {
      return;
    }

    const activeLink = document.querySelector('[data-scroll-to].is-active');
    if (activeLink) {
      activeLink.classList.remove('is-active');
    }

    this.link.classList.add('is-active');


    // If locomotive scroll is initialized
    if (window.ls) {
      window.ls.scrollTo(target, {
        duration: this.duration * 2000,
        offset: -this.offset,
        easing: [0.11, 0, 0.5, 0],
        disableLerp: false,
      });
      setTimeout(() => {
        window.ls.update();
      }, 300);
    } else {
      setTimeout(() => {
        window.gsap.to(window, {
          duration: this.duration * 2000,
          scrollTo: {y: target, offsetY: this.offset},
        });
        window.ls.update();
      }, 2000);
    }
  }

  init() {
    this.link.addEventListener('click', this.scrollTo.bind(this));
  }
}

const initScrollTo = () => {
  const els = document.querySelectorAll('[data-scroll-to]');

  if (!els.length) {
    return;
  }

  els.forEach((el) => {
    return new ScrollTo({
      link: el,
    });
  });
};

export {initScrollTo};
