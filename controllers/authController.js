var passport = require('passport');
var Account = require('../models/account');
var User = require('../models/user');

module.exports = {
  register: function(req, res){
    // req.body.username = req.params.username; //USE REQ.BODY AND NOT REQ.PARAMS CUS REGISTER LOOKS AT REQ.BODY
    // req.body.password = req.params.password;
    console.log(req.body);
    Account.register(new Account({ username : req.body.username }), req.body.password, function(err, account) {
      if (err) {
        console.log("OH GOD AN ERROR");
        console.log(err);
      }
      passport.authenticate('local')(req, res, function () {
        console.log("If cuking worked");
        let newUser = new User({username: req.body.username, favoriteRecipes: [], ingredients: []});
        newUser.save(function(err){
          if(err){
            console.log("Error adding new user to DB");
            console.log(err);
          }
        });
        res.json({username: newUser.username, favoriteRecipes: [], ingredients: []});
      });
    });
  },

  authCheck: function(req, res){
    res.json({
      auth: req.isAuthenticated(),
      user: req.user
    });
  },


  authLogin: function(req, res){
    // req.body.username = req.params.username;
    // req.body.password = req.params.password;
    passport.authenticate('local', function(err, user, info) {
      if (err) { return res.json(err); }
      if (!user) { return res.json({message: "Invalid username or password"}); }
      req.logIn(user, function(err) {
        if (err) { return res.json(err); }
        User.findOne({"username": req.user.username}).populate("favoriteRecipes").exec(function(err, results){
          if(err){
            return res.json({message: "Error retrieving user during log in"});
          }
          return res.json({username: results.username, ingredients: results.ingredients, favoriteRecipes: results.favoriteRecipes});
        });
      });
    })(req, res);
  },

  authLogout: function(req, res){
    req.logout();
    res.json({message: "logout"});
  }

}
