import {error} from './response.js';

function errors(err, req, res, next) {
    console.error('[Error]',err);
    const message = err.message || 'Internal Error';
    const status = err.statusCode || 500;

    error(req, res, message, status);
}

export default errors;