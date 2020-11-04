module.exports={
    mongoDbUrl:"mongodb://localhost:27017/cms_toturial",
    PORT:process.env.PORT|3000,
    globalVariable:(req,res,next)=>{
        res.locals.seccess_message=req.flash("success"),
        res.locals.error_message    =req.flash("error");
        next();
    }
}