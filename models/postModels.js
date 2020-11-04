const mongoose=require("mongoose");
const Scheme=mongoose.Schema;

const postScheme=new Scheme({
    name:{
        type:String,
        required:true
    },category:{
        type:String,
    },price:{
        type:Number,
        required:true
    }
    , decription:{
        type:String,
        required: true
    },image:{
        data:Buffer,
        contentType:String
    }
    ,creationDate:{
        type:Date,
        default: Date.now()
    }
})
let postModel=mongoose.model("post",postScheme);
module.exports=postModel;