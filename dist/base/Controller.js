/*
Controller({
    init: (view, model){
        this.xxx()
        this.yyy()
    },
    xxx(){}
    yyy(){}
})
*/
window.Controller = function (options) {
  // 首先拿到options，这个在调用传进去的函数会有自己的init方法，怎么合起来，先调用自己的init，然后调用传入的option的init
  // 这边的做法是使用闭包，将option单独的init存下来，在下面调用
  var init = options.init; // 这个options.init

  object = {
    view: null,
    model: null,
    // 这个Controller返回的就是object，所以承接的就是object，而调用的this就是指object
    init: function (view, model) {
      this.view = view;
      this.model = model;
      this.model.init(); // 这个this就是object，也就是object的init调用的时候会调用options的init
      // 同时将object作为this传进去。

      init.call(this, view, model); // 这边的调用就是将其变成

      options.bindEvents.call(this);
    }
  }; // 我们需要将option的属性全部给object，不然上面调用options的init的时候，this指向的是object
  // 如果不将这些属性给object，就没法调用

  for (let key in options) {
    if (key !== 'init') {
      object[key] = options[key];
    }
  }

  return object;
}; // 我们调用Controller的时候传进去的是一个options对象，返回的是一个object对象，也就是我们使用controller承接的对象
// 我们发现我们传入的options有一个init方法，而Controller也有一个init方法，我们两个都需要调用，那么就使用闭包
// 使用闭包将options里面的init方法调出阿莱，在object的init里面调用