const product=require("../models/postModels");
const cateModel=require("../models/cateModels");
const fs=require("fs");
const productAuth=require("../auth/productAuth");
const multer = require("multer");
const {session}=require('../config/autoLoad');


module.exports={
    index:function (req,res){
        let userLogin=session(req).user;
        product.find(function (err,result){
            if(err){
                res.status(500).json(err);
            }else{
                cateModel.find(function(err,cate){
                    res.render("admin/product/index",{data:result,cate:cate,user:userLogin});
                })
               
            }
        })
    },
    getAdd:function(req,res){
        let userLogin=session(req).user;
        cateModel.find(function(err,result){
            if(err){
                res.status(500).json(err);
            }else{
                res.render("admin/product/add",{data:result,user:userLogin});
            }
        })
    }
    ,postAdd:function(req,res,next){
        let params=req.body;
        if(!params.name || !params.price || !params.decript){
             productAuth.add(req);
             return res.redirect("/admin/product/add");
        }
            var datas={
                name:params.name,
                category:params.category,
                price:params.price,
                decription:params.decript,
               
                creationDate:new Date(),
            }
            if(req.file){
                var img = fs.readFileSync("./public/uploads/product" + req.file.filename);
                var encode_image = img.toString('base64');
                datas.image={
                    data:Buffer.from(encode_image, 'utf-8')
                };
            }
            product.create(datas,function (err,result){
                if(err){
                    res.status(500).json(err);
                }else{
                    productAuth.successAdd(req);
                    res.redirect('/admin/product/');
                }
            })
        
    }, 
     getEdit:function (req,res,next){
         const id=req.params.id;
         let userLogin=session(req).user;
        product.findById({_id:req.params.id},function(err,result){
            if(err){
                res.status(500).json(err);
            }else{
                cateModel.find(function(err,cate){
                    res.render("admin/product/edit",{data:result,cate:cate,user:userLogin});
                })
            }
        })
    },
    // update
    postEdit:async function(req,res,next){
        let params=req.body;
        var data={
            name:params.name,
            category:params.category,
            price:params.price,
            decription:params.decript
        }
        if(req.file){ 
            var img = fs.readFileSync("./public/uploads/" + req.file.filename);
            var encode_image = img.toString('base64');
            data.image={
                data:Buffer.from(encode_image, 'utf8')
            };
        }
        product.updateOne({_id:req.params.id}, {$set:data},function(err,result){
            if(err){
                res.status(500).json(err);
            }else{
                res.redirect('/admin/product/');
            }
        })
    },
    //delete
    delete:function(req,res){
        product.remove({_id:req.params.id},function(err,result){
            if(err){
                res.status(500).json(err);
            }else{
                res.redirect("/admin/product/");
            }
        })
    }
}