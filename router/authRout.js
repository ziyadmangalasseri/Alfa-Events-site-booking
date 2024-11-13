import express from express;
const router = express.Router();
const {
    loginPage,
} = require("../controller/AuthCtrl/authentication")

router.get("/loginPage",loginPage);