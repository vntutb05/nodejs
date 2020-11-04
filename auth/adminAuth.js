module.exports={
    login:(req)=>{
        if(!req.body.email){
            req.flash("error","Vui lòng nhập email");
        }if(!req.body.password){
            req.flash("error","Vui lòng nhập mật khẩu");
        }
    },
    register:(req)=>{
        if(!req.body.name){
            req.flash("error","Vui lòng nhập tên của bạn");
        }
        if(!req.body.email){
            req.flash("error","Vui lòng nhập email của bạn");
        }
        if(!req.body.phone){
            req.flash("error","Vui lòng nhập số điện thoại của ban");
        }
        if(!req.body.address){
            req.flash("error","Vui lòng nhập địa chỉ của bạn");
        }
        if(!req.body.password){
            req.flash("error","Vui lòng nhập mật khẩu của bạn");
        }
        if(!req.body.repassword){
            req.flash("error","Vui lòng nhập lại mật khẩu của bạn");
        }
    }
}