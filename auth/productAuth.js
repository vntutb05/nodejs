module.exports={
    add:(req)=>{
        if(!req.body.name){
            req.flash('error',"Vui lòng nhập tên sản phẩm");
        }
        if(!req.body.price){
            req.flash('error','Vui lòng nhập giá sản phẩm');
        }
        if(!req.body.decript){
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