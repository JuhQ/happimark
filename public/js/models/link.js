(function() {
  define(['backbone'], function(Backbone) {
    return Backbone.Model.extend({
      url: "api/link"
    });
  });

}).call(this);
