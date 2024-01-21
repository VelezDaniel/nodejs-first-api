import express  from 'express';
import config from './config.js';
import morgan from 'morgan';
import errors from './network/errors.js';
import person from './modules/person/routes.js';
import users from './modules/user/routes.js';

const app = express();

// Settings
app.set('port', config.app.port);

// Middleware
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
 
// ROUTES
app.use('/api/person', person);
app.use('/api/users', users);
app.use(errors); 

export default app;