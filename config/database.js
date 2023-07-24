const mongoose = require('mongoose');

const connectDB = () => {
    mongoose
    .connect(process.env.DATABASE_URL,{
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => { console.log('Connected to Database')})
    .catch((err) => {
        console.log(err.message);
        console.error(err);
        process.exit(1);
    })
}

module.exports = connectDB;