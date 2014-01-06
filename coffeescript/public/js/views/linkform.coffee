define [
  'jquery'
  'underscore'
  'backbone'
  'libs/backbone.syphon'
  'models/user'
  'models/link'
  'text!templates/linkform.html'
  'text!templates/linkitem.html'
  'text!templates/error.html'
  ], (
  $
  _
  Backbone
  Syphon
  UserModel
  LinkModel
  Template
  LinkTemplate
  ErrorTemplate
  ) ->
  Backbone.View.extend
    el: '.linkform'
    events:
      'submit form': 'saveLink'
    initialize: ->
      @$el.html _.template Template
    clearForm: ->
      @$('form input, form textarea').val('')

    showError: ->
      @$el.prepend _.template ErrorTemplate, { message: 'Something went wrong' }

    saveLink: (event) ->
      event.preventDefault()

      model = new LinkModel()
      formdata = Backbone.Syphon.serialize(event.target)
      model.save formdata,
        success: =>
          if model.get('error')
            @showError()
          else
            $('#right-col').prepend _.template LinkTemplate, {model}
            @clearForm()
        error: =>
          @showError()
          @clearForm()
