// import { methods as db } from "../../database/mysql";
const TABLE = 'usuario_registrado';
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

    const addData = (body) => {
        return db.addData(TABLE, body);
    }

    function deleteData(nameId, id) {
        return db.deleteData(TABLE, nameId, id);
    }

    const deleteDataBody = (body) => {
        return db.deleteDataBody(TABLE, body);
    }

    return {
        allData,
        specificData,
        addData,
        deleteDataBody,
        deleteData
    }
}