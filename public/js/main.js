(function() {
  requirejs.config({
    baseUrl: '/js',
    enforceDefine: true,
    paths: {
      jquery: 'libs/jquery',
      backbone: 'libs/backbone',
      underscore: 'libs/lodash.min',
      text: 'libs/text'
    }
  });

  define(['jquery', 'underscore', 'backbone', 'libs/fastclick', 'router/router'], function($, _, Backbone, Fastclick, Router) {
    var router;
    router = new Router();
    Backbone.history.start({
      replace: true
    });
    return new FastClick(document.body);
  });

}).call(this);
