import {utilities as auth} from '../../auth/index.js';

const checkAuth = () => {

    function middleware(req, res, next) {
        // const id  = req.body.id
        // auth.checkToken.confirmToken(req, id);
        auth.checkToken.confirmToken(req)
        next();
    }
    return middleware;
}

export default checkAuth;