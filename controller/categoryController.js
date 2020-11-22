const cateModel=require("../models/cateModels");
const cateAuth=require("../auth/categoryAuth");
const {session}=require("../config/autoLoad");
const {checkText}=require("../config/regex");

module.exports={
    index:function(req,res,next){
        let userLogin=session(req).user;
        cateModel.find(function(err,result){
            if(err){
                res.status(500).json(err);
            }else{
                res.render("admin/category/index",{data:result,user:userLogin});
            }
        })
    },
    getAdd:function(req,res,next){
        let userLogin=session(req).user;
        res.render("admin/category/add",{user:userLogin});
    },
    postAdd:function(req,res,next){
        let params=req.body;
        let name =checkText(params.nameCate);
        let descriptCate=checkText(params.descriptCate);
        if(name.length==0 || descriptCate.length==0){
            cateAuth.add(req);
            return res.redirect("/admin/cate/add");
        }
    
        let data={
            name:name,
            description:descriptCate,
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
                res.redirect("/admin/cate/");
            }
        })
    
    },
    getEdit:function(req,res,next){
        let userLogin=session(req).user;
        const id=req.params.id;
        cateModel.findById({_id:id},function(err,result){
            if(err){
                res.status(500).json(err);
            }else{
                res.render("admin/category/edit",{data:result,user:userLogin});
            }
        })
    },
    postEdit:function(req,res,next){
        let params=req.body;
        let name =checkText(params.nameCate);
        let descriptCate=checkText(params.descriptCate);
        if(name.length==0 || descriptCate.length==0){
            cateAuth.add(req);
            return res.redirect("/admin/cate/edit/"+req.params.id);
        }
       
        const id=req.params.id;
        let data={
            name:name,
            description:descriptCate,
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
        
    },
    delete:function(req,res,next){
        const id=req.params.id;
        cateModel.deleteOne({_id:id},function(err,result){
            if(err){
                res.status(500).json(err);
            }else{
                res.redirect("/admin/cate/");
            }
        })
    }
}