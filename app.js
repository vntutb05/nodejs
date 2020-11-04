// import modules
const express=require("express");
const mongoose=require("mongoose");
const bodyParser=require("body-parser");
const {mongoDbUrl,PORT,globalVariable}=require("./config/config");
const path=require("path");
const hbs=require("express-handlebars");
const multer=require("multer");
const flash=require("connect-flash");
const session=require("express-session");


var storage=multer.diskStorage({ 
    destination: (req, file, cb) => { 
        cb(null, 'uploads') 
    }, 
    filename: (req, file, cb) => { 
        cb(null, file.fieldname + '-' + Date.now()) 
    } 
}); 
  
var upload = multer({ storage: storage }); 


const app=express();
//connect to mongodb
mongoose.connect(mongoDbUrl,{ useNewUrlParser: true,useUnifiedTopology: true  } )
    .then(response =>{
        console.log("Mongodb connected success");
    }).catch(err=>{
        console.log("Database connect failed");
})
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use("/assets",express.static(__dirname+"/public"));
app.use(flash());
app.use(session({
    secret:"secret",
    saveUninitialized:true,
    resave:true
}))
app.use(globalVariable);

app.set("view engine","ejs");

const adminRouter=require("./routes/adminRoute");
const productRouter=require("./routes/productRouter");
const userRouter=require("./routes/userRouter");
const cateRouter=require("./routes/categoryRouter");
app.use("/admin",adminRouter);
app.use("/admin/product",productRouter);
app.use("/admin/user",userRouter);
app.use("/admin/cate",cateRouter);


app.listen(PORT,()=>{
    console.log(`Connected to server at port ${PORT}`);
})