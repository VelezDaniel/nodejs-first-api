import {methods as db} from '../../database/mysql.js';
import {methods as ctrl} from './controller.js';

export default ctrl(db);