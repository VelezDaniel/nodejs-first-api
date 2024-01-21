// import { methods as db } from "../../database/mysql";
const TABLE = 'persona';
const FIELD = 'id_persona';
export function methods(dbInyected) {

    let db = dbInyected;

    if (!db) {
        db = require('../../database/mysql.js');
    }

    const allData = () => {
        return db.allData(TABLE);
    }

    const addData = (body) => {
        let data = {
            id: body.id,
            info: {
                identificacion: body.identity,
                nombre: body.name,
                apellido: body.lastName,
                celular: body.phone,
                direccion: body.address
            }
        }
        return db.addData(TABLE, FIELD, data);
    }

    const updateDataNew = (body) => {
        const data = {
            id: body.id,
            info: {
                id_persona: body.id,
                identificacion: body.info.identity,
                nombre: body.info.name,
                apellido: body.info.lastName,
                celular: body.info.phone,
                direccion: body.info.address
            }
        }
        return db.updateDataNew(TABLE, FIELD, data);
    }

    const specificData = (id) => {
        return db.specificData(TABLE, FIELD, id);
    }

    function deleteData(id) {
        return db.deleteData(TABLE, FIELD, id);
    }

    const deleteDataBody = (body) => {
        return db.deleteDataBody(TABLE, FIELD, body);
    }

    return {
        allData,
        specificData,
        addData,
        updateDataNew,
        // insertDataUser,
        deleteDataBody,
        deleteData
    }
}