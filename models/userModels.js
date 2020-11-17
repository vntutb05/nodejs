const mongoose=require("mongoose");
const Scheme=mongoose.Schema;

const userScheme=new Scheme({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    phone:{
        type:Number,
        required:true,
    },
    address:{
        type:String,
        required:true
    },
    isAdmin:{
        type:Number,
        
    },
    password:{
        type:String,
        required:true
    }
});
let userModel=mongoose.model("users",userScheme);
module.exports=userModel;