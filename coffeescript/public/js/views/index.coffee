define [
  'jquery'
  'underscore'
  'backbone'
  'collections/link'
  'views/linkform'
  'text!templates/index.html'
  'text!templates/linkitem.html'
  ], (
  $
  _
  Backbone
  LinkCollection
  LinkForm
  Template
  LinkTemplate
  ) ->
  Backbone.View.extend
    el: '.container'
    initialize: ->
      @$el.html _.template Template
      new LinkForm()

      @linkCollection = new LinkCollection()
      
      @linkCollection.fetch().done =>
        @render()

    render: ->
      @linkCollection.each (link) ->
        $('#right-col').append _.template LinkTemplate, link.attributes