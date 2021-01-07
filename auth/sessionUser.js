const session=require("express-session");
module.exports={
    isLogin:(req,res,next)=>{
        let user=req.session.user
        if(user){
            if(user.isAdmin==0 || user.isAdmin==1){
                next();
            }
        }else{
            req.flash("error","Vui lòng đăng nhập trước");
            res.redirect('/admin/login');
        }
    },
    isCheck:(req,res,next)=>{

        if(!req.session.user){
            next();
        }else{
            req.flash("success","Bạn đã đăng nhập");
            res.redirect('/admin/');
            console.log("as");
        }
    }
}