define [
  'jquery'
  'underscore'
  'backbone'
  'collections/links'
  'text!templates/linkitem.html'
  ], (
  $
  _
  Backbone
  LinkCollection
  Template
  ) ->
  Backbone.View.extend
    el: '.link-list'
    events:
      'click .remove': 'removeLink'
    initialize: ->
      @links = new LinkCollection()
      @links
        .fetch()
        .done =>
          @links.each (model) =>
            console.log(model)
            @$el.append _.template Template, {model}

    removeLink: (event) ->
      event.preventDefault()
      element = $(event.currentTarget)
      id = element.data('id')
      @links.get(id).destroy
        success: ->
          element.parents('.media').remove()
