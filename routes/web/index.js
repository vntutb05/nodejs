const express=require("express");
const Router=express.Router();
const indexControlller=require("../../controller/indexController");

Router.route("/").get(indexControlller.getIndex);

module.exports=Router;