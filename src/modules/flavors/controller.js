// import { methods as db } from "../../database/mysql";
const TABLE = 'SABOR';
const FIELD = 'ID_SABOR';
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
                const bookings = results.map(result => ({
                    id: result.ID_SABOR,
                    nameFlavor: result.NOMBRE_SABOR,
                    stateFlavor: result.ESTADO_SABOR,
                }));
                return bookings;
            } else {
                throw new Error('No se obtuvieron datos de la tabla seleccionada');
            }
        } catch (error) {
            console.log('error in flavors BK: ', error)
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