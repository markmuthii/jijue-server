const mongoose = require('mongoose');

const connectDB = async () => {
  const conn = await mongoose
    .connect(process.env.MONGODB_URI, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useFindAndModify: false
    })
    .then(db => console.log('Connected to the database.'))
    .catch(err => console.log('Error Connecting to the database.'));
};

module.exports = connectDB;
