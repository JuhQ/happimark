mongoose = require 'mongoose'

exports.index = (req, res) ->
  res.jsonp req.params

exports.user = (req, res) ->
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

exports.linkList = (req, res) ->
  Links = mongoose.model 'links'
  Links
    .find()
    .sort(created: 'desc')
    .exec (err, data) ->
      if err
        res.jsonp err
      else if !data
        res.jsonp null
      else
        res.jsonp data

# Add a new link to the database
exports.linkAdd = (req, res) ->
  Links = mongoose.model 'links'

  newLink = new Links
    url: req.body.url
    title: req.body.title
    description: req.body.description
  

  newLink.save (err) ->
    if err
      res.jsonp err
    else
      res.jsonp 'success'