(function() {
  define(['jquery', 'underscore', 'backbone', 'models/user', 'text!templates/linkform.html'], function($, _, Backbone, UserModel, Template) {
    return Backbone.View.extend({
      el: '.linkform',
      events: {
        'submit form': 'saveLink'
      },
      initialize: function() {
        return this.$el.html(_.template(Template));
      },
      saveLink: function(event) {
        event.preventDefault();
        return this.$('form input').val('');
      }
    });
  });

}).call(this);
