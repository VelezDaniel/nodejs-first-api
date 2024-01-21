// import { methods as db } from "../../database/mysql";
const TABLE = 'auth';
const FIELD = 'id_auth';
export function methods(dbInyected) {

    let db = dbInyected;

    if (!db) {
        db = require('../../database/mysql.js');
    }

    const allData = () => {
        return db.allData(TABLE);
    }

    const updateData = (data) => {
        const authData = {
            id: data.id,
            info: {
                pass_auth: data.password
            }
        }
        return db.updateData(TABLE, FIELD, authData);
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
        updateData
        // specificData,
        // insertDataUser,
        // deleteDataBody,
        // deleteData
    }
}