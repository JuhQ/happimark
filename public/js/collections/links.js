(function() {
  define(['backbone', 'models/link'], function(Backbone, LinkModel) {
    return Backbone.Collection.extend({
      model: LinkModel,
      url: '/api/link'
    });
  });

}).call(this);
