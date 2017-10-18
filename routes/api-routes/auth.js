const router = require("express").Router();
const authController = require("../../controllers/authController");

router
  .route("/register")
  .post(authController.register);

router
  .route("/yesorno")
  .get(authController.authCheck);

router
  .route("/login")
  .post(authController.authLogin);

router
  .route("/logout")
  .get(authController.authLogout);

module.exports = router;
