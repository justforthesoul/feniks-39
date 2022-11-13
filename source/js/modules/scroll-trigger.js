const initScrollTriggerLs = () => {
  window.gsap.registerPlugin(window.ScrollTrigger);

  // each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
  window.ls.on('scroll', window.ScrollTrigger.update);

  // tell ScrollTrigger to use these proxy methods for the '.smooth-scroll' element since Locomotive Scroll is hijacking things
  window.ScrollTrigger.scrollerProxy('[data-scroll-container]', {
    scrollTop(value) {
      return arguments.length ? window.ls.scrollTo(value, 0, 0) : window.ls.scroll.instance.scroll.y;
    }, // we don't have to define a scrollLeft because we're only scrolling vertically.
    getBoundingClientRect() {
      return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
    },

    // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
    pinType: document.querySelector('[data-scroll-container]').style.transform ? 'transform' : 'fixed',
  });

  // each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll.
  window.ScrollTrigger.addEventListener('refresh', () => window.ls.update());

  // after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
  window.ScrollTrigger.refresh();


  window.addEventListener('scrolltrigger.update', () => {
    window.ScrollTrigger.refresh();
  });
};

export {initScrollTriggerLs};
