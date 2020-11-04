const cateModel=require("../models/cateModels");
const cateAuth=require("../auth/categoryAuth");


module.exports={
    index:function(req,res,next){
        cateModel.find(function(err,result){
            if(err){
                res.status(500).json(err);
            }else{
                res.render("admin/category/index",{data:result});
            }
        })
    },
    getAdd:function(req,res,next){
        res.render("admin/category/add");
    },
    postAdd:function(req,res,next){
        if(!req.body.nameCate || !req.body.descriptCate){
            cateAuth.add(req);
            res.redirect("/admin/cate/add");
        }else{
            var data={
                name:req.body.nameCate,
                description:req.body.descriptCate,
                datatime:{
                    createdAt:Date.now(),
                    updateAt:Date.now()
                }
            };
            cateModel.create(data,function(err,result){
                if(err){
                    res.status(500).json(err);
                }else{
                    cateAuth.seccessAdd(req);
                    Auth.isLogin(req,res,next);
                    res.redirect("/admin/cate/");
                }
            })
        }
    },
    getEdit:function(req,res,next){
        const id=req.params.id;
        cateModel.findById({_id:id},function(err,result){
            if(err){
                res.status(500).json(err);
            }else{
                res.render("admin/category/edit",{data:result});
            }
        })
    },
    postEdit:function(req,res,next){
        if(!req.body.nameCate || !req.body.descriptCate){
            cateAuth.add(req);
            res.redirect("/admin/cate/edit/"+req.params.id);
        }else{
            const id=req.params.id;
            var data={
                name:req.body.nameCate,
                description:req.body.descriptCate,
                datatime:{
                    createdAt:Date.now()
                }
            }
            cateModel.updateOne({_id:id},
                {$set:data},
                function(err,result){
                    if(err){
                        res.status(500).json(err);
                    }else{
                        cateAuth.seccessEdit(req);
                        res.redirect("/admin/cate/");
                    }
                }
            )
        }
    },
    delete:function(req,res,next){
        const id=req.params.id;
        cateModel.remove({_id:id},function(err,result){
            if(err){
                res.status(500).json(err);
            }else{
                res.redirect("/admin/cate/");
            }
        })
    }
}