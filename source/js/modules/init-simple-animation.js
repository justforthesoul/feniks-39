export const initSimpleAnimation = () => {
  const simpleAnimationBlocks = document.querySelectorAll('[data-simple-animate]');

  const simpleAnimate = () => {
    simpleAnimationBlocks.forEach((block) => {
      if (window.innerHeight - block.getBoundingClientRect().top > block.getBoundingClientRect().height / 10) {
        block.classList.add('is-shown');
        return;
      }
      // block.classList.remove('is-shown');
    });
  };

  simpleAnimate();

  window.ls.on('scroll', simpleAnimate);
};
