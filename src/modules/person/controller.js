// import { methods as db } from "../../database/mysql";
const TABLE = 'PERSONA';
const FIELD = 'ID_PERSONA';
const FIELD2 = 'IDENTIFICACION';
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

    const specificData = async (identity) => {
        const result = await db.specificData(TABLE, FIELD2, identity);
        console.log(result);
        if (result.length > 0) {
            const object = result[0];
            return {
                id: object.ID_PERSONA,
                identity: object.IDENTIFICACION,
                name: object.NOMBRE,
                lastName: object.APELLIDO,
                address: object.DIRECCION,
                phone: object.CELULAR,
                email: object.CORREO,
                birth: object.BIRTH
            } 
        } else {
            return new Error('Usuario no encontrado')
        }
        // return result;
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