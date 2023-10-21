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
  pages: {type: Number},
  }));

  const Users = mongoose.model('Users',new mongoose.Schema({
    first_name: {type: String},
    last_name: {type: String},
    book:{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Books",
    },
  }));



//create book function
async function createBook(title, pages) {
  try {
    const user = new Books({
      title,
      pages,
    });

    const result = await user.save();
    console.log(result);

  } catch (error) {
    console.error("error" + error);
  }
}
//  affter run createBook('NodeJs',200 ) ==> book_id ==> '65319cb405bf5f99ac82c8d0'

// createBook('NodeJs',200 )

//create user function 
async function createUser(first_name, last_name, book_id) {
  try {
    const user = new Users({
      first_name,
      last_name,
      book: book_id,
    });
    const result = user.save();
    console.log(result);
  } catch (error) {
    console.error("error" + error);
  }
}
//call createUser() function 
//createUser('mohammad', 'hadi', '')
// createUser('mina', 'karimi', '65319cb405bf5f99ac82c8d0')

//create all user getuser() function
async function getUsers() {
  try {
    const user = await Users.find().populate("book", "title pages -_id"); // show title and pages without id
    if (!user) return console.log("not fond users");
    console.log(user);
  } catch (error) {
    console.error(`error ${error}`);
  }
}
// getUsers()

//create all user getuser() function
async function getUserById(id){
  try {
    const user = await Users.findById(id).populate("book", "title pages -_id"); // show title and pages without id
    if (!user) {
      return console.error("can not fond user ID");
    }
    console.log(user);
  } catch (error) {
    console.error(`error user id: ${error}`);
  }
}
getUserById('6533c7242f95916637a2008a')

app.listen(port,()=>{
  console.log(`server run on port: ${port}`);
})