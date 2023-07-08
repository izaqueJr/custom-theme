function getFocusableElements(t) {
  return Array.from(
    t.querySelectorAll(
      "summary, a[href], button:enabled, [tabindex]:not([tabindex^='-']), [draggable], area, input:not([type=hidden]):enabled, select:enabled, textarea:enabled, object, iframe"
    )
  );
}
alert('boné'),
  document.querySelectorAll('[id^="Details-"] summary').forEach((t) => {
    t.setAttribute('role', 'button'),
      t.setAttribute('aria-expanded', t.parentNode.hasAttribute('open')),
      t.nextElementSibling.getAttribute('id') && t.setAttribute('aria-controls', t.nextElementSibling.id),
      t.addEventListener('click', (t) => {
        t.currentTarget.setAttribute('aria-expanded', !t.currentTarget.closest('details').hasAttribute('open'));
      }),
      t.closest('header-drawer, menu-drawer') || t.parentElement.addEventListener('keyup', onKeyUpEscape);
  });
const trapFocusHandlers = {};
function trapFocus(e, t = e) {
  var i = getFocusableElements(e),
    s = i[0],
    n = i[i.length - 1];
  removeTrapFocus(),
    (trapFocusHandlers.focusin = (t) => {
      (t.target !== e && t.target !== n && t.target !== s) ||
        document.addEventListener('keydown', trapFocusHandlers.keydown);
    }),
    (trapFocusHandlers.focusout = function () {
      document.removeEventListener('keydown', trapFocusHandlers.keydown);
    }),
    (trapFocusHandlers.keydown = function (t) {
      'TAB' === t.code.toUpperCase() &&
        (t.target !== n || t.shiftKey || (t.preventDefault(), s.focus()), t.target === e || t.target === s) &&
        t.shiftKey &&
        (t.preventDefault(), n.focus());
    }),
    document.addEventListener('focusout', trapFocusHandlers.focusout),
    document.addEventListener('focusin', trapFocusHandlers.focusin),
    t.focus(),
    'INPUT' === t.tagName &&
      ['search', 'text', 'email', 'url'].includes(t.type) &&
      t.value &&
      t.setSelectionRange(0, t.value.length);
}
try {
  document.querySelector(':focus-visible');
} catch (t) {
  focusVisiblePolyfill();
}
function focusVisiblePolyfill() {
  const e = [
    'ARROWUP',
    'ARROWDOWN',
    'ARROWLEFT',
    'ARROWRIGHT',
    'TAB',
    'ENTER',
    'SPACE',
    'ESCAPE',
    'HOME',
    'END',
    'PAGEUP',
    'PAGEDOWN',
  ];
  let t = null,
    i = null;
  window.addEventListener('keydown', (t) => {
    e.includes(t.code.toUpperCase()) && (i = !1);
  }),
    window.addEventListener('mousedown', (t) => {
      i = !0;
    }),
    window.addEventListener(
      'focus',
      () => {
        t && t.classList.remove('focused'), i || (t = document.activeElement).classList.add('focused');
      },
      !0
    );
}
function pauseAllMedia() {
  document.querySelectorAll('.js-youtube').forEach((t) => {
    t.contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*');
  }),
    document.querySelectorAll('.js-vimeo').forEach((t) => {
      t.contentWindow.postMessage('{"method":"pause"}', '*');
    }),
    document.querySelectorAll('video').forEach((t) => t.pause()),
    document.querySelectorAll('product-model').forEach((t) => {
      t.modelViewerUI && t.modelViewerUI.pause();
    });
}
function removeTrapFocus(t = null) {
  document.removeEventListener('focusin', trapFocusHandlers.focusin),
    document.removeEventListener('focusout', trapFocusHandlers.focusout),
    document.removeEventListener('keydown', trapFocusHandlers.keydown),
    t && t.focus();
}
function onKeyUpEscape(t) {
  var e;
  'ESCAPE' === t.code.toUpperCase() &&
    (t = t.target.closest('details[open]')) &&
    ((e = t.querySelector('summary')), t.removeAttribute('open'), e.setAttribute('aria-expanded', !1), e.focus());
}
class QuantityInput extends HTMLElement {
  constructor() {
    super(),
      (this.input = this.querySelector('input')),
      (this.changeEvent = new Event('change', { bubbles: !0 })),
      this.input.addEventListener('change', this.onInputChange.bind(this)),
      this.querySelectorAll('button').forEach((t) => t.addEventListener('click', this.onButtonClick.bind(this)));
  }
  quantityUpdateUnsubscriber = void 0;
  connectedCallback() {
    this.validateQtyRules(),
      (this.quantityUpdateUnsubscriber = subscribe(PUB_SUB_EVENTS.quantityUpdate, this.validateQtyRules.bind(this)));
  }
  disconnectedCallback() {
    this.quantityUpdateUnsubscriber && this.quantityUpdateUnsubscriber();
  }
  onInputChange(t) {
    this.validateQtyRules();
  }
  onButtonClick(t) {
    t.preventDefault();
    var e = this.input.value;
    'plus' === t.target.name ? this.input.stepUp() : this.input.stepDown(),
      e !== this.input.value && this.input.dispatchEvent(this.changeEvent);
  }
  validateQtyRules() {
    var t,
      e = parseInt(this.input.value);
    this.input.min &&
      ((t = parseInt(this.input.min)),
      this.querySelector(".quantity__button[name='minus']").classList.toggle('disabled', e <= t)),
      this.input.max &&
        ((t = parseInt(this.input.max)),
        this.querySelector(".quantity__button[name='plus']").classList.toggle('disabled', t <= e));
  }
}
function debounce(e, i) {
  let s;
  return (...t) => {
    clearTimeout(s), (s = setTimeout(() => e.apply(this, t), i));
  };
}
function fetchConfig(t = 'json') {
  return { method: 'POST', headers: { 'Content-Type': 'application/json', Accept: 'application/' + t } };
}
customElements.define('quantity-input', QuantityInput),
  void 0 === window.Shopify && (window.Shopify = {}),
  (Shopify.bind = function (t, e) {
    return function () {
      return t.apply(e, arguments);
    };
  }),
  (Shopify.setSelectorByValue = function (t, e) {
    for (var i = 0, s = t.options.length; i < s; i++) {
      var n = t.options[i];
      if (e == n.value || e == n.innerHTML) return (t.selectedIndex = i);
    }
  }),
  (Shopify.addListener = function (t, e, i) {
    t.addEventListener ? t.addEventListener(e, i, !1) : t.attachEvent('on' + e, i);
  }),
  (Shopify.postLink = function (t, e) {
    var i,
      s = (e = e || {}).method || 'post',
      n = e.parameters || {},
      r = document.createElement('form');
    for (i in (r.setAttribute('method', s), r.setAttribute('action', t), n)) {
      var o = document.createElement('input');
      o.setAttribute('type', 'hidden'), o.setAttribute('name', i), o.setAttribute('value', n[i]), r.appendChild(o);
    }
    document.body.appendChild(r), r.submit(), document.body.removeChild(r);
  }),
  (Shopify.CountryProvinceSelector = function (t, e, i) {
    (this.countryEl = document.getElementById(t)),
      (this.provinceEl = document.getElementById(e)),
      (this.provinceContainer = document.getElementById(i.hideElement || e)),
      Shopify.addListener(this.countryEl, 'change', Shopify.bind(this.countryHandler, this)),
      this.initCountry(),
      this.initProvince();
  }),
  (Shopify.CountryProvinceSelector.prototype = {
    initCountry: function () {
      var t = this.countryEl.getAttribute('data-default');
      Shopify.setSelectorByValue(this.countryEl, t), this.countryHandler();
    },
    initProvince: function () {
      var t = this.provinceEl.getAttribute('data-default');
      t && 0 < this.provinceEl.options.length && Shopify.setSelectorByValue(this.provinceEl, t);
    },
    countryHandler: function (t) {
      var e = (s = this.countryEl.options[this.countryEl.selectedIndex]).getAttribute('data-provinces'),
        i = JSON.parse(e);
      if ((this.clearOptions(this.provinceEl), i && 0 == i.length)) this.provinceContainer.style.display = 'none';
      else {
        for (var s, n = 0; n < i.length; n++)
          ((s = document.createElement('option')).value = i[n][0]),
            (s.innerHTML = i[n][1]),
            this.provinceEl.appendChild(s);
        this.provinceContainer.style.display = '';
      }
    },
    clearOptions: function (t) {
      for (; t.firstChild; ) t.removeChild(t.firstChild);
    },
    setOptions: function (t, e) {
      var i = 0;
      for (e.length; i < e.length; i++) {
        var s = document.createElement('option');
        (s.value = e[i]), (s.innerHTML = e[i]), t.appendChild(s);
      }
    },
  });
class MenuDrawer extends HTMLElement {
  constructor() {
    super(),
      (this.mainDetailsToggle = this.querySelector('details')),
      this.addEventListener('keyup', this.onKeyUp.bind(this)),
      this.addEventListener('focusout', this.onFocusOut.bind(this)),
      this.bindEvents();
  }
  bindEvents() {
    this.querySelectorAll('summary').forEach((t) => t.addEventListener('click', this.onSummaryClick.bind(this))),
      this.querySelectorAll('button:not(.localization-selector)').forEach((t) =>
        t.addEventListener('click', this.onCloseButtonClick.bind(this))
      );
  }
  onKeyUp(t) {
    var e;
    'ESCAPE' === t.code.toUpperCase() &&
      (e = t.target.closest('details[open]')) &&
      (e === this.mainDetailsToggle
        ? this.closeMenuDrawer(t, this.mainDetailsToggle.querySelector('summary'))
        : this.closeSubmenu(e));
  }
  onSummaryClick(t) {
    const e = t.currentTarget,
      i = e.parentNode,
      s = i.closest('.has-submenu');
    var n = i.hasAttribute('open');
    const r = window.matchMedia('(prefers-reduced-motion: reduce)');
    function o() {
      trapFocus(e.nextElementSibling, i.querySelector('button')),
        e.nextElementSibling.removeEventListener('transitionend', o);
    }
    i === this.mainDetailsToggle
      ? (n && t.preventDefault(),
        n ? this.closeMenuDrawer(t, e) : this.openMenuDrawer(e),
        window.matchMedia('(max-width: 990px)') &&
          document.documentElement.style.setProperty('--viewport-height', window.innerHeight + 'px'))
      : setTimeout(() => {
          i.classList.add('menu-opening'),
            e.setAttribute('aria-expanded', !0),
            s && s.classList.add('submenu-open'),
            !r || r.matches ? o() : e.nextElementSibling.addEventListener('transitionend', o);
        }, 100);
  }
  openMenuDrawer(t) {
    setTimeout(() => {
      this.mainDetailsToggle.classList.add('menu-opening');
    }),
      t.setAttribute('aria-expanded', !0),
      trapFocus(this.mainDetailsToggle, t),
      document.body.classList.add('overflow-hidden-' + this.dataset.breakpoint);
  }
  closeMenuDrawer(t, e = !1) {
    void 0 !== t &&
      (this.mainDetailsToggle.classList.remove('menu-opening'),
      this.mainDetailsToggle.querySelectorAll('details').forEach((t) => {
        t.removeAttribute('open'), t.classList.remove('menu-opening');
      }),
      this.mainDetailsToggle.querySelectorAll('.submenu-open').forEach((t) => {
        t.classList.remove('submenu-open');
      }),
      document.body.classList.remove('overflow-hidden-' + this.dataset.breakpoint),
      removeTrapFocus(e),
      this.closeAnimation(this.mainDetailsToggle),
      t instanceof KeyboardEvent) &&
      e?.setAttribute('aria-expanded', !1);
  }
  onFocusOut() {
    setTimeout(() => {
      this.mainDetailsToggle.hasAttribute('open') &&
        !this.mainDetailsToggle.contains(document.activeElement) &&
        this.closeMenuDrawer();
    });
  }
  onCloseButtonClick(t) {
    t = t.currentTarget.closest('details');
    this.closeSubmenu(t);
  }
  closeSubmenu(t) {
    var e = t.closest('.submenu-open');
    e && e.classList.remove('submenu-open'),
      t.classList.remove('menu-opening'),
      t.querySelector('summary').setAttribute('aria-expanded', !1),
      removeTrapFocus(t.querySelector('summary')),
      this.closeAnimation(t);
  }
  closeAnimation(e) {
    let i;
    const s = (t) => {
      t - (i = void 0 === i ? t : i) < 400
        ? window.requestAnimationFrame(s)
        : (e.removeAttribute('open'),
          e.closest('details[open]') && trapFocus(e.closest('details[open]'), e.querySelector('summary')));
    };
    window.requestAnimationFrame(s);
  }
}
customElements.define('menu-drawer', MenuDrawer);
class HeaderDrawer extends MenuDrawer {
  constructor() {
    super();
  }
  openMenuDrawer(t) {
    (this.header = this.header || document.querySelector('.section-header')),
      (this.borderOffset =
        this.borderOffset || this.closest('.header-wrapper').classList.contains('header-wrapper--border-bottom')
          ? 1
          : 0),
      document.documentElement.style.setProperty(
        '--header-bottom-position',
        parseInt(this.header.getBoundingClientRect().bottom - this.borderOffset) + 'px'
      ),
      this.header.classList.add('menu-open'),
      setTimeout(() => {
        this.mainDetailsToggle.classList.add('menu-opening');
      }),
      t.setAttribute('aria-expanded', !0),
      window.addEventListener('resize', this.onResize),
      trapFocus(this.mainDetailsToggle, t),
      document.body.classList.add('overflow-hidden-' + this.dataset.breakpoint);
  }
  closeMenuDrawer(t, e) {
    e &&
      (super.closeMenuDrawer(t, e),
      this.header.classList.remove('menu-open'),
      window.removeEventListener('resize', this.onResize));
  }
  onResize = () => {
    this.header &&
      document.documentElement.style.setProperty(
        '--header-bottom-position',
        parseInt(this.header.getBoundingClientRect().bottom - this.borderOffset) + 'px'
      ),
      document.documentElement.style.setProperty('--viewport-height', window.innerHeight + 'px');
  };
}
customElements.define('header-drawer', HeaderDrawer);
class ModalDialog extends HTMLElement {
  constructor() {
    super(),
      this.querySelector('[id^="ModalClose-"]').addEventListener('click', this.hide.bind(this, !1)),
      this.addEventListener('keyup', (t) => {
        'ESCAPE' === t.code.toUpperCase() && this.hide();
      }),
      this.classList.contains('media-modal')
        ? this.addEventListener('pointerup', (t) => {
            'mouse' !== t.pointerType || t.target.closest('deferred-media, product-model') || this.hide();
          })
        : this.addEventListener('click', (t) => {
            t.target === this && this.hide();
          });
  }
  connectedCallback() {
    this.moved || ((this.moved = !0), document.body.appendChild(this));
  }
  show(t) {
    this.openedBy = t;
    t = this.querySelector('.template-popup');
    document.body.classList.add('overflow-hidden'),
      this.setAttribute('open', ''),
      t && t.loadContent(),
      trapFocus(this, this.querySelector('[role="dialog"]')),
      window.pauseAllMedia();
  }
  hide() {
    document.body.classList.remove('overflow-hidden'),
      document.body.dispatchEvent(new CustomEvent('modalClosed')),
      this.removeAttribute('open'),
      removeTrapFocus(this.openedBy),
      window.pauseAllMedia();
  }
}
customElements.define('modal-dialog', ModalDialog);
class ModalOpener extends HTMLElement {
  constructor() {
    super();
    const e = this.querySelector('button');
    e &&
      e.addEventListener('click', () => {
        var t = document.querySelector(this.getAttribute('data-modal'));
        t && t.show(e);
      });
  }
}
customElements.define('modal-opener', ModalOpener);
class DeferredMedia extends HTMLElement {
  constructor() {
    super();
    var t = this.querySelector('[id^="Deferred-Poster-"]');
    t && t.addEventListener('click', this.loadContent.bind(this));
  }
  loadContent(t = !0) {
    var e;
    window.pauseAllMedia(),
      this.getAttribute('loaded') ||
        ((e = document.createElement('div')).appendChild(
          this.querySelector('template').content.firstElementChild.cloneNode(!0)
        ),
        this.setAttribute('loaded', !0),
        (e = this.appendChild(e.querySelector('video, model-viewer, iframe'))),
        t && e.focus(),
        'VIDEO' == e.nodeName && e.getAttribute('autoplay') && e.play());
  }
}
customElements.define('deferred-media', DeferredMedia);
class SliderComponent extends HTMLElement {
  constructor() {
    super(),
      (this.slider = this.querySelector('[id^="Slider-"]')),
      (this.sliderItems = this.querySelectorAll('[id^="Slide-"]')),
      (this.enableSliderLooping = !1),
      (this.currentPageElement = this.querySelector('.slider-counter--current')),
      (this.pageTotalElement = this.querySelector('.slider-counter--total')),
      (this.prevButton = this.querySelector('button[name="previous"]')),
      (this.nextButton = this.querySelector('button[name="next"]')),
      this.slider &&
        this.nextButton &&
        (this.initPages(),
        new ResizeObserver((t) => this.initPages()).observe(this.slider),
        this.slider.addEventListener('scroll', this.update.bind(this)),
        this.prevButton.addEventListener('click', this.onButtonClick.bind(this)),
        this.nextButton.addEventListener('click', this.onButtonClick.bind(this)));
  }
  initPages() {
    (this.sliderItemsToShow = Array.from(this.sliderItems).filter((t) => 0 < t.clientWidth)),
      this.sliderItemsToShow.length < 2 ||
        ((this.sliderItemOffset = this.sliderItemsToShow[1].offsetLeft - this.sliderItemsToShow[0].offsetLeft),
        (this.slidesPerPage = Math.floor(
          (this.slider.clientWidth - this.sliderItemsToShow[0].offsetLeft) / this.sliderItemOffset
        )),
        (this.totalPages = this.sliderItemsToShow.length - this.slidesPerPage + 1),
        this.update());
  }
  resetPages() {
    (this.sliderItems = this.querySelectorAll('[id^="Slide-"]')), this.initPages();
  }
  update() {
    var t;
    this.slider &&
      this.nextButton &&
      ((t = this.currentPage),
      (this.currentPage = Math.round(this.slider.scrollLeft / this.sliderItemOffset) + 1),
      this.currentPageElement &&
        this.pageTotalElement &&
        ((this.currentPageElement.textContent = this.currentPage),
        (this.pageTotalElement.textContent = this.totalPages)),
      this.currentPage != t &&
        this.dispatchEvent(
          new CustomEvent('slideChanged', {
            detail: { currentPage: this.currentPage, currentElement: this.sliderItemsToShow[this.currentPage - 1] },
          })
        ),
      this.enableSliderLooping ||
        (this.isSlideVisible(this.sliderItemsToShow[0]) && 0 === this.slider.scrollLeft
          ? this.prevButton.setAttribute('disabled', 'disabled')
          : this.prevButton.removeAttribute('disabled'),
        this.isSlideVisible(this.sliderItemsToShow[this.sliderItemsToShow.length - 1])
          ? this.nextButton.setAttribute('disabled', 'disabled')
          : this.nextButton.removeAttribute('disabled')));
  }
  isSlideVisible(t, e = 0) {
    e = this.slider.clientWidth + this.slider.scrollLeft - e;
    return t.offsetLeft + t.clientWidth <= e && t.offsetLeft >= this.slider.scrollLeft;
  }
  onButtonClick(t) {
    t.preventDefault();
    var e = t.currentTarget.dataset.step || 1;
    (this.slideScrollPosition =
      'next' === t.currentTarget.name
        ? this.slider.scrollLeft + e * this.sliderItemOffset
        : this.slider.scrollLeft - e * this.sliderItemOffset),
      this.slider.scrollTo({ left: this.slideScrollPosition });
  }
}
customElements.define('slider-component', SliderComponent);
class SlideshowComponent extends SliderComponent {
  constructor() {
    super(),
      (this.sliderControlWrapper = this.querySelector('.slider-buttons')),
      (this.enableSliderLooping = !0),
      this.sliderControlWrapper &&
        ((this.sliderFirstItemNode = this.slider.querySelector('.slideshow__slide')),
        0 < this.sliderItemsToShow.length && (this.currentPage = 1),
        (this.sliderControlLinksArray = Array.from(
          this.sliderControlWrapper.querySelectorAll('.slider-counter__link')
        )),
        this.sliderControlLinksArray.forEach((t) => t.addEventListener('click', this.linkToSlide.bind(this))),
        this.slider.addEventListener('scroll', this.setSlideVisibility.bind(this)),
        this.setSlideVisibility(),
        this.querySelector('.announcement-bar-slider') &&
          ((this.announcementBarArrowButtonWasClicked = !1),
          (this.desktopLayout = window.matchMedia('(min-width: 750px)')),
          (this.reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')),
          [this.reducedMotion, this.desktopLayout].forEach((t) => {
            t.addEventListener('change', () => {
              'true' === this.slider.getAttribute('data-autoplay') && this.setAutoPlay();
            });
          }),
          [this.prevButton, this.nextButton].forEach((t) => {
            t.addEventListener(
              'click',
              () => {
                this.announcementBarArrowButtonWasClicked = !0;
              },
              { once: !0 }
            );
          })),
        'true' === this.slider.getAttribute('data-autoplay')) &&
        this.setAutoPlay();
  }
  setAutoPlay() {
    (this.autoplaySpeed = 1e3 * this.slider.dataset.speed),
      this.addEventListener('mouseover', this.focusInHandling.bind(this)),
      this.addEventListener('mouseleave', this.focusOutHandling.bind(this)),
      this.addEventListener('focusin', this.focusInHandling.bind(this)),
      this.addEventListener('focusout', this.focusOutHandling.bind(this)),
      this.querySelector('.slideshow__autoplay')
        ? ((this.sliderAutoplayButton = this.querySelector('.slideshow__autoplay')),
          this.sliderAutoplayButton.addEventListener('click', this.autoPlayToggle.bind(this)),
          (this.autoplayButtonIsSetToPlay = !0),
          this.play())
        : this.reducedMotion.matches || this.announcementBarArrowButtonWasClicked || !this.desktopLayout.matches
        ? this.pause()
        : this.play();
  }
  onButtonClick(t) {
    super.onButtonClick(t);
    var e = 1 === this.currentPage,
      i = this.currentPage === this.sliderItemsToShow.length;
    (e || i) &&
      (e && 'previous' === t.currentTarget.name
        ? (this.slideScrollPosition =
            this.slider.scrollLeft + this.sliderFirstItemNode.clientWidth * this.sliderItemsToShow.length)
        : i && 'next' === t.currentTarget.name && (this.slideScrollPosition = 0),
      this.slider.scrollTo({ left: this.slideScrollPosition }));
  }
  update() {
    super.update(),
      (this.sliderControlButtons = this.querySelectorAll('.slider-counter__link')),
      this.prevButton.removeAttribute('disabled'),
      this.sliderControlButtons.length &&
        (this.sliderControlButtons.forEach((t) => {
          t.classList.remove('slider-counter__link--active'), t.removeAttribute('aria-current');
        }),
        this.sliderControlButtons[this.currentPage - 1].classList.add('slider-counter__link--active'),
        this.sliderControlButtons[this.currentPage - 1].setAttribute('aria-current', !0));
  }
  autoPlayToggle() {
    this.togglePlayButtonState(this.autoplayButtonIsSetToPlay),
      this.autoplayButtonIsSetToPlay ? this.pause() : this.play(),
      (this.autoplayButtonIsSetToPlay = !this.autoplayButtonIsSetToPlay);
  }
  focusOutHandling(t) {
    this.sliderAutoplayButton
      ? ((t = t.target === this.sliderAutoplayButton || this.sliderAutoplayButton.contains(t.target)),
        this.autoplayButtonIsSetToPlay && !t && this.play())
      : this.reducedMotion.matches ||
        this.announcementBarArrowButtonWasClicked ||
        !this.desktopLayout.matches ||
        this.play();
  }
  focusInHandling(t) {
    this.sliderAutoplayButton
      ? (t.target === this.sliderAutoplayButton || this.sliderAutoplayButton.contains(t.target)) &&
        this.autoplayButtonIsSetToPlay
        ? this.play()
        : this.autoplayButtonIsSetToPlay && this.pause()
      : this.querySelector('.announcement-bar-slider').contains(t.target) && this.pause();
  }
  play() {
    this.slider.setAttribute('aria-live', 'off'),
      clearInterval(this.autoplay),
      (this.autoplay = setInterval(this.autoRotateSlides.bind(this), this.autoplaySpeed));
  }
  pause() {
    this.slider.setAttribute('aria-live', 'polite'), clearInterval(this.autoplay);
  }
  togglePlayButtonState(t) {
    t
      ? (this.sliderAutoplayButton.classList.add('slideshow__autoplay--paused'),
        this.sliderAutoplayButton.setAttribute('aria-label', window.accessibilityStrings.playSlideshow))
      : (this.sliderAutoplayButton.classList.remove('slideshow__autoplay--paused'),
        this.sliderAutoplayButton.setAttribute('aria-label', window.accessibilityStrings.pauseSlideshow));
  }
  autoRotateSlides() {
    var t =
      this.currentPage === this.sliderItems.length
        ? 0
        : this.slider.scrollLeft + this.slider.querySelector('.slideshow__slide').clientWidth;
    this.slider.scrollTo({ left: t });
  }
  setSlideVisibility() {
    this.sliderItemsToShow.forEach((t, e) => {
      var i = t.querySelectorAll('a');
      e === this.currentPage - 1
        ? (i.length &&
            i.forEach((t) => {
              t.removeAttribute('tabindex');
            }),
          t.setAttribute('aria-hidden', 'false'),
          t.removeAttribute('tabindex'))
        : (i.length &&
            i.forEach((t) => {
              t.setAttribute('tabindex', '-1');
            }),
          t.setAttribute('aria-hidden', 'true'),
          t.setAttribute('tabindex', '-1'));
    });
  }
  linkToSlide(t) {
    t.preventDefault();
    t =
      this.slider.scrollLeft +
      this.sliderFirstItemNode.clientWidth *
        (this.sliderControlLinksArray.indexOf(t.currentTarget) + 1 - this.currentPage);
    this.slider.scrollTo({ left: t });
  }
}
customElements.define('slideshow-component', SlideshowComponent);
class VariantSelects extends HTMLElement {
  constructor() {
    super(), this.addEventListener('change', this.onVariantChange);
  }
  onVariantChange() {
    this.updateOptions(),
      this.updateMasterId(),
      this.toggleAddButton(!0, '', !1),
      this.updatePickupAvailability(),
      this.removeErrorMessage(),
      this.updateVariantStatuses(),
      this.currentVariant
        ? (this.updateMedia(),
          this.updateURL(),
          this.updateVariantInput(),
          this.renderProductInfo(),
          this.updateShareUrl())
        : (this.toggleAddButton(!0, '', !0), this.setUnavailable());
  }
  updateOptions() {
    this.options = Array.from(this.querySelectorAll('select'), (t) => t.value);
  }
  updateMasterId() {
    this.currentVariant = this.getVariantData().find(
      (t) => !t.options.map((t, e) => this.options[e] === t).includes(!1)
    );
  }
  updateMedia() {
    var t, e;
    this.currentVariant &&
      this.currentVariant.featured_media &&
      (document
        .querySelectorAll(`[id^="MediaGallery-${this.dataset.section}"]`)
        .forEach((t) => t.setActiveMedia(this.dataset.section + '-' + this.currentVariant.featured_media.id, !0)),
      (t = document.querySelector(`#ProductModal-${this.dataset.section} .product-media-modal__content`))) &&
      ((e = t.querySelector(`[data-media-id="${this.currentVariant.featured_media.id}"]`)), t.prepend(e));
  }
  updateURL() {
    this.currentVariant &&
      'false' !== this.dataset.updateUrl &&
      window.history.replaceState({}, '', this.dataset.url + '?variant=' + this.currentVariant.id);
  }
  updateShareUrl() {
    var t = document.getElementById('Share-' + this.dataset.section);
    t && t.updateUrl && t.updateUrl('' + window.shopUrl + this.dataset.url + '?variant=' + this.currentVariant.id);
  }
  updateVariantInput() {
    document
      .querySelectorAll(`#product-form-${this.dataset.section}, #product-form-installment-` + this.dataset.section)
      .forEach((t) => {
        t = t.querySelector('input[name="id"]');
        (t.value = this.currentVariant.id), t.dispatchEvent(new Event('change', { bubbles: !0 }));
      });
  }
  updateVariantStatuses() {
    const n = this.variantData.filter((t) => this.querySelector(':checked').value === t.option1),
      r = [...this.querySelectorAll('.product-form__input')];
    r.forEach((t, e) => {
      if (0 !== e) {
        t = [...t.querySelectorAll('input[type="radio"], option')];
        const s = r[e - 1].querySelector(':checked').value;
        var i = n.filter((t) => t.available && t['option' + e] === s).map((t) => t['option' + (e + 1)]);
        this.setInputAvailability(t, i);
      }
    });
  }
  setInputAvailability(t, e) {
    t.forEach((t) => {
      e.includes(t.getAttribute('value'))
        ? (t.innerText = t.getAttribute('value'))
        : (t.innerText = window.variantStrings.unavailable_with_option.replace('[value]', t.getAttribute('value')));
    });
  }
  updatePickupAvailability() {
    var t = document.querySelector('pickup-availability');
    t &&
      (this.currentVariant && this.currentVariant.available
        ? t.fetchAvailability(this.currentVariant.id)
        : (t.removeAttribute('available'), (t.innerHTML = '')));
  }
  removeErrorMessage() {
    var t = this.closest('section');
    t && (t = t.querySelector('product-form')) && t.handleErrorMessage();
  }
  renderProductInfo() {
    const a = this.currentVariant.id,
      l = this.dataset.originalSection || this.dataset.section;
    fetch(`${this.dataset.url}?variant=${a}&section_id=` + (this.dataset.originalSection || this.dataset.section))
      .then((t) => t.text())
      .then((t) => {
        var e, i, s, n, r, o;
        this.currentVariant.id === a &&
          ((t = new DOMParser().parseFromString(t, 'text/html')),
          (r = document.getElementById('price-' + this.dataset.section)),
          (o = t.getElementById('price-' + (this.dataset.originalSection || this.dataset.section))),
          (e = t.getElementById('Sku-' + (this.dataset.originalSection || this.dataset.section))),
          (i = document.getElementById('Sku-' + this.dataset.section)),
          (s = t.getElementById('Inventory-' + (this.dataset.originalSection || this.dataset.section))),
          (n = document.getElementById('Inventory-' + this.dataset.section)),
          o && r && (r.innerHTML = o.innerHTML),
          s && n && (n.innerHTML = s.innerHTML),
          e &&
            i &&
            ((i.innerHTML = e.innerHTML),
            i.classList.toggle('visibility-hidden', e.classList.contains('visibility-hidden'))),
          (r = document.getElementById('price-' + this.dataset.section)) && r.classList.remove('visibility-hidden'),
          n && n.classList.toggle('visibility-hidden', '' === s.innerText),
          (o = t.getElementById('ProductSubmitButton-' + l)),
          this.toggleAddButton(!o || o.hasAttribute('disabled'), window.variantStrings.soldOut),
          publish(PUB_SUB_EVENTS.variantChange, { data: { sectionId: l, html: t, variant: this.currentVariant } }));
      });
  }
  toggleAddButton(t = !0, e, i) {
    var s,
      n = document.getElementById('product-form-' + this.dataset.section);
    n &&
      ((s = n.querySelector('[name="add"]')), (n = n.querySelector('[name="add"] > span')), s) &&
      (t
        ? (s.setAttribute('disabled', 'disabled'), e && (n.textContent = e))
        : (s.removeAttribute('disabled'), (n.textContent = window.variantStrings.addToCart)));
  }
  setUnavailable() {
    var t = document.getElementById('product-form-' + this.dataset.section),
      e = t.querySelector('[name="add"]'),
      t = t.querySelector('[name="add"] > span'),
      i = document.getElementById('price-' + this.dataset.section),
      s = document.getElementById('Inventory-' + this.dataset.section),
      n = document.getElementById('Sku-' + this.dataset.section);
    e &&
      ((t.textContent = window.variantStrings.unavailable),
      i && i.classList.add('visibility-hidden'),
      s && s.classList.add('visibility-hidden'),
      n) &&
      n.classList.add('visibility-hidden');
  }
  getVariantData() {
    return (
      (this.variantData = this.variantData || JSON.parse(this.querySelector('[type="application/json"]').textContent)),
      this.variantData
    );
  }
}
customElements.define('variant-selects', VariantSelects);
class VariantRadios extends VariantSelects {
  constructor() {
    super();
  }
  setInputAvailability(t, e) {
    t.forEach((t) => {
      e.includes(t.getAttribute('value')) ? t.classList.remove('disabled') : t.classList.add('disabled');
    });
  }
  updateOptions() {
    var t = Array.from(this.querySelectorAll('fieldset'));
    this.options = t.map((t) => Array.from(t.querySelectorAll('input')).find((t) => t.checked).value);
  }
}
customElements.define('variant-radios', VariantRadios);
class ProductRecommendations extends HTMLElement {
  constructor() {
    super();
  }
  connectedCallback() {
    new IntersectionObserver(
      ((t, e) => {
        t[0].isIntersecting &&
          (e.unobserve(this),
          fetch(this.dataset.url)
            .then((t) => t.text())
            .then((t) => {
              var e = document.createElement('div'),
                t = ((e.innerHTML = t), e.querySelector('product-recommendations'));
              t && t.innerHTML.trim().length && (this.innerHTML = t.innerHTML),
                !this.querySelector('slideshow-component') &&
                  this.classList.contains('complementary-products') &&
                  this.remove(),
                e.querySelector('.grid__item') && this.classList.add('product-recommendations--loaded');
            })
            .catch((t) => {
              console.error(t);
            }));
      }).bind(this),
      { rootMargin: '0px 0px 400px 0px' }
    ).observe(this);
  }
}
customElements.define('product-recommendations', ProductRecommendations), alert('js');
