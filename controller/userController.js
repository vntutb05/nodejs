const userModel=require("../models/userModels");
const userAuth=require("../auth/userAuth");
const bcrypt = require('bcrypt');
const {session}=require('../config/autoLoad');
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
        let userLogin=session(req).user
        res.render("admin/user/add",{user:userLogin});
    },
    postAdd:function(req,res){
        let params=req.body;
        if(!params.name||!params.email || !params.address || !params.phone || !params.password){
            userAuth.user(req);
            res.redirect("/admin/user/add");
        }else if(params.password!=params.repassword){
            userAuth.passMatch(req);
            res.redirect("/admin/user/add");
        }else{
            const hash=bcrypt.hashSync(params.password,10);
            var data={
                name:params.name,
                email:params.email,
                phone:params.phone,
                address:params.address,
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
                            console.log(resultCre);
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
        if(!params.name|| !params.address || !params.phone){
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
            if(params.password !=""){
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