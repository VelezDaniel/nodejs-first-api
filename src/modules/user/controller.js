// import { methods as db } from "../../database/mysql";
const TABLE = 'usuario';
const FIELD = 'id_usuario';
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

    const addData = (body, method) => {
        let data = {
            id: body.id,
            info: {
                ID_USUARIO: body.id,
                ESTADO_USUARIO: body.state,
                NACIMIENTO: body.birth,
                CORREO: body.email,
                FK_ID_REGISTRO_ROL: body.registerRole
            }
        }
        if (method === 'PATCH') {
            return db.updateDataNew(TABLE, FIELD, data);
        } else {
            return db.insertData(TABLE, data);
        }
        // return db.addData(TABLE, data);
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
        deleteDataBody,
        deleteData,
    }
}