export class BlobLink {
  constructor() {
    this._blobLinks = document.querySelectorAll('.blob-link');

    this._blob = null;
    this._top = null;
    this._left = null;
    this._activeLink = null;
    this._baseDelay = 0.6;

    this._touchEvent = false;
    this._timer = null;

    this._baseTheme = '#ffffff';

    this._onLinkMouseenter = this._onLinkMouseenter.bind(this);
    this._onLinkMouseleave = this._onLinkMouseleave.bind(this);
    this._onTouchStart = this._onTouchStart.bind(this);
    this._sizeCoefficient = 7;
  }

  _getRandomInteger() {
    return Math.floor(Math.random() * 40 + 30);
  }

  _generateRadius() {
    return `${this._getRandomInteger()}% ${this._getRandomInteger()}% ${this._getRandomInteger()}% ${this._getRandomInteger()}% / ${this._getRandomInteger()}% ${this._getRandomInteger()}% ${this._getRandomInteger()}% ${this._getRandomInteger()}%`;
  }

  _onTouchStart() {
    this._touchEvent = true;
    clearTimeout(this._timer);
    this._timer = setTimeout(() => {
      this._touchEvent = false;
    }, 500);
  }

  _createBlob(left, top) {
    this._blob = document.createElement('div');
    this._blob.classList.add('blob-link__blob');
    this._activeLink.appendChild(this._blob);

    const height = this._activeLink.getBoundingClientRect().height;
    const width = this._activeLink.getBoundingClientRect().width;
    const size = height > width ? height : width;
    this._blob.style.backgroundColor = this._activeLink.dataset.theme || this._baseTheme;
    this._blob.style.left = `${left}px`;
    this._blob.style.top = `${top}px`;
    this._blob.style.transform = `scale(${size / this._sizeCoefficient}) translate3d(0, 0, 0)`;
    this._blob.style.transition = `transform ${this._baseDelay}s ease-in-out`;
    this._blob.style.borderRadius = `${this._generateRadius()}`;
  }

  _onLinkMouseenter(evt) {
    if (this._touchEvent) {
      return;
    }
    this._activeLink = evt.target.closest('.blob-link');
    this._sizeCoefficient = this._activeLink.hasAttribute('data-blob-xl') ? 3.5 : 7;
    this._baseDelay = this._activeLink.dataset.delay ? +this._activeLink.dataset.delay : this._baseDelay;
    const left = evt.clientX - this._activeLink.getBoundingClientRect().left - 10;
    const top = evt.clientY - this._activeLink.getBoundingClientRect().top - 10;
    this._createBlob(left, top);
  }

  _onLinkMouseleave(evt) {
    if (this._touchEvent) {
      return;
    }
    const left = evt.clientX - this._activeLink.getBoundingClientRect().left - 10;
    const top = evt.clientY - this._activeLink.getBoundingClientRect().top - 10;
    const blob = this._blob;
    blob.style.left = `${left}px`;
    blob.style.top = `${top}px`;

    this._blob.style.borderRadius = `${this._generateRadius()}`;
    this._blob.style.transition = `left 0.1s ease, top 0.1s ease, transform ${this._baseDelay}s ease`;
    blob.style.transform = 'scale(0)';

    setTimeout(() => {
      blob.remove();
    }, this._baseDelay * 1000);
  }

  init() {
    if (!this._blobLinks.length) {
      return;
    }
    this._blobLinks.forEach((link) => {
      link.addEventListener('mouseenter', this._onLinkMouseenter);
      link.addEventListener('mouseleave', this._onLinkMouseleave);
      document.body.addEventListener('touchstart', this._onTouchStart);
    });
  }
}
