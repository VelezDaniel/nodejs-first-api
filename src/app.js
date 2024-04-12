import express  from 'express';
import config from './config.js';
import morgan from 'morgan';
import errors from './network/errors.js';
import person from './modules/person/routes.js';
import users from './modules/user/routes.js';
import auth from './modules/auth/routes.js';
import role from './modules/role/routes.js';
import products from './modules/products/routes.js';
import aditions from './modules/aditions/routes.js';
import bookings from './modules/bookings/routes.js';
import flavors from './modules/flavors/routes.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';

const app = express();
// Settings
app.set('port', config.app.port);

// Middleware
app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({extended: true}));
app.use(cors({
  origin: 'http://localhost:5173',
  // Credenciales son necesarias para la respuesta con axios
  credentials: true
}))

// ROUTES
// app.get('/', (req, res,) => {
//   res.send('Welcome to my server in railway :D')
// })
app.use('/api/person', person);
app.use('/api/users', users);
app.use('/api/auth', auth);
app.use('/api/roles', role);
app.use('/api/products', products);
app.use('/api/aditions', aditions);
app.use('/api/bookings', bookings);
app.use('/api/flavors', flavors);
app.use(errors); 

export default app;