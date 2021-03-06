var express = require('express');
var http = require('http');
var path = require('path');
var flash = require('connect-flash');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var User = require('./models/user');
var Interest = require('./models/interest');
var mongoose = require('mongoose');
var config = require('./config/config');
mongoose.connect(config.db.uri);

var app = express();

app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.cookieParser());
app.use(express.session({secret: 'keyboard cat'}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'bower_components')));

app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

// authentication
passport.use(new LocalStrategy(function(username, password, done) {
  User.findOne({ username: username }, function(err, user) {
    if (err) { 
      return done(err); 
    }
    if (!user) {
      return done(null, false, { message: 'Incorrect username.' });
    }
    if (!user.validPassword(password)) {
      return done(null, false, { message: 'Incorrect password.' });
    }
    return done(null, user);
  });
}));

app.get('/', function(req, res){
  if (req.isAuthenticated()) {
    User.findById(req.user._id)
    .populate('interests')
    .exec(function(err, user){
      if (err) {
        return next(err);
      }
      res.render('dashboard', {user: user});
    });
  } else {
    res.render('index', { user: req.user });
  }
});

app.post('/signin', 
  passport.authenticate('local', { failureRedirect: '/', failureFlash: true }),
  function(req, res) {
    res.redirect('/');
  }
);

app.post('/signup', function(req, res) {
  var user = new User({username: req.body.username, password: req.body.password});
  user.save(function(err, user){
    if (err) {
      res.redirect('/');
    }
    req.logIn(user, function(err) {
      if (err) {
        return next(err);
      }
      return res.redirect('/')
    })
  });
});

app.post('/interest', function(req, res) {
  var interest = new Interest({label: req.body.label});
  interest.save(function(err, interest){
    if (err) {
      return next(err);
    }
    User.findById(req.user._id, function(err, user){
      if (err) {
        return next(err);
      }
      user.interests.push(interest);
      user.save(function(err, user){
        if (err) {
          return next(err);
        }
        res.redirect('/');
      });
    });
  });
});

// simple route middleware to ensure user is authenticated
function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/');
}

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
