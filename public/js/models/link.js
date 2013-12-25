(function() {
  define(['backbone'], function(Backbone) {
    return Backbone.Model.extend({
      url: function() {
        return "http://localhost:3200/api/link";
      }
    });
  });

}).call(this);
