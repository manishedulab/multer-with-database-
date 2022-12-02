const mongoose = require('mongoose');


/* Connecting to the database. */
mongoose.connect('mongodb://localhost:27017/uploding_image')
.then(()=>{
    console.log("connect successful")
})
.catch((err)=>{
    console.log(err)
})


/* Creating a schema for the database. */
const ms=mongoose.Schema({
    name:String,
    photo:{

        data:Buffer,
        contentType:String
    }
})



/* Exporting the model to be used in other files. */
const db= mongoose.model('details',ms)
module.exports = db;

