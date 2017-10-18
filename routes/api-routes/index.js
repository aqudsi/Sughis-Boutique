const router = require("express").Router();
const searchRoutes = require("./search");
const authRoutes = require("./auth");
const userRoutes = require("./user");

router.use("/search", searchRoutes);
router.use("/auth", authRoutes);
router.use("/user", userRoutes);

module.exports = router;
