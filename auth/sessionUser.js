const session=require("express-session");
module.exports={
    isLogin:(req,res,next)=>{
        if(req.session.user){
            next();
        }else{
            res.redirect('/admin/login');
        }
    }
}