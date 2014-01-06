define [
  'jquery'
  'underscore'
  'backbone'
  'views/linkform'
  'views/linklist'
  'text!templates/index.html'
  ], (
  $
  _
  Backbone
  LinkForm
  LinkList
  Template
  ) ->
  Backbone.View.extend
    el: '.container'
    initialize: ->
      @$el.html _.template Template
      new LinkForm()
      new LinkList()