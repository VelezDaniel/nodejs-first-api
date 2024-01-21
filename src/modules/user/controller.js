// import { methods as db } from "../../database/mysql";
const TABLE = 'usuario';
export function methods(dbInyected) {

    let db = dbInyected;

    if(!db){
        db = require('../../database/mysql.js');
    }

    const allData = () => {
        return db.allData(TABLE);
    }

    const specificData = (nameId, id) => {
        return db.specificData(TABLE, nameId, id);
    }

    // const addData = (body) => {
    //     return db.addData(TABLE, body);
    // }

    const updatedData = (body) => {
        return db.updatedData(TABLE, body);
    }

    const insertData = (body) =>{
        return db.insertData(TABLE, body);
    }

    function deleteData(nameId, id) {
        return db.deleteData(TABLE, nameId, id);
    }

    const deleteDataBody = (body) => {
        return db.deleteDataBody(TABLE, body);
    }

    // const insertUser = (body) => {
    //     return db.insertUser(TABLE, body);
    // }

    return {
        allData,
        specificData,
        // addData,
        insertData,
        updatedData,
        deleteDataBody,
        deleteData,
        // insertUser
    }
}