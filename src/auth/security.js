import {utilities as auth} from './index.js';

const checkAuth = () => {

    function middleware(req, res, next) {
        const user  = req.body.user
        auth.checkToken.confirmToken(req, user);
        // auth.checkToken.confirmToken(req)
        next();
    }
    return middleware;
}

export default checkAuth;