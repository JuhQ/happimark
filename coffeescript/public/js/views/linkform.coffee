define [
  'jquery'
  'underscore'
  'backbone'
  'models/user'
  'text!templates/linkform.html'
  ], (
  $
  _
  Backbone
  UserModel
  Template
  ) ->
  Backbone.View.extend
    el: '.linkform'
    events:
      'submit form': 'saveLink'
    initialize: ->
      @$el.html _.template Template
    saveLink: (event) ->
      event.preventDefault()
      @$('form input').val('')