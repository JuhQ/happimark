define [
  'backbone'
  ], (
  Backbone
  ) ->
  Backbone.Model.extend
    url: ->
      "/api/user/#{@id}"
