(function() {
  define(['backbone'], function(Backbone) {
    return Backbone.Model.extend({
      url: function() {
        return "/api/link/" + this.id;
      },
      idAttribute: '_id'
    });
  });

}).call(this);
