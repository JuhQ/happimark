define [
  'backbone'
], (
  Backbone
) ->
  Backbone.Model.extend
    url: ->
      "http://localhost:3200/api/link"