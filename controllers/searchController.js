const unirest = require("unirest");
const key = "K42zVU0lUrmshTfDzUCl8bcrngrop1o8UWzjsnktewrpLF8fUH"; //needs to be changed to a production key before deployment
const db = require("../models");
const numRecipes = "6";

function makeSingleRecipe(response){ //Does not check to see if recipe already exists
  let ingredients = [];
  let instructions = [];
  let nutrition = [];

  for(ingredient of response.extendedIngredients){
    ingredients.push({
      name: ingredient.name,
      qty: ingredient.amount,
      unit: ingredient.unitShort
    });
  }

  for(step of response.analyzedInstructions[0].steps){
    instructions.push({
      number: step.number,
      step: step.step
    });
  }

  for(nutrient of response.nutrition.nutrients){
    nutrition.push(nutrient);
  }

  let tastyRecipe = {
    title: response.title,
    spoonacularID: response.id,
    servings: response.servings,
    image: response.image,
    spoonacularURL: response.spoonacularSourceUrl,
    instructions: instructions,
    sourceURL: response.sourceURL,
    ingredients: ingredients,
    nutrition: nutrition
  }
  return tastyRecipe;
}

module.exports = {
  //Hits /api/search/
  randomRecipes: function(req, res){
    // makeRecipe(savedRecipe);
    //db.Recipe.find({}).then(recipe => res.json(recipe));
    unirest.get(`https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/random?limitLicense=false&number=${numRecipes}`)
    .header("X-Mashape-Key", key)
    .header("Accept", "application/json")
    .end(function (result) {
      res.json(result.body);
    });
  },

  getRecipesByIngredients: function(req, res){
    let list = encodeURIComponent(req.body.ingredients.toString());
    unirest.get(`https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/findByIngredients?fillIngredients=false&ingredients=${list}&limitLicense=false&number=${numRecipes}&ranking=1`)
    .header("X-Mashape-Key", key)
    .header("Accept", "application/json")
    .end(function (result) {
      // console.log(result.status, result.headers, result.body);
      res.json(result.body)
    });
  },

  getRecipeById: function(req, res){
    db.Recipe.findOne({'spoonacularID': req.params.id}, function(err, result){
      if(result){
        res.send(result);
      }
      else{
        let id = req.params.id + "";
        unirest.get(`https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/${id}/information?includeNutrition=true`)
        .header("X-Mashape-Key", key)
        .header("Accept", "application/json")
        .end(function (result) {
          if(result.statusCode === 200){
            db.Recipe.create(makeSingleRecipe(result.body), function(err, result){
              res.json(result);
            });
          }
        });
      }
    });
  },

  makeRecipe: makeSingleRecipe
}
