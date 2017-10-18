const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {type: String, required: true},
  favoriteRecipes: [{type: Schema.Types.ObjectId, ref: "Recipe"}],
  ingredients: [{
    name: String,
    qty: Number
  }]
});

const User = mongoose.model("User", userSchema);

module.exports = User;
