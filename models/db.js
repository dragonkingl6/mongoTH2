const mongoose = require('mongoose');

const url="mongodb://localhost:27017/task";
mongoose.connect(url, {useNewUrlParser:true}, (err)=>{
    if(!err){
        console.log("thanh cong")
    }else{
        console.log("that bai")
    }
})

require('./task.mode');