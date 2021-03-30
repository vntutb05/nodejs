const settingAuth=require("../auth/settingAuth");
const settingModel=require("../models/settingModel");
const {session}=require('../config/autoLoad');
const   userAuth=require("../auth/userAuth");
const fs =require('fs');
module.exports={
    getSetting:(req,res)=>{
        let userLogin=session(req).user;
        if(userLogin.isAdmin!=0){
            userAuth.lessPower(req);
            return res.redirect("/admin/");
        }
        settingModel.find(function(error,result){
            if(error){
                return res.status(500).json(error);
            }
            var data=result[0];
            return res.render("admin/setting",{data:data,user:userLogin}); 
        })
        
    },
    postSetting:(req,res)=>{
        let id="60439f2fb6ece80ba03b2fcc";
        let params=req.body;
        if(!params.nameWeb ||!params.address1 || !params.phone1){
            settingAuth.settingAuth;
            return res.redirect("/admin/setting");
        }
        let data={
            nameWeb:params.nameWeb,
            contact:{
                basis1:{
                    Address:params.address1,
                    Phone:params.phone1
                },
                basis2:{
                    Address:params.address2,
                    Phone:params.phone2
                }
            },
            linkSocial:{
                facebook:params.facebook,
                instagram:params.instagram,
                youtube:params.youtube,
                twiter:params.twiter
            }
        }
        if(req.file){
            var img = fs.readFileSync("./public/uploads/default/" + req.file.filename);
            var encode_image = img.toString('base64');
            data.logo={
                data:Buffer.from(encode_image, 'utf8')
            };
        }
        console.log(data);
        settingModel.updateOne({_id:id},{$set:data},function(error,data){
            if(error){
                return res.status(500).json(error);
            }
            return res.redirect("/admin/setting");
        })

    }
}