define [
  'views/index'
  'views/profile'
  ], (
  Index
  Profile
  ) ->
  Backbone.Router.extend
    view: null
    routes:
      '': 'index'
      'profile/:id': 'profile'

    index: ->
      @setPage Index
    profile: (id) ->
      @setPage Profile, {id}

    setPage: (Page, options) ->
      @view.undelegateEvents() if @view
      @view = new Page(options)
      return
