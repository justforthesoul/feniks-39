const locomotiveContainer = document.querySelector('[data-scroll-container]');
let options;

const initLocomotive = () => {
  options = {
    el: locomotiveContainer,
    smooth: true,
    getDirection: true,
    multiplier: 0.5,
    touchMultiplier: 5,
    lerp: 0.1,
    mobile: {
      smooth: true,
    },
    tablet: {
      smooth: true,
    },
  };

  // eslint-disable-next-line

  window.ls = new window.LocomotiveScroll(options);

  // window.ls.on('scroll', () => {

  // });

  window.addEventListener('resize', () => {
    setTimeout(() => {
      window.ls.update();
    }, 500);
  });
};

const initLocomotiveScroll = () => {
  if (!locomotiveContainer) {
    return;
  }

  initLocomotive();
};

export {initLocomotiveScroll};
