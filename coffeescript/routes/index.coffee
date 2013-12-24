exports.index = (req, res) ->
  res.render 'index',
    loggedin: req.user

exports.logout = (req, res) ->
  req.logout()
  res.redirect('/')

exports.loginSuccess = (req, res) ->
  res.redirect('/')

exports.loginFail = (req, res) ->
  res.send('Epic login fail :(')
