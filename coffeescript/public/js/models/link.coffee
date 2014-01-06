define [
  'backbone'
], (
  Backbone
) ->
  Backbone.Model.extend
    url: ->
      "/api/link/#{@id}"
    idAttribute: '_id'