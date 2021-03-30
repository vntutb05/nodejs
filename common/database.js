const mongoose=require("mongoose");
const config = require("../config/defaul.json");

let uriDB = config.database.uri;
function connectDb(){
    mongoose.connect(uriDB,{ useNewUrlParser: true,useUnifiedTopology: true  } )
    .then(response =>{
        console.log("Mongodb connected success");
    }).catch(err=>{
        console.log("Database connect failed");
})
}
module.exports = {
    connectDb:connectDb
}