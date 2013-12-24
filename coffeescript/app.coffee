express = require('express')
http = require('http')
path = require('path')
routes = require('./routes')
api = require('./routes/api')
mongoose = require('mongoose')
passport = require('passport')
FacebookStrategy = require('passport-facebook').Strategy
MongoStore = require('connect-mongo')(express)
cluster = require('cluster')
numCPUs = require('os').cpus().length

settings = require('./configuration.json')

mongoconfig = require('./mongoconfig')(settings)

app = express()
server = http.createServer(app)
mongoStore = new MongoStore db: settings.db

app.configure ->
  app.set 'port', process.env.PORT or settings.port
  app.set 'views', "#{__dirname}/views"
  app.set 'view engine', 'ejs'
  app.use express.bodyParser()
  app.use express.favicon('public/favicon.ico')
  app.use express.methodOverride()
  app.use express.cookieParser(settings.cookie)

  app.use express.session
    secret: settings.cookie
    cookie: {maxAge: 60000 * 60 * 24 * 30 * 12} # one year
    store: mongoStore

  app.use passport.initialize()
  app.use passport.session()

  app.use express.static(path.join(__dirname, 'public'))
  app.use app.router

app.get '/', routes.index
app.get '/api', api.index
app.get '/api/user/:id', api.user

app.get "/logout", routes.logout
app.get "/login/success", routes.loginSuccess
app.get "/login/fail", routes.loginFail


# Redirect the user to Facebook for authentication.  When complete,
# Facebook will redirect the user back to the application at
#     /auth/facebook/callback
app.get "/auth/facebook", passport.authenticate("facebook", { scope: ['email', 'user_birthday'] })


# Facebook will redirect the user to this URL after approval.  Finish the
# authentication process by attempting to obtain an access token.  If
# access was granted, the user will be logged in.  Otherwise,
# authentication has failed.
app.get "/auth/facebook/callback", passport.authenticate("facebook",
  successRedirect: "/login/success"
  failureRedirect: "/login/fail"
)


passport.serializeUser (user, done) ->
  done null, user.id

passport.deserializeUser (id, done) ->
  Users = mongoose.model 'users'
  Users.findOne({
    id
  }).exec (err, user) ->
    if err
      done err
    else
      done null, user.id


facebookOptions = settings.facebook.options[settings.facebook.api]
passport.use new FacebookStrategy facebookOptions, (accessToken, refreshToken, profile, done) ->
  Users = mongoose.model 'users'
  Locations = mongoose.model 'locations'
  Users.findOne({
    id: profile.id
  }).exec (err, data) ->
    if err
      done(err)
    else if data
      done null, data

    else
      location =
        name: profile._json.location?.name
        id: Number profile._json.location?.id

      Locations.findOne({
        id: location.id
      }).exec (err, data) ->
        if !data
          locations = new Locations(location)
          locations.save ->

      user = new Users
        id: profile.id
        name: profile.displayName
        username: profile.username
        url: profile.profileUrl
        gender: profile.gender
        location: location.name
        education: profile._json.education?[0].school.name
        quotes: profile._json.quotes
        bio: profile._json.bio
        occupation: profile._json.work?[0].position.name
        email: profile._json.email
        birthday: profile._json.birthday

      user.save (err) ->
        if err
          done(err)
        else
          done null, user



if cluster.isMaster
  
  # Fork workers.
  i = 0
  while i < numCPUs
    cluster.fork()
    i++

  # Revive dead worker
  cluster.on 'exit', (worker, code, signal) ->
    console.log "worker #{worker.process.pid} died"
    cluster.fork()
else
  server.listen app.get('port'), ->
    console.log 'Express server listening on port ' + app.get('port')