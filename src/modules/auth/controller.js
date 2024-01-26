// import { methods as db } from "../../database/mysql";
import bcrypt from 'bcrypt';
import {utilities as authIndex} from "../../auth/index.js";
const TABLE = 'auth';
const FIELD = 'user_auth';
export function methods(dbInyected) {

    let db = dbInyected;

    if (!db) {
        db = require('../../database/mysql.js');
    }

    const allData = () => {
        return db.allData(TABLE);
    }

    const login = async (user, password) => {
        try {
            const data = await db.query(TABLE, FIELD, user);

            if (!data) {
                throw new Error('User not found');
            }

            const PasswordMatch = await bcrypt.compare(password, data.PASS_AUTH);
            if (PasswordMatch) {
                return authIndex.assignToken({ ...data });
            } else {
                throw new Error('Invalid password');
            }

            // return bcrypt.compare(password, data.pass_auth)
            // .then(result => {
            //     if(result === true) {
            //         //Generate token
            //         assignToken({...data});
            //     } else {
            //         throw new Error('Invalid information');
            //     }
            // })
        } catch (error) {
            throw error;
        }
    }

    const updateDataNew = async (data) => {
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

        return db.updateDataNew(TABLE, FIELD, authData);
    }

    // const specificData = (nameId, id) => {
    //     return db.specificData(TABLE, nameId, id);
    // }

    // const insertDataUser = (data) => {

    //     const authData = {
    //         id: data.id,
    //         password: data.password
    //     }
    //     // if (data.password) {
    //     //     authData.password = data.password;
    //     // }

    //     return db.insertDataUser(TABLE, authData);
    // }

    // const addAuthData = (data) => {

    //     const authData = {
    //         id: data.id,
    //     }

    //     if(data.password) {
    //         authData.password = data.password;
    //     }

    //     return db.addAuthData(TABLE, authData);
    // }



    // function deleteData(nameId, id) {
    //     return db.deleteData(TABLE, nameId, id);
    // }

    // const deleteDataBody = (body) => {
    //     return db.deleteDataBody(TABLE, body);
    // }

    return {
        allData,
        updateDataNew,
        login
        // specificData,
        // insertDataUser,
        // deleteDataBody,
        // deleteData
    }
}