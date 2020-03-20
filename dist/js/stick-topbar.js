!function () {
  var view = window.View('#topNavBar');
  var controller = {
    view: null,
    init: function (view) {
      this.view = view;
      this.bindEvents();
    },
    // 绑定函数里面只做绑定的事情，其余操作放到外面，方便管理
    bindEvents: function () {
      var view = this.view; // 这边使用箭头函数是因为箭头函数没有this，其this跟外层一样

      window.addEventListener('scroll', x => {
        if (window.scrollY > 0) {
          this.active();
        } else {
          this.deactive();
        }
      });
    },
    active: function () {
      view.classList.add('sticky');
    },
    deactive: function () {
      view.topNavBar.classList.remove('sticky');
    }
  };
  controller.init(view);
}.call();