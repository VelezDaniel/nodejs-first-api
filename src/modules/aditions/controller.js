// import { methods as db } from "../../database/mysql";
const TABLE = 'ADICION';
const FIELD = 'ID_ADICION';
export function methods(dbInyected) {

    let db = dbInyected;

    if (!db) {
        db = require('../../database/mysql.js');
    }

    const allData = async () => {
        try {
            const results = await db.allData(TABLE);
            if (Array.isArray(results)) {
                const aditions = results.map(result => ({
                    id: result.ID_ADICION,
                    nameAdition: result.NOMBRE_ADICION,
                    priceAdition: result.PRECIO_ADICION,
                    stateAdition: result.ESTADO_ADICION
                }));
                return aditions;
            } else {
                throw new Error('No se obtuvieron datos de la tabla seleccionada');
            }
        } catch (error) {
            console.log('error in aditions BK: ',error)
        }
    }

    const addData = (body) => {
        let data = {
            id: body.id,
            info: {
               NOMBRE_ADICION: body.nameAdition,
               PRECIO_ADICION: body.price,
               ESTADO_ADICION: body.stateAdition,
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