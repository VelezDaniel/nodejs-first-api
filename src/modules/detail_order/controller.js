// import { methods as db } from "../../database/mysql";
const TABLE = 'DETALLE_PEDIDO';
const FIELD = 'ID_DETALLE_PEDIDO';
const FIELD2 = 'ESTADO_SAPOR';
export function methods(dbInyected) {

    let db = dbInyected;

    if (!db) {
        db = require('../../database/mysql.js');
    }

    const allData = async () => {
        try {
            const results = await db.allData(TABLE);
            if (Array.isArray(results)) {
                const ordersDetails = results.map(result => ({
                    id: result.ID_DETALLE_PEDIDO,
                    quantity: result.CANTIDAD_PRODUCTO,
                    description: result.DESCRIPCION_DETALLE,
                    totalProduct: result.VALOR_TOTAL,
                    idProduct: result.FK_ID_PRODUCTO,
                }));
                return ordersDetails;
            } else {
                throw new Error('No se obtuvieron datos de la tabla seleccionada');
            }
        } catch (error) {
            console.log('error in details orders BK: ', error)
        }
    }

    const addData = (body) => {
        let data = {
            id: body.id,
            info: {
                NOMBRE_SABOR: body.nameFlavor,
                ESTADO_SABOR: body.stateFlavor,
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