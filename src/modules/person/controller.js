// import { methods as db } from "../../database/mysql";
const TABLE = 'PERSONA';
const FIELD = 'ID_PERSONA';
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
                direccion: body.address,
                CORREO: body.email,
                NACIMIENTO: body.birth
            }
        }
        return db.addData(TABLE, FIELD, data);
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

    const registerClient = (data) => {
        return db.registerClient(TABLE, FIELD, data);
    } 

    return {
        allData,
        specificData,
        addData,
        deleteDataBody,
        deleteData,
        registerClient
    }
}