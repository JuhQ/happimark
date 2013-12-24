(function() {
  define(['backbone'], function(Backbone) {
    return Backbone.Model.extend({
      url: '/model'
    });
  });

}).call(this);
