// require('dotenv').config();
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODBLINK, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
})

const db_collections = mongoose.connection;
// console.log('collections from db in uxer controllers', db_collections)
