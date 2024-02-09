import express  from 'express';
import config from './config.js';
import morgan from 'morgan';
import errors from './network/errors.js';
import person from './modules/person/routes.js';
import users from './modules/user/routes.js';
import auth from './modules/auth/routes.js';
import cookieParser from 'cookie-parser';

const app = express();

// Settings
app.set('port', config.app.port);

// Middleware
app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({extended: true}));

 
// ROUTES
app.use('/api/person', person);
app.use('/api/users', users);
app.use('/api/auth', auth);
app.use(errors); 

export default app;