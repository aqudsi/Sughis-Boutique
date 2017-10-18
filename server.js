const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const APIroutes = require("./routes/index.js");

const app = express();
const PORT = process.env.PORT || 3000;

const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
app.use(require("express-session")({
  secret: "Shhhhh its a secret",
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session())
const Account = require('./models/account');
passport.use(new LocalStrategy(Account.authenticate()));
passport.serializeUser(Account.serializeUser());
passport.deserializeUser(Account.deserializeUser());


// Configure body parser for AJAX requests
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));
// Serve up static assets
app.use(express.static("public"));
// Add routes, both API and HTML
app.use(APIroutes);
require("./routes/html-routes/html-routes.js")(app)


// Set up promises with mongoose
mongoose.Promise = global.Promise;
// Connect to the Mongo DB
mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost/boutique_db",
  {
    useMongoClient: true
  }
);

// Start the API server
app.listen(PORT, function() {
  console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
});
