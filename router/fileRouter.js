const express = require('express');
const router = express.Router();
const {localFileUpload} = require('../controller/File');


router.post("/localFileUpload",localFileUpload);


module.exports = router;