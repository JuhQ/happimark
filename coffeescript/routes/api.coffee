exports.index = (req, res) ->
  res.jsonp req.params

exports.user = (req, res) ->
  mongoose = require 'mongoose'
  Users = mongoose.model 'users'
  Users
    .findOne()
    .where('id')
    .equals(req.params.id)
    .exec (err, data) ->
      if err
        res.jsonp err
      else if !data
        res.jsonp null
      else
        res.jsonp data
