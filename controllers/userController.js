const db = require("../models");
const searchController = require("./searchController");
const key = "K42zVU0lUrmshTfDzUCl8bcrngrop1o8UWzjsnktewrpLF8fUH"; //needs to be changed to a production key before deployment
const unirest = require("unirest");

module.exports = {
  getUsersFavRecipes: function(req, res){
    db.User.findOne({"username": req.user.username}).populate("favoriteRecipes").exec(function(err, result){
      if(err){
        res.send(err);
      }
      res.json(result);
    });
  },

  addFavRecipe: function(req, res){
    db.Recipe.findOne({"spoonacularID": req.body.id}, function(err, results){//check to see if that recipe is in the database
      let documentID;
      if(results !== null){ //IF theres an error God help us all
        documentID = results._id;
      }
      else if(results === null){ //If the recipe is not in the database we need to add it
        let id = req.body.id + "";
        unirest.get(`https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/${id}/information?includeNutrition=true`)
        .header("X-Mashape-Key", key)
        .header("Accept", "application/json")
        .end(function (result) {
          if(result.statusCode === 200){
            db.Recipe.create(searchController.makeRecipe(result.body), function(err, result){
              documentID = result._id;
            });
          }
        });
      }
      db.User.findOneAndUpdate({"username":req.user.username}, {$push: {favoriteRecipes: documentID}}, function(err, result){ //Push the recipe into user and return user doc
        res.json(result);
      });
    });
  },

  removeFavRecipe: function(req, res){
    db.Recipe.findOne({"spoonacularID": req.body.id}, function(err, results){
      db.User.update({"username": req.user.username}, {"$pull": {"favoriteRecipes": results._id}}, function(err, result){
        res.json(result);
      });
    });
  },

  addIngredients: function(req, res){
    let ingredients = req.body.ingredients;
  }
}
