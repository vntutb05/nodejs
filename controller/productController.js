const product=require("../models/postModels");
const cateModel=require("../models/cateModels");
const fs=require("fs");
const path=require("path");
const productAuth=require("../auth/productAuth");


module.exports={
    index:function (req,res){
        product.find(function (err,result){
            if(err){
                res.status(500).json(err);
            }else{
                cateModel.find(function(err,cate){
                    res.render("admin/product/index",{data:result,cate:cate});
                })
               
            }
        })
    },
    getAdd:function(req,res){
        cateModel.find(function(err,result){
            if(err){
                res.status(500).json(err);
            }else{
                res.render("admin/product/add",{data:result});
            }
        })
    }
    ,postAdd:function(req,res,next){
        if(!req.body.name || !req.body.price || !req.body.decript){
            productAuth.add(req);
        }else{
            var img = fs.readFileSync("./public/uploads/" + req.file.filename);
            var encode_image = img.toString('base64');
            var datas={
                name:req.body.name,
                category:req.body.category,
                price:req.body.price,
                decription:req.body.decript,
                image:{
                    data:Buffer.from(encode_image, 'utf-8'),
                },
                creationDate:new Date(),
            }
            product.create(datas,function (err,result){
                if(err){
                    res.status(500).json(err);
                }else{
                    productAuth.successAdd(req);
                    res.redirect('/admin/product/');
                }
            })
        }
    }, 
     getEdit:function (req,res,next){
         const id=req.params.id;
        product.findById({_id:req.params.id},function(err,result){
            if(err){
                res.status(500).json(err);
            }else{
                cateModel.find(function(err,cate){
                    res.render("admin/product/edit",{data:result,cate:cate});
                })
            }
        })
    },
    // update
    postEdit:function(req,res){
        if(req.file.filename){

        }
        var data={
            name:req.body.name,
            category:req.body.category,
            price:req.body.price,
            decription:req.body.decript
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