const express  = require("express");
const PORT = 5000;
const mongoose = require("mongoose");
const morgan = require("morgan");
const colors = require("colors");
const { json } = require("body-parser");


const app = express();





// mongoDB config
const connectDB = async () =>{
    try {
        const conn = await mongoose.connect("mongodb+srv://AllUserData:Ramkumartoppo@cluster0.1od8l.mongodb.net/InstagramDB?retryWrites=true&w=majority", {
            useNewUrlParser: true,
            useCreateIndex: true,
            useUnifiedTopology:true
        });
        console.log(`Mongodb connected :${conn.connection.host}`.cyan.underline.bold);
    } catch (error) {
        console.log(`ERROR:${error.message}`.red);
        process.exit(1);
    }
}

connectDB();
// middleware

app.use(express.json());

require("./Models/user");

require("./Models/post");

app.use(require("./Routes/auth"));
app.use(require("./Routes/post"));


app.listen(PORT,()=>{
    console.log("App listening on localhost:5000");
})