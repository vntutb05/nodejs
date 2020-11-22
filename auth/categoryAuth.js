const {checkText}=require("../config/regex");
module.exports={
    add:(req)=>{
        let params=req.body;
        if(!params.nameCate || checkText(params.nameCate)<=0){
            req.flash('error','Vui lòng nhập tên Category');
        }
        if(!params.descriptCate || checkText(params.descriptCate)<=0){
            req.flash('error','Vui lòng nhập miêu tả Category');
        }
    },
    seccessAdd:(req)=>{
        req.flash('success','Thêm danh mục thành công');
    },
    seccessEdit:(req)=>{
        req.flash("success","Sửa danh mục thành công");
    }
}