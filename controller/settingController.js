const settingAuth=require("../auth/settingAuth");
const settingModel=require("../models/settingModel");
module.exports={
    getSetting:(req,res)=>{
        res.render("admin/setting");
    },
    postSetting:(req,res)=>{
        let params=req.body;
        if(!params.nameWeb ||!params.address1 || !params.phone1){
            settingAuth.settingAuth;
            return res.redirect("/admin/setting");
        }
        let data={
            nameWeb:params.nameWeb,
            contact:{
                basis1:{
                    Address:params.address1,
                    Phone:params.phone1
                },
                basis2:{
                    Address:params.address2,
                    Phone:params.phone2
                }
            },
            linkSocial:{
                facebook:params.facebook,
                instagram:params.instagram,
                youtube:params.youtube,
                twiter:params.twiter
            }
        }
        if(req.file){
            var img = fs.readFileSync("./public/uploads/default" + req.file.filename);
            var encode_image = img.toString('base64');
            datas.image={
                data:Buffer.from(encode_image, 'utf-8')
            };
        }
        console.log(data);
        settingModel.create(data,function(error,data){
            if(error){
                return res.status(500).json(error);
            }
            return res.redirect("/admin/setting");
        })

    }
}