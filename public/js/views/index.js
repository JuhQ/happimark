(function() {
  define(['jquery', 'underscore', 'backbone', 'collections/link', 'views/linkform', 'text!templates/index.html', 'text!templates/linkitem.html'], function($, _, Backbone, LinkCollection, LinkForm, Template, LinkTemplate) {
    return Backbone.View.extend({
      el: '.container',
      initialize: function() {
        var _this = this;
        this.$el.html(_.template(Template));
        new LinkForm();
        this.linkCollection = new LinkCollection();
        return this.linkCollection.fetch().done(function() {
          return _this.render();
        });
      },
      render: function() {
        return this.linkCollection.each(function(link) {
          return $('#right-col').append(_.template(LinkTemplate, link.attributes));
        });
      }
    });
  });

}).call(this);
