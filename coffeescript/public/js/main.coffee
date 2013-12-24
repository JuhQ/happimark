requirejs.config
  baseUrl: '/js'
  enforceDefine: true
  paths:
    #jquery: ['http://ajax.googleapis.com/ajax/libs/jquery/2.0.3/jquery.min', 'libs/jquery']
    jquery: 'libs/jquery' # Better offline support for development purposes
    #jsapi: 'http://www.google.com/jsapi?callback=define'
    backbone: 'libs/backbone'
    underscore: 'libs/lodash.min'
    text: 'libs/text'

define [
  'jquery'
  'underscore'
  'backbone'
  'libs/fastclick'
  'router/router'
  ], (
  $
  _
  Backbone
  Fastclick
  Router
  ) ->

  router = new Router()

  Backbone.history.start
    #pushState: true
    replace: true

  new FastClick(document.body)
