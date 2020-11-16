const express=require("express");
const router=express.Router();
const productController=require("../../controller/productController");
const multer=require("multer");
const middleware=require("../../auth/sessionUser");

var storage=multer.diskStorage({ 
    destination: (req, file, cb) => { 
        cb(null, 'public/uploads') 
    }, 
    filename: (req, file, cb) => { 
        cb(null, file.fieldname + '-' + Date.now()) 
    } 
}); 
const upload = multer({ storage: storage});

router.route("/").get(middleware.isLogin,productController.index);
router.route("/add").get(middleware.isLogin,productController.getAdd).post(upload.single('image'),productController.postAdd);
router.route("/edit/:id").get(middleware.isLogin,productController.getEdit).post(upload.single('image'),productController.postEdit);
router.route("/delete/:id").get(middleware.isLogin,productController.delete);

module.exports=router;
