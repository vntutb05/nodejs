const express=require("express");
const Router=express.Router();
const categoryController=require("../controller/categoryController");
const middleware=require("../auth/sessionUser");

Router.route("/").get(middleware.isLogin,categoryController.index);
Router.route("/add").get(middleware.isLogin,categoryController.getAdd).post(categoryController.postAdd);
Router.route("/edit/:id").get(middleware.isLogin,categoryController.getEdit).post(categoryController.postEdit);
Router.route("/delete/:id").get(middleware.isLogin,categoryController.delete);


module.exports=Router;