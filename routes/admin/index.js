const express = require("express");
const adminRouter=require("./adminRoute");
const productRouter=require("./productRouter");
const userRouter=require("./userRouter");
const cateRouter=require("./categoryRouter");
const settingRoute=require("./settingRoute");
const indexRouter = require('../web/index')

const router = express.Router();
router.use("/",indexRouter);
router.use("/admin",adminRouter);
router.use("/admin/product",productRouter);
router.use("/admin/user",userRouter);
router.use("/admin/cate",cateRouter);
router.use("/admin",settingRoute);

module.exports = router;