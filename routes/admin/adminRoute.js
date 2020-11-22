const express=require("express");
const router=express.Router();
const adminController=require("../../controller/adminController");
const middleware=require("../../auth/sessionUser");
router.route("/").get(middleware.isLogin,adminController.index);

// login
router.route("/login").get(middleware.isCheck,adminController.login).post(adminController.postLogin);
router.route("/logout").get(adminController.logout);
//regiter
router.route("/resgiter").get(middleware.isCheck,adminController.resgiter).post(adminController.postResgiter);
router.route("/profile").get(middleware.isLogin,adminController.profile);
router.route("/settingUser").get(middleware.isLogin,adminController.setting).post(adminController.postSetting);
router.route("/changePassword").get(middleware.isLogin,adminController.changePass).post(adminController.postChangePass);

module.exports=router;