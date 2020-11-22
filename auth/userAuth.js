const {checkText}=require("../config/regex");
module.exports={
    user:(req)=>{
        if(checkText(req.body.name).length==0){
            req.flash("error","Vui lòng nhập tên của bạn");
        }
        if(checkText(req.body.email).length==0){
            req.flash("error","Vui lòng nhập email của bạn");
        }
        if(checkText(req.body.phone).length==0){
            req.flash("error","Vui lòng nhập số điện thoại của ban");
        }
        if(checkText(req.body.address).length==0){
            req.flash("error","Vui lòng nhập địa chỉ của bạn");
        }
        if(checkText(req.body.password).length==0){
            req.flash("error","Vui lòng nhập mật khẩu của bạn");
        }
    },
    edit:(req)=>{
        if(checkText(req.body.name).length==0){
            req.flash("error","Vui lòng nhập tên của bạn");
        }
        if(checkText(req.body.phone).length==0){
            req.flash("error","Vui lòng nhập số điện thoại của ban");
        }
        if(checkText(req.body.address).length==0){
            req.flash("error","Vui lòng nhập địa chỉ của bạn");
        }
    },
    passMatch:(req)=>{
        req.flash("error","Mật khẩu nhập lại không khớp");
    },
    userUnique:(req)=>{
        req.flash("error","Tài khoản đã tồn tại");
    },
    seccessAdd:(req)=>{
        req.flash("success","Thêm người dùng thành công");
    },
    seccessEdit:(req)=>{
        req.flash("success","Sửa người dùng thành công");
    },
    lessPower:(req)=>{
        req.flash("error","Bạn không có đủ quyền hạn để thực hiện thao tác này");
    }
}