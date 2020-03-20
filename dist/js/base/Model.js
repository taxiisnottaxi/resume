/*
var model = Model({
    resourceName: '表名'
})
*/
window.Model = function (options) {
  let resourceName = options.resourceName;
  return {
    init: function () {
      // 初始化AV
      AV.init({
        appId: "pNbxqiLd8Sw4C3YlH9bGc9yd-gzGzoHsz",
        // 告诉是哪个APP，即ID
        appKey: "z93n3pL2moo4wdoCsRaaxBgh",
        // 告诉密码
        serverURLs: "https://pnbxqild.lc-cn-n1-shared.com" // 这边是绑定的测试API域名

      });
    },
    fetch: function () {
      var query = new AV.Query(resourceName);
      return query.find();
    },
    save: function (object) {
      var X = AV.Object.extend(resourceName);
      var x = new X();
      x.set('name', object.name);
      x.set('content', object.content);
      return x.save(object);
    }
  };
};