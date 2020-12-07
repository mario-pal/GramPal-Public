const mongoose = require("mongoose");
require("dotenv-safe").config(); //for dev

mongoose.connect(
  process.env.MONGO_URL || "mongodb://localhost:27017/grampaldb",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true, //to remove deprecation warning
    useCreateIndex: true, //to remove deprecation warning
  }
); //added for heroku deployment
mongoose.Promise = global.Promise; //needed for using promises to handle errors (and to use promise chains)

const express = require("express"),
  app = express(),
  router = require("./routes/index"),
  httpStatus = require("http-status-codes"),
  methodOverride = require("method-override"),
  expressSession = require("express-session"), //sessions contain data about the most recent interaction between a user and an application
  cookieParser = require("cookie-parser"),
  connectFlash = require("connect-flash"), //this package is dependent on sessions and cookies to pass flash messages between requests
  //user data entry validation
  expressValidator = require("express-validator"),
  passport = require("passport");
const cloudinary = require("cloudinary").v2;

app.set("port", process.env.PORT || 3000);
app.set("proxy", 1); //for production environments nginx proxy on dokku
const server = app.listen(app.get("port"), () => {
  console.log(`Server running at http://localhost:${app.get("port")}`);
}); //listening placed here for heroku development

app.use(
  express.urlencoded({
    extended: false,
  })
);

app.use(express.json());

app.use(expressValidator());

app.use(cookieParser(process.env.COOKIE_PARSER));

app.use(
  expressSession({
    //youre telling express-sessions that you wasnt it to use cookies as its storage method
    //espressSessions is necessary to pass messages between the application and the client. You can store masages in a user's browser in many ways including cookies
    secret: process.env.COOKIE_PARSER, //this secret key should be stored in an environment variable...this will be changed in unit 8 (same with the cookieParser)
    cookie: {
      //cookies are a form of session storage
      maxAge: 4000000, //expire cookies after about an hour
    },
    resave: false, //specifies that you dont want to update existing session data on the server if nothing has changed in the existibng session
    saveUninitialized: false, //specifiess that you dont want to send a cookie to a user if no messages are added to the session
  })
);

app.use(connectFlash());

app.use(passport.initialize()); //this line is where passport officially becomes middleware
app.use(passport.session());

const User = require("./models/User");
passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
  //make sure to initialize passport and all its configurations before defining this middleware since you use passport.js methods
  //purpose of this custom middleware is to gain access to variables in the clientside views
  //this middleware configuration treats connectFlash messages like a local variable on the response
  res.locals.flashMessages = req.flash(); //a flash message is no different from a local variable being available to the view.
  res.locals.loggedIn = req.isAuthenticated(); //isAuthenticated is a method provided by Passport.js...
  //...(checks whether there is an exxisting user stored in the request cookies)
  res.locals.currentUser = req.user; //req.user is set to the authenticated user after log in via passport.authenticate in the usersController
  next(); //to show potential success and error flash messages I add the code to display those messages in layout.ejs
});
//end of session management?

app.use(
  /*configure the application router to use methodOverride as middleware.
  Express.js receives the HTML form submissions as POST since the method attribute in the form tag,
  is set to POST in edit.ejs. We could have simply set the method ="PUT" however support,
  from browsers for PUT (and DELETE) is rare source: HTML&CSS the complete reference Thomas A. Powell
  Method override is simply one solution out of many to address this limitation.
  */

  methodOverride("_method", {
    //look for the _method query parameter in the url and interpret
    methods: ["POST", "GET"], //the request by using the method specified by the paramter
  })
);

//set up cloudinary credentials here for server side image delete requests
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

//================================ROUTES==========================
app.use("/", router);

/*
you must inverse the order of your router
app.use('/', router);
app.use(express.static(__dirname + '/public'));
means your router will be called first and, if no middleware handles the
request, then express will call static files so, if you put the static 
middleware first, the express will handle static files first.

It is also recommended to put static middleware first. However, I dont in this project.
https://stackoverflow.com/questions/28143419/express-static-keeps-routing-my-files-from-the-route
*/
app.use(express.static("public"));

//===============================ERROR HANDLING=====================
app.use((req, res) => {
  let errorCode = httpStatus.NOT_FOUND;
  res.status(errorCode);
  //res.render("error");
  res.send(`${errorCode} | Page NOT FOUND! :( `);
});

app.use((error, req, res, next) => {
  let errorCode = httpStatus.INTERNAL_SERVER_ERROR;
  console.log(`ERROR occurred: ${error.stack}`);
  res.status(errorCode);
  res.send(`${errorCode} | Something went wrong :( `);
});
