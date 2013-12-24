define [
  'backbone'
  ], (
  Backbone
  ) ->
  Backbone.Collection.extend
    url: '/api/collection'
