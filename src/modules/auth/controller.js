// import { methods as db } from "../../database/mysql";
import bcrypt from 'bcrypt';
import { utilities as authIndex } from "../../auth/index.js";
const TABLE = 'AUTH';
const TABLE2 = 'tokens_login';
const FIELD = 'user_auth';
const FIELD2 = 'ident_auth';
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

        if(!data || !data.length === 0 || !data[0].TOKEN) {
            return null;
        }

        return data;
    }

    const login = async (user, password) => {
        try {
            const data = await db.query(TABLE, FIELD, user);

            if (!data) {
                throw new Error('User not found');
            }

            const PasswordMatch = await bcrypt.compare(password, data.PASS_AUTH);
            if (PasswordMatch) {
                // return authIndex.assignToken({ ...data });
                const token = authIndex.assignToken({ ...data });
                const user = data.USER_AUTH;
                const infoTk = {
                    info: {
                        ident_auth: user,
                        token: token
                    }
                }
                const resultSavedToken = await db.insertData(TABLE2, infoTk);
                if (resultSavedToken) {
                    return token;
                } else {
                    throw new Error('Something was wrong...');
                }
            } else {
                throw new Error('Something was wrong TRY');
            }
        } catch (error) {
            throw error;
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
            const queryResult = await db.query(TABLE, FIELD, data.user);
            if (queryResult.PASS_AUTH === '') {
                return db.updateDataNew(TABLE, FIELD, authData);
            } else { throw new Error('Action denied'); }
        } else {
            if (method === 'PATCH') { return db.updateDataNew(TABLE, FIELD, authData); }
        }
    }

    const profile = async (user) => {
        const ident = user.IDENT_AUTH;
        const userFound = await db.userProfile(ident);

        if(!userFound) {return null}

        // -- testing
        console.log('userFound :>> ', userFound);

        return userFound;
    }

    // ! register unnecessary
    // const register = async (req, res) => {
    //     // console.log(req.body);
    //     const {userId, name, lastName, phone, address, birth, email} = req.body;

    //     try {
    //         const userInfo = {
    //             userId,
    //             name,
    //             lastName,
    //             phone,
    //             address,
    //             birth,
    //             email
    //         }

    //         await 


    //         res.send('Registrered');
    //     } catch (error) {
    //         console.log(error);
    //     }

    //     // console.log(userInfo);


    // }

    return {
        allData,
        updateDataNew,
        login,
        specificData,
        specificDataToken,
        logout,
        profile
    }
}