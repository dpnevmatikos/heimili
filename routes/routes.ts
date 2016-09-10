import homeRoutes = require('./index');
import userRoutes = require('./users');

export var users = userRoutes.router;
export var home = homeRoutes.router;
