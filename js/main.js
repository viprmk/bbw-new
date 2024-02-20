document.addEventListener('DOMContentLoaded', () => {
    class Details {
    constructor() {
        this.DOM = {};

        const detailsTmpl = `
        <div class="details__bg details__bg--up"></div>
        <div class="details__bg details__bg--down"></div>
        <video class="details__vid" autoplay muted loop ></video>
        <h2 class="details__title"></h2>
        <button class="details__close"><svg class="icon icon--cross"><use xlink:href="#icon-cross"></use></svg></button>
        `;

        this.DOM.details = document.createElement('div');
        this.DOM.details.className = 'details';
        this.DOM.details.innerHTML = detailsTmpl;
        document.body.appendChild(this.DOM.details);

        this.init();
    }

    init() {
        this.DOM.bgUp = this.DOM.details.querySelector('.details__bg--up');
        this.DOM.bgDown = this.DOM.details.querySelector('.details__bg--down');
        this.DOM.video = this.DOM.details.querySelector('.details__vid');
        this.DOM.title = this.DOM.details.querySelector('.details__title');
        this.DOM.close = this.DOM.details.querySelector('.details__close');

        this.initEvents();
    }

    initEvents() {
        document.addEventListener('click', (event) => {
            const isDetailsCloseClicked = event.target.closest('.details');
            const isDetailsClicked = event.target.closest('.details');

            if (isDetailsCloseClicked) {
                this.isZoomed ? this.zoomOut() : this.close();
            } else if (!isDetailsClicked && this.isZoomed) {
                this.zoomOut();
            } else if (!isDetailsClicked) {
                this.close();
            }
        });
    }

    fill(info) {
        this.DOM.video.src = info.videoSrc;
        this.DOM.title.innerHTML = info.title;
    }

    getProductDetailsRect() {
        return {
            productBgRect: this.DOM.productBg.getBoundingClientRect(),
            detailsBgRect: this.DOM.bgDown.getBoundingClientRect(),
            productVideoRect: this.DOM.productVideo.getBoundingClientRect(),
            detailsVideoRect: this.DOM.video.getBoundingClientRect()
        };
    }

    open(data) {
        if (this.isAnimating) return false;
        this.isAnimating = true;

        this.DOM.details.classList.add('details--open');

        this.DOM.productBg = data.productBg;
        this.DOM.productVideo = data.productVideo;

        this.DOM.productBg.style.opacity = 0;
        this.DOM.productVideo.style.opacity = 0;

        const rect = this.getProductDetailsRect();

        this.DOM.bgDown.style.transform = `translateX(${rect.productBgRect.left - rect.detailsBgRect.left}px) translateY(${rect.productBgRect.top - rect.detailsBgRect.top}px) scaleX(${rect.productBgRect.width / rect.detailsBgRect.width}) scaleY(${rect.productBgRect.height / rect.detailsBgRect.height})`;
        this.DOM.bgDown.style.opacity = 1;

        this.DOM.video.style.transform = `translateX(${rect.productVideoRect.left - rect.detailsVideoRect.left}px) translateY(${rect.productVideoRect.top - rect.detailsVideoRect.top}px) scaleX(${rect.productVideoRect.width / rect.detailsVideoRect.width}) scaleY(${rect.productVideoRect.height / rect.detailsVideoRect.height})`;
        this.DOM.video.style.opacity = 1;

        anime({
            targets: [this.DOM.bgDown, this.DOM.video],
            duration: (target, index) => index ? 200 : 250,
            easing: (target, index) => index ? 'easeOutElastic' : 'easeOutSine',
            elasticity: 250,
            translateX: 0,
            translateY: 0,
            scaleX: 1,
            scaleY: 1,
            complete: () => this.isAnimating = false
        });

        anime({
            targets: [this.DOM.title],
            duration: 200,
            easing: 'easeOutExpo',
            delay: (target, index) => {
                return index * 20;
            },
            translateY: (target, index, total) => {
                return index !== total - 1 ? [50, 0] : 0;
            },
            scale: (target, index, total) => {
                return index === total - 1 ? [0, 1] : 1;
            },
            opacity: 1
        });

        anime({
            targets: this.DOM.bgUp,
            duration: 100,
            easing: 'linear',
            opacity: 1
        });

        anime({
            targets: this.DOM.close,
            duration: 250,
            easing: 'easeOutSine',
            translateY: 0,
            opacity: 1
        });

    }

    close() {
        if (this.isAnimating) return false;
        this.isAnimating = true;

        this.DOM.details.classList.remove('details--open');

        anime({
            targets: this.DOM.close,
            duration: 150,
            easing: 'easeOutSine',
            translateY: '100%',
            opacity: 0
        });

        anime({
            targets: [this.DOM.title],
            duration: 60,
            easing: 'linear',
            opacity: 0
        });

        const rect = this.getProductDetailsRect();
        anime({
            targets: [this.DOM.bgDown, this.DOM.video],
            duration: 150,
            easing: 'easeOutSine',
            translateX: (target, index) => {
                return index ? rect.productVideoRect.left - rect.detailsVideoRect.left : rect.productBgRect.left - rect.detailsBgRect.left;
            },
            translateY: (target, index) => {
                return index ? rect.productVideoRect.top - rect.detailsVideoRect.top : rect.productBgRect.top - rect.detailsBgRect.top;
            },
            scaleX: (target, index) => {
                return index ? rect.productVideoRect.width / rect.detailsVideoRect.width : rect.productBgRect.width / rect.detailsBgRect.width;
            },
            scaleY: (target, index) => {
                return index ? rect.productVideoRect.height / rect.detailsVideoRect.height : rect.productBgRect.height / rect.detailsBgRect.height;
            },
            complete: () => {
                this.DOM.bgDown.style.opacity = 0;
                this.DOM.video.style.opacity = 0;
                this.DOM.bgDown.style.transform = 'none';
                this.DOM.video.style.transform = 'none';
                this.DOM.productBg.style.opacity = 1;
                this.DOM.productVideo.style.opacity = 1;
                this.isAnimating = false;
            }
        });
    }

    // ... (unchanged code)
}

class Item {
    constructor(el) {
        this.DOM = {};
        this.DOM.el = el;
        this.DOM.product = this.DOM.el.querySelector('.product');
        this.DOM.productBg = this.DOM.product.querySelector('.product__bg');
        this.DOM.productVideo = this.DOM.product.querySelector('.vid');

        this.info = {
            video: this.DOM.productVideo.src,
            title: this.DOM.product.querySelector('.ux-ui--box-title').innerHTML,
            videoSrc: this.DOM.productVideo.getAttribute('data-video-src')
        };

        this.initEvents();
    }

    initEvents() {
        this.DOM.product.addEventListener('click', () => this.open());
    }

    open() {
        const details = new Details();
        details.fill(this.info);
        details.open({
          productBg: this.DOM.productBg,
          productVideo: this.DOM.productVideo
        });
    }
}

const DOM = {};
  DOM.grid = document.querySelector('.ux-ui-page--grid');
  DOM.content = DOM.grid.parentNode;
  DOM.gridItems = Array.from(DOM.grid.querySelectorAll('.ui-ux-box'));
  let items = [];
  DOM.gridItems.forEach(item => {
    const el = item;
    el.addEventListener('click', () => {
      const item = new Item(el);
      item.open();
    });
});
});