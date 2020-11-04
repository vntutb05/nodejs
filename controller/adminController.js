// const postModel=require("../models/postModels");
const userModel=require("../models/userModels");
const adminAuth=require("../auth/adminAuth");
const bcrypt=require('bcrypt');
const session=require("express-session");

module.exports={
    index: (req,res,next) => {
        res.render("admin/index");
        next();
    },
    login:(req,res,next)=>{
        res.render("admin/login");
    },
    postLogin:(req,res,next)=>{
        if(!req.body.email || !req.body.password){
            adminAuth.login(req);
            res.redirect("/admin/login");
        }
       else{
            var email=req.body.email;
            var password=req.body.password;
            userModel.find({email:email},function(err,result){
                if(err){
                    res.status(500).json(err);
                }else if(result.length==0){
                    req.flash("error","Tài khoản không tồn tại");
                    res.redirect("/admin/login");
                }
                else{
                    if(bcrypt.compareSync(password,result[0].password) ){
                        req.flash('success',"Đăng nhập thành công");
                        req.session.user=result[0];
                        res.redirect("/admin/");
                    }else{
                        req.flash("error","Mật khẩu không chính xác");
                        res.redirect("/admin/login");
                    }
                }
            })
         }
    },logout:(req,res)=>{
        req.session.destroy();
        res.redirect("/admin/login");
    }
    ,
    resgiter:(req,res,next)=>{
        res.render("admin/resgiter");
    },
    postResgiter:(req,res,next)=>{
        if(!req.body.name||!req.body.email || !req.body.address || !req.body.phone || !req.body.password || !req.body.repassword){
            adminAuth.register(req);
            res.redirect("/admin/resgiter");
        }else if(req.body.password!=req.body.repassword){
            req.flash("error","Mật khẩu không khớp");
            res.redirect("/admin/resgiter");
        }else{
            var data={
                name:req.body.name,
                email:req.body.email,
                phone:req.body.phone,
                address:req.body.address,
                isAdmin:0,
                password:req.body.password
            }
            userModel.find({email:req.body.email},function(err,result){
                if(result.length>0){
                    req.flash("error","Tài khoản đã tồn tại,bạn có thể đến với đăng nhập");
                    res.redirect("/admin/resgiter");
                }else if(result.length==0){
                    userModel.create(data,function(err1,resultCre){
                        if(err){
                            res.status(500).json(err1);
                        }else{
                            req.flash('seccess',"Đăng kí thành công");
                            res.redirect("/admin/login");
                        }
                    })
                }
            });
        }
    }
}