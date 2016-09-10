"use strict";
const homeRoutes = require('./index');
const userRoutes = require('./users');
exports.users = userRoutes.router;
exports.home = homeRoutes.router;
