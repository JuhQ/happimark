(function() {
  exports.index = function(req, res) {
    return res.render('index', {
      loggedin: req.user
    });
  };

  exports.logout = function(req, res) {
    req.logout();
    return res.redirect('/');
  };

  exports.loginSuccess = function(req, res) {
    return res.redirect('/');
  };

  exports.loginFail = function(req, res) {
    return res.send('Epic login fail :(');
  };

}).call(this);
