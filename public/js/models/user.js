(function() {
  define(['backbone'], function(Backbone) {
    return Backbone.Model.extend({
      url: function() {
        return "/api/user/" + this.id;
      }
    });
  });

}).call(this);
