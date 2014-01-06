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
      clearForm: function() {
        return this.$('form input, form textarea').val('');
      },
      showError: function() {
        return this.$el.prepend(_.template(ErrorTemplate, {
          message: 'Something went wrong'
        }));
      },
      saveLink: function(event) {
        var formdata, model,
          _this = this;
        event.preventDefault();
        model = new LinkModel();
        formdata = Backbone.Syphon.serialize(event.target);
        return model.save(formdata, {
          success: function() {
            if (model.get('error')) {
              return _this.showError();
            } else {
              $('#right-col').prepend(_.template(LinkTemplate, {
                model: model
              }));
              return _this.clearForm();
            }
          },
          error: function() {
            _this.showError();
            return _this.clearForm();
          }
        });
      }
    });
  });

}).call(this);
