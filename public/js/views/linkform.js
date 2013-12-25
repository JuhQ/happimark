(function() {
  define(['jquery', 'underscore', 'backbone', 'libs/backbone.syphon', 'models/user', 'models/link', 'text!templates/linkform.html', 'text!templates/linkitem.html', 'text!templates/error.html'], function($, _, Backbone, Syphon, UserModel, LinkModel, Template, LinkTemplate, ErrorTemplate) {
    return Backbone.View.extend({
      el: '.linkform',
      events: {
        'submit form': 'saveLink'
      },
      initialize: function() {
        return this.$el.html(_.template(Template));
      },
      saveLink: function(event) {
        var formdata;
        event.preventDefault();
        this.model = new LinkModel();
        formdata = Backbone.Syphon.serialize(event.target);
        this.model.save(formdata, {
          success: function() {
            return $('#right-col').prepend(_.template(LinkTemplate, formdata));
          },
          error: function() {
            return this.$el.prepend(_.template(ErrorTemplate, {
              message: 'Something went wrong'
            }));
          }
        });
        return this.$('form input, form textarea').val('');
      }
    });
  });

}).call(this);
