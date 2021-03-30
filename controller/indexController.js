const bcrypt = require('bcrypt');
const productModel=require("../models/postModels");
const userModel = require('../models/userModels');

module.exports={
    getIndex:(req,res)=>{
        productModel.find(function(error,data){
            if(error){
                return res.status(500).json(err);
            }
            let userLogin=session(req).user;
            if(userLogin == null){
                return  res.render("web/index",{data:data,user:null});
            }
            return res.render("web/index",{data:data,user:userLogin});
        })
    },
    login:(req,res)=>{
        res.render('web/login',{user:null});
    },
    postLogin:(req,res)=>{
        let param=req.body;
        let email = param.email;
        let password = param.password;
        if(!email || !password){
            return res.redirect('/login')
        }
        userModel.find({email:email},function(err,result){
            if(err){
                return res.status(500).json(err);
            }
            if(result.length == 0){
                console.log("Tài khoản không tồn tại");
                return res.redirect('/login');
            }
            if(bcrypt.compareSync(password,result[0].password)){
                if(result[0].isAdmin == 0 || result[0].isAdmin == 1){
                    req.session.user=result[0];
                    return res.redirect('/admin/') ;
                }
                req.session.user=result[0];
                return res.redirect('/');
            }
        })
    },
    logout:(req,res)=>{
        req.session.destroy();
        res.redirect("/");
    }
}