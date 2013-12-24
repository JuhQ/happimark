(function() {
  define(['jquery', 'underscore', 'backbone', 'views/linkform', 'text!templates/index.html'], function($, _, Backbone, LinkForm, Template) {
    return Backbone.View.extend({
      el: '.container',
      initialize: function() {
        this.$el.html(_.template(Template));
        return new LinkForm();
      }
    });
  });

}).call(this);
