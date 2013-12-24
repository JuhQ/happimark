define [
  'jquery'
  'underscore'
  'backbone'
  'views/linkform'
  'text!templates/index.html'
  ], (
  $
  _
  Backbone
  LinkForm
  Template
  ) ->
  Backbone.View.extend
    el: '.container'
    initialize: ->
      @$el.html _.template Template
      new LinkForm()