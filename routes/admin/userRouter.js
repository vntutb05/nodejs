const express=require('express');
const router=express.Router();
const userController=require("../../controller/userController");
const middleware=require("../../auth/sessionUser");
router.route("/").get(middleware.isLogin,userController.index);
router.route("/add").get(middleware.isLogin,userController.getAdd).post(userController.postAdd);
router.route("/edit/:id").get(middleware.isLogin,userController.getEdit).post(userController.postEdit);
router.route("/delete/:id").get(middleware.isLogin,userController.delete);


module.exports=router;