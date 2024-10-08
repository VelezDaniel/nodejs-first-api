import jwt from "jsonwebtoken";
import config from "../config.js";
import error from "../middleware/errors.js";

const security = config.jwt.security;

const assignToken = (data) => {
    return jwt.sign(data, security);
}

const verifyToken = (token) => {
    return jwt.verify(token, security);
}

const checkToken = {
    confirmToken: function(req, id){
        const decoded = decodeHeader(req);

        // ? Si el id es diferente al que se intenta modificar del que corresponde el token no sera permitido 
        if(decoded.id !== id){
            error("You can't do that", 401);
        }
    }
}

const getToken = (authorization) => {
    if(!authorization){
        error("There isn't Token", 401);
    }
    
    if(authorization.indexOf('Bearer') === -1){
        error('Invalid Format', 401);
    }

    let token = authorization.replace('Bearer ', '');
    return token;
}

const decodeHeader = (req) => { 
    const authorization = req.headers.authorization || ''; 
    const token = getToken(authorization);
    const decoded = verifyToken(token);

    req.user = decoded;
    return decoded;
}

const createAccessToken = (payload) =>{
    return new Promise((resolve, reject) => {
        jwt.sign(
            payload,
            security,
            {
                expiresIn: "1d",
            },
            (err, token) => {
                if (err) reject(err)
                resolve (token);
            }
        );
    });
}

export const utilities = {
    assignToken,
    checkToken,
    createAccessToken
}