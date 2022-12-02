//https://dev.to/ndohjapan/file-upload-with-multer-node-js-ad-express-f1e
/* This is importing the required modules. */
const express = require('express');
const app = express();
const path = require('path');
const multer = require('multer');
const mongoose = require('mongoose');
const db = require('./db');
const bodyparser=require('body-parser');
app.use(bodyparser.json());


app.use(express.static("images"))

app.set('view engine', 'ejs');

const uploadimage=multer.diskStorage({
    destination:(req,file,cb)=>
    {
        cb(null,'./images')
    },
    filename:(req,file,cb)=>
    {
        cb(null,path.extname(file.originalname))
    }
})

const upload=multer({
    storage:uploadimage,
    limits: {fileSize: 1097152},
   
    fileFilter: ((req,file,cb)=>{
        checkFileType(file, cb);
    })
})

function checkFileType(file, cb){
    // Allowed ext
    const filetypes = /jpeg|jpg|png/;
    // Check ext
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    // Check mime
    const mimetype = filetypes.test(file.mimetype);
  
    if(mimetype && extname){
      return cb(null,true);
    } else {
      cb('Error: Images Only!');
    }
  }

 /* Rendering the index.ejs file. */
app.get('/form',(req,res) => {
    res.render('index')
})


app.post('/app',upload.single('photo'),(req,res)=>{
    const ms=new db({
        name:req.body.name,
        photo:{
            data:req.file.filename,
            contentType:'image/png',
        }
    })

    ms.save().then(()=>{
        console.log('success')
        res.send("success")
    }).catch((err)=>{
        console.log(err)
    })
})



app.listen(4000)