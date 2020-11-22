const {checkText}=require("../config/regex");
module.exports={
    add:(req)=>{
        if(checkText(req.body.name).length==0){
            req.flash('error',"Vui lòng nhập tên sản phẩm");
        }
        if(checkText(req.body.price).length==0){
            req.flash('error','Vui lòng nhập giá sản phẩm');
        }
        if(checkText(req.body.decript).length==0){
            req.flash('error','Vui lòng nhập miêu tả sản phẩm');
        }
    },
    successAdd:(req)=>{
        req.flash('success',"Thêm sản phẩm thành công");
    },
    successEdit:(req)=>{
        req.flash('success',"Sửa sản phẩm thành công")
    }
}