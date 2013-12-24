(function() {
  define(['jquery', 'underscore', 'backbone', 'models/user', 'text!templates/profile.html'], function($, _, Backbone, UserModel, Template) {
    return Backbone.View.extend({
      el: '.container',
      initialize: function() {
        var model,
          _this = this;
        model = new UserModel({
          id: this.id
        });
        return model.fetch({
          success: function() {
            return _this.$el.html(_.template(Template, {
              id: _this.id,
              model: model
            }));
          }
        });
      }
    });
  });

}).call(this);
