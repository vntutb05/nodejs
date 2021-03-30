const express=require("express");
const Router=express.Router();
const indexControlller=require("../../controller/indexController");

Router.route("/").get(indexControlller.getIndex);
Router.route("/login").get(indexControlller.login).post(indexControlller.postLogin);
Router.route("/logout").get(indexControlller.logout);

module.exports=Router;