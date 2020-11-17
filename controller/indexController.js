const productModel=require("../models/postModels");

module.exports={
    getIndex:(req,res)=>{
      
        productModel.find(function(error,data){
            if(error){
                return res.status(500).json(err);
            }
            res.render("web/index",{data:data});
        })
        
    }
}