import 'dotenv/config';
import express from 'express';
const app = express();
const port = process.env.PORT || 1313;
import mongoose, { Schema } from 'mongoose';

mongoose.connect('mongodb://127.0.0.1:27017/relation')
.then(()=>console.log('connect to mongo DB'))
.catch((err)=>console.log('could not to database') + err)



 const Books = mongoose.model('Books',new mongoose.Schema({
  title: {type: String},
  pages: {type: String},
  }));

  const Users = mongoose.model('Users',new mongoose.Schema({
    first_name: {type: String},
    last_name: {type: String},
    book:{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Books",
    },
  }));



app.listen(port,()=>{
  console.log(`server run on port: ${port}`);
})