const mongoose=require("mongoose");
const Scheme=mongoose.Schema;
 var settingScheme=new Scheme({
        nameWeb:{
            type:String,
            required:true
        },
        contact:{
            basis1:{
                Address:String,
                Phone:Number
            },basis2:{
                Address:String,
                Phone:Number
            }
        },
        linkSocial:{
            facebook:String,
            instagram:String,
            youtube:String,
            twiter:String
        },
        logo:{
            data:Buffer,
        }
 })
 let settingModel=mongoose.model('setting',settingScheme);
 module.exports=settingModel;