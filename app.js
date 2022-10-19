var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const  bcrypt = require('bcryptjs');
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var signUpRouter = require('./routes/sign-up');
var logInRouter = require('./routes/log-in');

//model import
const Message = require("./models/message");
const User = require('./models/user');

var app = express();

//set up mongodb connection with mongoose
const mongoose = require("mongoose");
const mongoDB = 'mongodb+srv://kurniadikevin:pisausl@cluster0.befoclp.mongodb.net/?retryWrites=true&w=majority'
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/sign-up',signUpRouter);
app.use('/log-in',logInRouter);



 //PASSPORT FUNCTION 
//Function one : setting up the LocalStrategy from passport for session login
passport.use(
  new LocalStrategy((username, password, done) => {
    User.findOne({ username: username }, (err, user) => {
      bcrypt.compare(password, user.password, (err, res) => {
        if (res) {
          // passwords match! log user in
          return done(null, user)
        }
         else {
          // passwords do not match!
          return done(null, false, { message: "Incorrect password" })
        }
      })
    });
  })
);
//Functions two and three: Sessions and serialization
passport.serializeUser(function(user, done) {
  done(null, user.id);
});
passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});

app.use(session({ secret: "cats", resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.urlencoded({ extended: false }));

/// 



// sign up post new user and hashing password then redirect to index
app.post("/sign-up", (req, res, next) => {
 
  bcrypt.hash(req.body.password, 10, (err, hashedPassword) => {
    // if err, do something
    if(err){
      return next('password failed to proceed');
    }
    // otherwise, store hashedPassword in DB
    const user = new User({
      first_name : req.body.firstname,
      last_name : req.body.lastname,
      username: req.body.username,
      password: hashedPassword,
      membership_status : 'new user'
    })
    .save(err => {
      if (err) { 
        return next(err);
      }
      res.redirect("/");
    });
  });
});

// login page post function
app.post(
  "/log-in",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/sign-up"
  })
);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;


// user log in but can't fetch the user info