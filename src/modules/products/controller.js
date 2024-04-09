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
                nombre_producto: body.nameProduct,
                descripcion_producto: body.description,
                precio_unitario: body.price,
                estado_producto: body.state || 'DISPONIBLE',
                rango: body.rank || '4.0',
                tamano: body.productSize,
                tipo_producto: body.productType,
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