import express  from 'express';
import config from './config.js';
import morgan from 'morgan';
import errors from './network/errors.js';
import person from './modules/person/routes.js';
import users from './modules/user/routes.js';
import auth from './modules/auth/routes.js';
import type_product from './modules/type_product/routes.js';
import products from './modules/products/routes.js';
import cookieParser from 'cookie-parser';
import path from 'path';

const app = express();

// Settings
app.set('port', config.app.port);

// Middleware
app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({extended: true}));

// ? pruebas con frontEnd
// app.use(express.static(path.join(__dirname, 'public')));
// app.get('/', (req, res) => {
//   res.sendFile(path.join(__dirname, 'public', 'index.html'));
// });

// ROUTES
app.use('/api/person', person);
app.use('/api/users', users);
app.use('/api/auth', auth);
app.use('/api/type_product', type_product);
app.use('/api/products', products);
app.use(errors); 

export default app;