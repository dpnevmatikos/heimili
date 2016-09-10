"use strict";
const express = require('express');
exports.router = express.Router();
/* GET users listing. */
exports.router.get('/', (req, res, next) => {
    res.send('respond with a resource');
});
//module.exports = router;
