const router = require("express").Router();
const searchController = require("../../controllers/searchController");

router.route("/").get(searchController.randomRecipes);
router.route("/ingredientSearch").post(searchController.getRecipesByIngredients);
router.route("/:id").get(searchController.getRecipeById);

module.exports = router;
