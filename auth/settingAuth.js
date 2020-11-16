module.exports={
    settingAuth:(req,res)=>{
        let params=req.body;
        if(!params.nameWeb){
            req.flash("error","Vui lòng nhập tên Website");
        }
        if(!params.address1){
            req.flash("error","Vui lòng nhập địa chỉ của Website");
        }
        if(!params.phone1){
            req.flash("error","Vui lòng nhập số điện thoại của Website")
        }
    }
}