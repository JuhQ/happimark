(function() {
  define(['views/index', 'views/profile'], function(Index, Profile) {
    return Backbone.Router.extend({
      view: null,
      routes: {
        '': 'index',
        'profile/:id': 'profile'
      },
      index: function() {
        return this.setPage(Index);
      },
      profile: function(id) {
        return this.setPage(Profile, {
          id: id
        });
      },
      setPage: function(Page, options) {
        if (this.view) {
          this.view.undelegateEvents();
        }
        this.view = new Page(options);
      }
    });
  });

}).call(this);
