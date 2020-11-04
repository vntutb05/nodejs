const express=require("express");
const router=express.Router();
const adminController=require("../controller/adminController");
const middleware=require("../auth/sessionUser");
router.route("/").get(middleware.isLogin,adminController.index);

// login
router.route("/login").get(adminController.login).post(adminController.postLogin);
//regiter
router.route("/resgiter").get(adminController.resgiter).post(adminController.postResgiter);

module.exports=router;