define [
  'jquery'
  'underscore'
  'backbone'
  'models/user'
  'text!templates/profile.html'
  ], (
  $
  _
  Backbone
  UserModel
  Template
  ) ->
  Backbone.View.extend
    el: '.container'
    initialize: ->
      model = new UserModel {id: @id}
      model.fetch
        success: =>
          @$el.html _.template Template, {id: @id, model}