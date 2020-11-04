module.exports={
    add:(req)=>{
        if(!req.body.nameCate){
            req.flash('error','Vui lòng nhập tên Category');
        }
        if(!req.body.descriptCate){
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