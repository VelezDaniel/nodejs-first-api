// import { methods as db } from "../../database/mysql";
const TABLE = 'RESERVACION';
const FIELD = 'ID_RESERVACION';
export function methods(dbInyected) {

    let db = dbInyected;

    if (!db) {
        db = require('../../database/mysql.js');
    }

    const allData = async () => {
        try {
            const results = await db.allBookings(TABLE);
            if (Array.isArray(results)) {
                const bookings = results.map(result => ({
                    id: result.ID_RESERVACION,
                    attendees: result.NUMERO_ASISTENTES,
                    datetime: result.FECHA_RESERVACION,
                    description: result.DESCRIPCION_RESERVA,
                    hiddenDescription: result.DESCRIPCION_OCULTA,
                    idClient: result.ID_PERSONA,
                    identityClient: result.IDENTIFICACION,
                    nameClient: result.NOMBRE_COMPLETO,
                }));
                return bookings;
            } else {
                throw new Error('No se obtuvieron datos de la tabla seleccionada');
            }
        } catch (error) {
            console.log('error in bookings BK: ', error)
        }
    }

    const userAllBooks = async () => {
        try {
            const results = await db.userBookings(TABLE);
            if (Array.isArray(results)) {
                const bookings = results.map(result => ({
                    id: result.ID_RESERVACION,
                    attendees: result.NUMERO_ASISTENTES,
                    dateBook: result.FECHA_RESERVACION,
                    timeBook: result.HORA_RESERVACION,
                    description: result.DESCRIPCION_RESERVA,
                }));
                return bookings;
            } else {
                throw new Error('No se obtuvieron datos de la tabla seleccionada');
            }
        } catch (error) {
            console.log('error in bookings BK: ', error)
        }
    }

    const addData = (body) => {
        let data = {
            id: body.id,
            info: {
                NUMERO_ASISTENTES: body.attendees,
                FECHA_RESERVACION: body.dateBook,
                HORA_RESERVACION: body.timeBook,
                DESCRIPCION_RESERVA: body.description,
                DESCRIPCION_OCULTA: body.hiddenDescription || null,
                FK_ID_USUARIO: body.idClient || null,
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
        userAllBooks,
        specificData,
        addData,
        deleteData
    }
}