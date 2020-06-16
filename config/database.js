require('dotenv').config();
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODBLINK, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
})


