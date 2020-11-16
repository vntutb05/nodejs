const express=require('express');
const Route=express.Router();
const settingController=require('../../controller/settingController');
const multer=require('multer');
var storage=multer.diskStorage({ 
    destination: (req, file, cb) => { 
        cb(null, 'public/uploads/default') 
    }, 
    filename: (req, file, cb) => { 
        cb(null, file.fieldname + '-' + Date.now()) 
    } 
}); 
const upload = multer({ storage: storage});

Route.route("/setting").get(settingController.getSetting).post(upload.single('image'),settingController.postSetting);

module.exports=Route;