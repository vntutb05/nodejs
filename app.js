// import modules
const express=require("express");
const mongoose=require("mongoose");
const bodyParser=require("body-parser");
const path=require("path");
const hbs=require("express-handlebars");
const multer=require("multer");
const flash=require("connect-flash");
const session=require("express-session");
const redis=require("redis");
const {mongoDbUrl,PORT,globalVariable}=require("./config/config");
const {adminRouter,productRouter,userRouter,cateRouter,settingRoute}=require("./routes/admin/indexRouter");


let RedisStore = require('connect-redis')(session)
let redisClient = redis.createClient(12998, 'redis-12998.c10.us-east-1-2.ec2.cloud.redislabs.com',{password:"P7gxdQtx6TFXRXGZwuEDmyfN4siGCzze"});
 
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
/* app.use(session({
    secret:"secret123",
    saveUninitialized:true,
    resave:true, 
    cookie: { maxAge: 7 * 24 * 3600 * 1000 }
})) */
app.use(
    session({
      store: new RedisStore({ client: redisClient }),
      secret: 'keyboard cat',
      resave: false
    }
  ))
app.use(globalVariable);
app.set("view engine","ejs");

const indexRouter=require("./routes/web/index");
app.use("/",indexRouter);
app.use("/admin",adminRouter);
app.use("/admin/product",productRouter);
app.use("/admin/user",userRouter);
app.use("/admin/cate",cateRouter);
app.use("/admin",settingRoute);

app.listen(PORT,()=>{
    console.log(`Connected to server at port ${PORT}`);
})