import jwt from "jsonwebtoken";
import config from "../config.js";

const security = config.jwt.security;

const assignToken = (data) => {
    return jwt.sign(data, security);
}

export const utilities = {
    assignToken
}