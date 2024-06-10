// import { methods as db } from "../../database/mysql";
const TABLE = 'DOMICILIO';
const FIELD = 'ID_DOMICILIO';
export function methods(dbInyected) {

    let db = dbInyected;

    if (!db) {
        db = require('../../database/mysql.js');
    }

    const allData = async () => {
        const results = await db.allData(TABLE);
        if (results.length > 0) {
            const deliveries = results.map((result) => ({
                id: result.ID_DOMICILIO,
                deliveryDescription: result.DESCRIPCION_DOMICILIO,
                deliveryPrice: result.COSTO_DOMICILIO,
            }))
            return deliveries;
        } else {
            return [];
        }
    }

    const addData = (body) => {
        let data = {
            id: body.id,
            info: {
                descripcion_domicilio: body.deliveryDescription,
                descripcion_producto: body.description,
                costo_domicilio: body.deliveryPrice,
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

    return {
        allData,
        specificData,
        addData,
        deleteData
    }
}