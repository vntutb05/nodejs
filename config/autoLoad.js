const settingModel=require("../models/settingModel");
let datas;
settingModel.find(function(error,data){
    if(error){
        return resizeBy.status(500).json(error);
    }
    datas=data[0];
})
session=(req)=>{
    return req.session;
}

module.exports={datas,session};