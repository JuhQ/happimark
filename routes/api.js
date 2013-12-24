(function() {
  exports.index = function(req, res) {
    return res.jsonp(req.params);
  };

  exports.user = function(req, res) {
    var Users, mongoose;
    mongoose = require('mongoose');
    Users = mongoose.model('users');
    return Users.findOne().where('id').equals(req.params.id).exec(function(err, data) {
      if (err) {
        return res.jsonp(err);
      } else if (!data) {
        return res.jsonp(null);
      } else {
        return res.jsonp(data);
      }
    });
  };

}).call(this);
