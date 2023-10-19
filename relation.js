import 'dotenv/config';
import express from 'express';
const app = express();
const port = process.env.PORT || 1313;
import mongoose from 'mongoose';






app.listen(port,()=>{
  console.log(`server run on port: ${port}`);
})