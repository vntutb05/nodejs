// import modules
const express=require("express");
const bodyParser=require("body-parser");
const flash=require("connect-flash");
const session=require("express-session");
const redis=require("redis");
const {globalVariable}=require("./config/config");
const config = require("./config/defaul.json");
const database = require('./common/database');


let RedisStore = require('connect-redis')(session)
let redisClient = redis.createClient(6379, 'redis-6379.c10.us-east-1-2.ec2.cloud.redislabs.com');
let port = config.server.port;

let router=require("./routes/admin");
 
const app=express();
database.connectDb();
//connect to mongodb

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
/* sesion use redis */
app.use(
    session({
      store: new RedisStore({ client: redisClient }),
      secret: 'keyboard cat',
      resave: false
    }
  ))
app.use(globalVariable);
app.set("view engine","ejs");

app.use(router);


app.listen(port,()=>{
    console.log(`Connected to server at port ${port}`);
})
