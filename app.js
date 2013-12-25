(function() {
  var FacebookStrategy, MongoStore, api, app, cluster, express, facebookOptions, http, i, mongoStore, mongoconfig, mongoose, numCPUs, passport, path, routes, server, settings;

  express = require('express');

  http = require('http');

  path = require('path');

  routes = require('./routes');

  api = require('./routes/api');

  mongoose = require('mongoose');

  passport = require('passport');

  FacebookStrategy = require('passport-facebook').Strategy;

  MongoStore = require('connect-mongo')(express);

  cluster = require('cluster');

  numCPUs = require('os').cpus().length;

  settings = require('./configuration.json');

  mongoconfig = require('./mongoconfig')(settings);

  app = express();

  server = http.createServer(app);

  mongoStore = new MongoStore({
    db: settings.db
  });

  app.configure(function() {
    app.set('port', process.env.PORT || settings.port);
    app.set('views', "" + __dirname + "/views");
    app.set('view engine', 'ejs');
    app.use(express.urlencoded());
    app.use(express.json());
    app.use(express.favicon('public/favicon.ico'));
    app.use(express.methodOverride());
    app.use(express.cookieParser(settings.cookie));
    app.use(express.session({
      secret: settings.cookie,
      cookie: {
        maxAge: 60000 * 60 * 24 * 30 * 12
      },
      store: mongoStore
    }));
    app.use(passport.initialize());
    app.use(passport.session());
    app.use(express["static"](path.join(__dirname, 'public')));
    return app.use(app.router);
  });

  app.get('/', routes.index);

  app.get('/api', api.index);

  app.get('/api/user/:id', api.user);

  app.get('/api/link', api.linkList);

  app.post('/api/link', api.linkAdd);

  app.get("/logout", routes.logout);

  app.get("/login/success", routes.loginSuccess);

  app.get("/login/fail", routes.loginFail);

  app.get("/auth/facebook", passport.authenticate("facebook", {
    scope: ['email', 'user_birthday']
  }));

  app.get("/auth/facebook/callback", passport.authenticate("facebook", {
    successRedirect: "/login/success",
    failureRedirect: "/login/fail"
  }));

  passport.serializeUser(function(user, done) {
    return done(null, user.id);
  });

  passport.deserializeUser(function(id, done) {
    var Users;
    Users = mongoose.model('users');
    return Users.findOne({
      id: id
    }).exec(function(err, user) {
      if (err) {
        return done(err);
      } else {
        return done(null, user.id);
      }
    });
  });

  facebookOptions = settings.facebook.options[settings.facebook.api];

  passport.use(new FacebookStrategy(facebookOptions, function(accessToken, refreshToken, profile, done) {
    var Locations, Users;
    Users = mongoose.model('users');
    Locations = mongoose.model('locations');
    return Users.findOne({
      id: profile.id
    }).exec(function(err, data) {
      var location, user, _ref, _ref1, _ref2, _ref3;
      if (err) {
        return done(err);
      } else if (data) {
        return done(null, data);
      } else {
        location = {
          name: (_ref = profile._json.location) != null ? _ref.name : void 0,
          id: Number((_ref1 = profile._json.location) != null ? _ref1.id : void 0)
        };
        Locations.findOne({
          id: location.id
        }).exec(function(err, data) {
          var locations;
          if (!data) {
            locations = new Locations(location);
            return locations.save(function() {});
          }
        });
        user = new Users({
          id: profile.id,
          name: profile.displayName,
          username: profile.username,
          url: profile.profileUrl,
          gender: profile.gender,
          location: location.name,
          education: (_ref2 = profile._json.education) != null ? _ref2[0].school.name : void 0,
          quotes: profile._json.quotes,
          bio: profile._json.bio,
          occupation: (_ref3 = profile._json.work) != null ? _ref3[0].position.name : void 0,
          email: profile._json.email,
          birthday: profile._json.birthday
        });
        return user.save(function(err) {
          if (err) {
            return done(err);
          } else {
            return done(null, user);
          }
        });
      }
    });
  }));

  if (cluster.isMaster) {
    i = 0;
    while (i < numCPUs) {
      cluster.fork();
      i++;
    }
    cluster.on('exit', function(worker, code, signal) {
      console.log("worker " + worker.process.pid + " died");
      return cluster.fork();
    });
  } else {
    server.listen(app.get('port'), function() {
      return console.log('Express server listening on port ' + app.get('port'));
    });
  }

}).call(this);
