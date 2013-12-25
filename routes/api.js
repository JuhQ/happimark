(function() {
  var mongoose;

  mongoose = require('mongoose');

  exports.index = function(req, res) {
    return res.jsonp(req.params);
  };

  exports.user = function(req, res) {
    var Users;
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

  exports.linkList = function(req, res) {
    var Links;
    Links = mongoose.model('links');
    return Links.find().sort({
      created: 'desc'
    }).exec(function(err, data) {
      if (err) {
        return res.jsonp(err);
      } else if (!data) {
        return res.jsonp(null);
      } else {
        return res.jsonp(data);
      }
    });
  };

  exports.linkAdd = function(req, res) {
    var Links, newLink;
    Links = mongoose.model('links');
    newLink = new Links({
      url: req.body.url,
      title: req.body.title,
      description: req.body.description
    });
    return newLink.save(function(err) {
      if (err) {
        return res.jsonp(err);
      } else {
        return res.jsonp('success');
      }
    });
  };

}).call(this);
