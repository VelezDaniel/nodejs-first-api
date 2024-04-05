// import { methods as db } from "../../database/mysql";
const TABLE = 'TIPO_PRODUCTO';
const FIELD = 'ID_TIPO_PRODUCTO';
export function methods(dbInyected) {

    let db = dbInyected;

    if (!db) {
        db = require('../../database/mysql.js');
    }

    const allData = async () => {
        const results = await db.allData(TABLE);
        if(results.length > 0) {
            const allTypes = results.map(productType => ({
                idProductType: productType.ID_TIPO_PRODUCTO,
                nameProductType: productType.NOMBRE_TIPO_PRODUCTO,
            }));
            return allTypes;

        } else {return [];}
    }

    const addData = (body) => {
        let data = {
            id: body.id,
            info: {
                nombre_tipo_producto: body.name,
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