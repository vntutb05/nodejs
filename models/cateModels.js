const mongoose=require('mongoose');
const Scheme=mongoose.Schema;

const cateScheme={
    name:{
        type:String,
        require:true
    },
    description:{
        type:String,
        require:true
    },
    datatime:{
        createdAt:{
            type:Date,
            require:true
        },
        updateAt:{
            type:Date,
        }
    }
}
let cateModel=mongoose.model('cates',cateScheme);
module.exports=cateModel;