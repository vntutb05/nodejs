const userModel=require("../models/userModels");
const userAuth=require("../auth/userAuth");
const bcrypt = require('bcrypt');
const {session}=require('../config/autoLoad');
const {checkText,validateEmail}=require("../config/regex");
module.exports={
    index:function(req,res){
        let userLogin=session(req).user;
        userModel.find(function(err,result){
            if(err){
                res.status(500).json(err);
            }else{
                res.render("admin/user/",{data:result,user:userLogin});
            }
        })
    },
    getAdd:function(req,res){
        let userLogin=session(req).user;
        console.log(req.body._method);
        res.render("admin/user/add",{user:userLogin});
    },
    postAdd:function(req,res){
        let params=req.body;
        let name=checkText(params.name);
        if(validateEmail(params.email)){
            var email=params.email;
        }
        let address=checkText(params.address);
        let phone =checkText(params.phone);
        let password=checkText(params.password);

        if(name.length==0||email.length==0 || address.length==0 || phone.length==0 || password.length==0){
            userAuth.user(req);
            res.redirect("/admin/user/add");
        }else if(params.password!=params.repassword){
            userAuth.passMatch(req);
            res.redirect("/admin/user/add");
        }else{
            const hash=bcrypt.hashSync(params.password,10);
            var data={
                name:name,
                email:email,
                phone:phone,
                address:address,
                isAdmin:params.power,
                password:hash
            }
            console.log(data);
           
            userModel.find({email:params.email},function(err,result){
                if(result.length>0){
                   userAuth.userUnique(req);
                    return res.redirect("/admin/user/add");
                }else if(result.length==0){
                    userModel.create(data,function(err1,resultCre){
                        if(err1){
                            return res.status(500).json(err1);
                        }else{
                            userAuth.seccessAdd(req);
                            return res.redirect("/admin/user/");
                        }
                    })
                    
                }
            });
        }
    },
    getEdit:function(req,res){
        let userLogin=session(req).user;
        const id=req.params.id;
        userModel.findById({_id:id},function(err,result){
            if(userLogin.isAdmin >= result.isAdmin){
                userAuth.lessPower(req);
                return  res.redirect("/admin/user/");
            }
            if(err){
                return res.status(500).json(err);
            }

            return res.render("admin/user/edit",{data:result,user:userLogin});
            
        })
    },
    postEdit:function(req,res){
        let params=req.body;
        let name=checkText(params.name);
        let address=checkText(params.address);
        let phone =checkText(params.phone);

 
        if(name.length==0|| address.length==0 || phone.length==0 ){
            userAuth.edit(req);
            res.redirect(`/admin/user/edit/${req.params.id}`);
        }else if(params.password!=params.repassword){
            userAuth.passMatch(req);
            res.redirect(`/admin/user/edit/${req.params.id}`);
        }else{
            var data={
                name:params.name,
                phone:params.phone,
                address:params.address,
            }
            if(checkText(params.password)!=0){
                data.password=params.password;
            }
            userModel.updateOne({_id:req.params.id},{$set:data},function(err,result){
                if(err){
                    res.status(500).json(err);
                }else{
                    userAuth.seccessEdit(req);
                    res.redirect("/admin/user/");
                }
            })
        }
    },
    delete:function(req,res){
        let userLogin=session(req).user;
        userModel.findById({_id:req.params.id},function(err,result){
            if(userLogin.isAdmin >= result.isAdmin){
                userAuth.lessPower(req);
                return  res.redirect("/admin/user/");
            }else{
                userModel.remove({_id:req.params.id},function(err,result){
                    if(err){
                        return res.status(500).json(err);
                    }
                    return res.redirect("/admin/user/");
                    
                })
            }
        })
       
    }
}