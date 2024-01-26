import jwt from "jsonwebtoken";
import config from "../config.js";

const security = config.jwt.security;

const assignToken = (data) => {
    return jwt.sign(data, security);
}

const verifyToken = (token) => {
    return jwt.verify(token, security);
}

const checkToken = {
    confirmToken: function(req){
        const decoded = decodeHeader(req);

        // ? Para verificar que el usuario sea el unico que pueda editar sus propios datos se puede hacer una validación similar a esta: 
        // if(decoded.id === id){
        //     throw new Error("You can't do that");
        // }
    }
}

const getToken = (authorization) => {
    if(!authorization){
        throw new Error("There isn't Token");
    }
    
    if(authorization.indexOf('Bearer') === -1){
        throw new Error('Invalid Format');
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

export const utilities = {
    assignToken,
    checkToken
}