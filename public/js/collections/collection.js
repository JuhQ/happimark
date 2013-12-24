(function() {
  define(['backbone'], function(Backbone) {
    return Backbone.Collection.extend({
      url: '/api/collection'
    });
  });

}).call(this);
