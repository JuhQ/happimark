(function() {
  var Q, findUser, mongoose;

  mongoose = require('mongoose');

  Q = require('q');

  findUser = function(userid) {
    var deferred;
    deferred = Q.defer();
    mongoose.model('users').findOne().where('id').equals(userid).select('_id username name').exec(function(error, data) {
      if (error) {
        return deferred.reject(error);
      } else if (!data) {
        return deferred.resolve(null);
      } else {
        return deferred.resolve(data);
      }
    });
    return deferred.promise;
  };

  exports.index = function(req, res) {
    return res.jsonp(req.params);
  };

  exports.findUser = function(req, res) {
    return Q.when(findUser(req.params.id)).then(function(user) {
      if (!user) {
        return res.jsonp(null);
      } else {
        return res.jsonp(user);
      }
    });
  };

  exports.linkList = function(req, res) {
    if (!req.user) {
      return res.jsonp({
        error: 'Not logged in'
      });
    } else {
      return Q.when(findUser(req.user)).then(function(user) {
        return mongoose.model('links').find().where('user').equals(user._id).sort({
          created: 'desc'
        }).exec(function(error, data) {
          if (error) {
            return res.jsonp(error);
          } else if (!data) {
            return res.jsonp(null);
          } else {
            return res.jsonp(data);
          }
        });
      });
    }
  };

  exports.addLink = function(req, res) {
    if (!req.user) {
      return res.jsonp({
        error: 'Not logged in'
      });
    } else {
      return Q.when(findUser(req.user)).then(function(user) {
        var Links, link;
        Links = mongoose.model('links');
        link = new Links({
          url: req.body.url,
          title: req.body.title,
          description: req.body.description,
          user: user._id
        });
        return link.save(function(error) {
          if (error) {
            return res.jsonp({
              error: error
            });
          } else {
            return res.jsonp(req.body);
          }
        });
      });
    }
  };

  exports.removeLink = function(req, res) {
    if (!req.user) {
      return res.jsonp({
        error: 'Not logged in'
      });
    } else {
      return Q.when(findUser(req.user)).then(function(user) {
        var options;
        options = {
          _id: req.params.id,
          user: user._id
        };
        return mongoose.model('links').findOneAndRemove(options, function() {
          return res.jsonp({
            removed: true
          });
        });
      });
    }
  };

}).call(this);
