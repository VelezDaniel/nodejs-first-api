// import { methods as db } from "../../database/mysql";
const TABLE = 'PRODUCTO';
const FIELD = 'ID_PRODUCTO';
export function methods(dbInyected) {

    let db = dbInyected;

    if (!db) {
        db = require('../../database/mysql.js');
    }

    const allData = () => {
        return db.allProducts(TABLE);
    }

    const addData = (body) => {
        let data = {
            id: body.id,
            info: {
                nombre_producto: body.name,
                descripcion_producto: body.description,
                precio_unitario: body.price,
                estado_producto: body.state || 'Disponible',
                fk_tipo_producto: body.type,
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

    return {
        allData,
        specificData,
        addData,
        deleteDataBody,
        deleteData
    }
}