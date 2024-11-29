const express = require("express");
const router = express.Router();
const {
  login,
  userLogin,
  signup,
  createAccount,
  logout,
} = require("../controller/auth");

// router.get("/signup", signup);
// router.post("/createAccount", createAccount);

router.get("/", login);
router.get("/logout", logout);

router.post("/userlogin", userLogin);

module.exports = router;
