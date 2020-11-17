module.exports={
    user:(req)=>{
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
    },
    edit:(req)=>{
        if(!req.body.name){
            req.flash("error","Vui lòng nhập tên của bạn");
        }
        if(!req.body.phone){
            req.flash("error","Vui lòng nhập số điện thoại của ban");
        }
        if(!req.body.address){
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