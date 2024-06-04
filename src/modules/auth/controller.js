// import { methods as db } from "../../database/mysql";
import bcrypt from 'bcrypt';
import { utilities as authIndex } from "../../auth/index.js";
import { createAccessToken } from '../../libs/jwt.js';
import jwt from "jsonwebtoken";
import config from '../../config.js'
const TABLE = 'AUTH';
const TABLE2 = 'tokens_login';
const FIELD = 'user_auth';
const FIELD2 = 'id_auth';
export function methods(dbInyected) {

    let db = dbInyected;

    if (!db) {
        db = require('../../database/mysql.js');
    }

    const allData = () => {
        return db.allData(TABLE);
    }

    const specificData = (id) => {
        return db.specificData(TABLE, FIELD, id);
    }

    const specificDataToken = async (id) => {
        // return db.specificData(TABLE2, FIELD2, id);
        const data = await db.specificData(TABLE2, FIELD2, id);
        console.log(data);

        if (!data || !data.length === 0 || !data[0].TOKEN) {
            return null;
        }

        return data;
    }

    const login = async (identity, password) => {
        try {
            const data = await db.query(TABLE, FIELD, identity);

            if (!data) {
                return { status: 404, message: 'Usuario o contraseña incorrecta' };
            }

            const PasswordMatch = await bcrypt.compare(password, data.PASS_AUTH);
            if (PasswordMatch) {
                // return authIndex.assignToken({ ...data });

                // const token = authIndex.assignToken({ ...data });
                const token = await createAccessToken(data)
                const userProfile = await db.userProfile(data.USER_AUTH)
                const user = data.USER_AUTH;
                const infoTk = {
                    info: {
                        ident_auth: user,
                        token: token
                    }
                }
                const resultSavedToken = await db.insertData(TABLE2, infoTk);
                if (resultSavedToken) {
                    return { status: 200, token, userProfile };
                } else {
                    return { status: 500, message: "success = false" }
                }
            } else {
                return { status: 401, message: "Invalid credentials" }
            }
        } catch (error) {
            return { status: 500, message: "Internal Server Error" };
        }
    }

    const logout = async (data) => {
        try {
            const deleteToken = await db.deleteDataBody(TABLE2, FIELD2, data);
            return deleteToken;
        } catch (error) {
            throw new Error(error);
        }
    }

    const updateDataNew = async (data, method) => {
        let pass;
        if (data.password) {
            pass = await bcrypt.hash(data.password.toString(), 5);
        }

        const authData = {
            id: data.user,
            info: {
                pass_auth: pass
            }
        }
        if (method === 'POST') {
            // const queryResult = await db.query(TABLE, FIELD, data.user);
            // if (queryResult.PASS_AUTH < '') {
            //     return db.updateDataNew(TABLE, FIELD, authData);
            // } else { throw new Error('Action denied'); }
            return db.updateDataNew(TABLE, FIELD, authData);

        } else {
            if (method === 'PATCH') { return db.updateDataNew(TABLE, FIELD2, authData); }
            else {
                throw new Error(error);
            }
        }
    }

    const verifyToken = async (token) => {
        return new Promise((resolve, reject) => {
            const SECRET = config.jwt.security;

            jwt.verify(token, SECRET, async (err, user) => {
                if (err) {
                    console.log('Error in verify token: ', err);
                    reject(new Error('Error in verify token: ' + err))
                    return;
                }
                console.log('MOSTRANDO USER de verifyToken controller: ', user)
                // identificacion o IDENTIFICACION e ID_PERSONA
                // Comprobar existencia en tabla usuario
                try {
                    const userfound = await db.specificData('usuario', 'id_usuario', user.USER_AUTH);
                    if (!userfound) return new Error('Not found -- Unauthorized');

                    // Traer informacion de la tabla persona
                    // const infoPerson = await db.specificData('persona', 'id_persona', user.id);
                    const infoPerson = await db.userProfile(user.USER_AUTH);
                    console.log('infoPerson (controller): ', infoPerson)
                    // const information = {
                    //     id: infoPerson.ID_PERSONA,
                    //     identity: infoPerson.IDENTIFICACION,
                    //     state: userfound.ESTADO_USUARIO,
                    //     name: infoPerson.NOMBRE,
                    //     lastName: infoPerson.APELLIDO,
                    //     address: infoPerson.DIRECCION,
                    //     email: infoPerson.Correo,
                    //     phone: infoPerson.CELULAR,
                    //     birth: infoPerson.NACIMIENTO
                    // }
                    // resolve(information);
                    resolve(infoPerson);
                } catch (error) {
                    reject(error)
                }

            })
        })
    }

    const profile = async (user) => {
        const ident = user.IDENT_AUTH;
        const userFound = await db.userProfile(ident);

        if (!userFound) { return null }

        // -- testing
        console.log('userFound :>> ', userFound);

        return userFound;
    }

    return {
        allData,
        updateDataNew,
        login,
        specificData,
        specificDataToken,
        logout,
        profile,
        verifyToken
    }
}