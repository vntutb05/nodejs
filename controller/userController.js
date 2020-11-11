const userModel=require("../models/userModels");
const userAuth=require("../auth/userAuth");
const bcrypt = require('bcrypt');
module.exports={
    index:function(req,res){
        userModel.find(function(err,result){
            if(err){
                res.status(500).json(err);
            }else{
                res.render("admin/user/",{data:result});
            }
        })
    },
    getAdd:function(req,res){
        res.render("admin/user/add");
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
                isAdmin:0,
                password:hash
            }
            
            userModel.find({email:params.email},function(err,result){
                if(result.length>0){
                   userAuth.userUnique(req);
                    res.redirect("/admin/user/add");
                }else if(result.length==0){
                    userModel.create(data,function(err1,resultCre){
                        if(err){
                            res.status(500).json(err1);
                        }else{
                            userAuth.seccessAdd(req);
                            res.redirect("/admin/user/");
                        }
                    })
                }
            });
        }
    },
    getEdit:function(req,res){
        const id=req.params.id;
        userModel.findById({_id:id},function(err,result){
            if(err){
                res.status(500).json(err);
            }else{
                res.render("admin/user/edit",{data:result});
            }
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
        userModel.remove({_id:req.params.id},function(err,result){
            if(err){
                res.status(500).json(err);
            }else{
                res.redirect("/admin/user/");
            }
        })
    }
}