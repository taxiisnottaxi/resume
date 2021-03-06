!function () {
  // 我们拿到这个view
  var view = window.View('#mySlides');
  var controller = {
    view: null,
    swiper: null,
    swiperOptions: {
      loop: true,
      pagination: {
        el: '.swiper-pagination'
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev'
      }
    },
    init: function () {
      this.view = view;
      this.initSwiper();
    },
    initSwiper: function () {
      this.swiper = new Swiper(this.view.querySelector('.swiper-container'), this.swiperOptions);
    }
  };
  controller.init(view);
}.call();