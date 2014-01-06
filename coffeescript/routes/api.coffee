mongoose = require 'mongoose'
Q = require('q')

findUser = (userid) ->
  deferred = Q.defer()
  mongoose
    .model('users')
    .findOne()
    .where('id')
    .equals(userid)
    .select('_id username name')
    .exec (error, data) ->
      if error
        deferred.reject error
      else if !data
        deferred.resolve null
      else
        deferred.resolve data

  deferred.promise

exports.index = (req, res) ->
  res.jsonp req.params

exports.findUser = (req, res) ->
  Q.when(findUser(req.params.id))
    .then (user) ->
      if !user
        res.jsonp null
      else
        res.jsonp user

exports.linkList = (req, res) ->
  if !req.user
    res.jsonp error: 'Not logged in'
  else
    Q.when(findUser(req.user))
      .then (user) ->
        mongoose
          .model('links')
          .find()
          .where('user')
          .equals(user._id)
          .sort(created: 'desc')
          .exec (error, data) ->
            if error
              res.jsonp error
            else if !data
              res.jsonp null
            else
              res.jsonp data

exports.addLink = (req, res) ->
  if !req.user
    res.jsonp error: 'Not logged in'
  else

    Q.when(findUser(req.user))
      .then (user) ->
        Links = mongoose.model('links')
        link = new Links
          url: req.body.url
          title: req.body.title
          description: req.body.description
          user: user._id

        link.save (error) ->
          if error
            res.jsonp {error}
          else
            res.jsonp req.body


exports.removeLink = (req, res) ->
  if !req.user
    res.jsonp error: 'Not logged in'
  else
    Q.when(findUser(req.user))
      .then (user) ->
        options =
          _id: req.params.id
          user: user._id

        mongoose
          .model('links')
          .findOneAndRemove options, ->
            res.jsonp removed: true
