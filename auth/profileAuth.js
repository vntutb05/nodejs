const {checkText}=require('../config/regex');
module.exports={
    changeInfo:(req)=>{
        if(checkText(req.body.name).length==0){
            req.flash('error','Vui lòng nhập tên của bạn');
        }
        if(checkText(req.body.email).length==0){
            req.flash('error','Vui lòng nhập đúng email của bạn');
        }
        if(checkText(req.body.address).length==0){
            req.flash('error','Vui lòng nhập địa chỉ của bạn');
        }
        if(checkText(req.body.phone).length==0){
            req.flash('error','Vui lòng nhập số điện thoại của bạn');
        }
    },
    changePass:(req)=>{
        if(checkText(req.body.newPass)){
            req.flash('error','Vui lòng nhập mật khẩu hiện tại');
        }
        if(checkText(req.body.oldPass)){
            req.flash('error','Vui lòng nhập mật khẩu mới');
        }
    },
    matchPass:(req)=>{
        req.flash('error','Mật khẩu không khớp nhau');
    }
}