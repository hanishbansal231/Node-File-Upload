const express = require('express');
const connectDB = require('./config/database');
const cloudinaryConnect = require('./config/cloudinary');
const fileUpload = require('express-fileupload')
const uploadRouter = require('./router/fileRouter');
const app = express();
require('dotenv').config();
app.use(express.json());
app.use(fileUpload({
    useTempFiles : true,
    tempFileDir : '/tmp/'
}));
app.use("/api/v1/upload",uploadRouter);
const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    console.log(`Server is listen in ${PORT}`);
    connectDB();
    cloudinaryConnect();
})