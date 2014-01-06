(function() {
  define(['jquery', 'underscore', 'backbone', 'views/linkform', 'views/linklist', 'text!templates/index.html'], function($, _, Backbone, LinkForm, LinkList, Template) {
    return Backbone.View.extend({
      el: '.container',
      initialize: function() {
        this.$el.html(_.template(Template));
        new LinkForm();
        return new LinkList();
      }
    });
  });

}).call(this);
