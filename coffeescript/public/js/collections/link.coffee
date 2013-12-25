define [
  'backbone'
  'models/link'
  ], (
  Backbone
  LinkModel
  ) ->
  Backbone.Collection.extend
    model: LinkModel
    url: '/api/link'

    parse: (resp) ->
      return resp