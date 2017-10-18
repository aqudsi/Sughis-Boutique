const router = require("express").Router();
const userController = require("../../controllers/userController");

router.route("/getFavs").get(userController.getUsersFavRecipes);
router.route("/addFav").post(userController.addFavRecipe);
router.route("/delFav").delete(userController.removeFavRecipe);
router.route("/addIngredients").post(userController.addIngredients);

module.exports = router;
