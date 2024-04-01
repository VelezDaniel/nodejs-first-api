// import { methods as db } from "../../database/mysql";
const TABLE = 'ROL';
const FIELD = 'ID_ROL';
export function methods(dbInyected) {

    let db = dbInyected;

    if (!db) {
        db = require('../../database/mysql.js');
    }

    // const allData = () => {
    //     const results = db.allData(TABLE);
    //     console.log('results: ', results);
    //     const roles = results.map(result => ({
    //         idRole: result.ID_ROL,
    //         nameRole: result.NOMBRE_ROL
    //     }));
    //     return roles;
    // }


    const allData = async () => {
        try {
            const results = await db.allData(TABLE);
            if (Array.isArray(results)) {
                const roles = results.map(result => ({
                    idRole: result.ID_ROL,
                    nameRole: result.NOMBRE_ROL
                }));
                return roles;
            } else {
                throw new Error('No se obtuvieron datos de la tabla ROL');
            }
        } catch (error) {
            console.error('Error al obtener roles:', error);
            throw error;
        }
    }    

    return {
        allData,
    }
}