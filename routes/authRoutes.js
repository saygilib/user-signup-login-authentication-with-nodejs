const { Router } = require("express");
const router = Router();
const authController = require("../controllers/authController");

router.post("/signup", 
  authController.signup__post
);

router.post("/login", 
  authController.login__post
);

module.exports = router;
 