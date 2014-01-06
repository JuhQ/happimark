(function() {
  define(['jquery', 'underscore', 'backbone', 'collections/links', 'text!templates/linkitem.html'], function($, _, Backbone, LinkCollection, Template) {
    return Backbone.View.extend({
      el: '.link-list',
      events: {
        'click .remove': 'removeLink'
      },
      initialize: function() {
        var _this = this;
        this.links = new LinkCollection();
        return this.links.fetch().done(function() {
          return _this.links.each(function(model) {
            console.log(model);
            return _this.$el.append(_.template(Template, {
              model: model
            }));
          });
        });
      },
      removeLink: function(event) {
        var element, id;
        event.preventDefault();
        element = $(event.currentTarget);
        id = element.data('id');
        return this.links.get(id).destroy({
          success: function() {
            return element.parents('.media').remove();
          }
        });
      }
    });
  });

}).call(this);
