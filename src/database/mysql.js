import mysql from 'mysql2'
import config from "../config.js";

const dbConfig = {
    host: config.mysql.host,
    user: config.mysql.user,
    password: config.mysql.password,
    database: config.mysql.database
}

let pool;

const createPool = () => {
    pool = mysql.createPool(dbConfig);
    console.log('DB pool connected');
}

createPool();
// ! not working in production
// let connection;

// const connectionMysql = () => {
//     connection = mysql.createConnection(dbConfig);
//     connection.connect((err) => {
//         if (err) {
//             console.log('[dbConfig]', dbConfig);
//             console.log('[DB Error]', err);
//             // setTimeout(connectionMysql, 200);
//         } else {
//             console.log(' DB connected');
//         }
//     });

    // connection.on('error', err => {
    //     console.log('[DB error]', err);
    //     if (err.code === 'PROTOCOL_CONNECTION_LOST') {
    //         connectionMysql();
    //     } else {
    //         throw err;
    //     }
    // });
// }

// connectionMysql();

// Mostrar todos los datos de una tabla
const allData = (table) => {
    return new Promise((resolve, reject) => {
        pool.query(`SELECT * FROM ${table}`, (error, result) => {
            return error ? reject(error) : resolve(result);
        });
    });
}

// Mostrar un dato especifico
const specificData = (table, field, id) => {
    return new Promise((resolve, reject) => {
        pool.query(`SELECT * FROM ${table} WHERE ${field} = ${id}`, (error, result) => {
            return error ? reject(error) : resolve(result);
        });
    });
}

const updateDataNew = (table, field, data) => {
    return new Promise((resolve, reject) => {

        const keys = Object.keys(data.info);
        const setClause = keys.map(key => `${key} = IFNULL(?, ${key})`).join(', ');

        const query = `UPDATE ${table} SET ${setClause} WHERE ?? = ?`;
        const values = keys.map(key => data.info[key]).concat([field, data.id]);

        // const values = [data.info.identificacion, data.info.nombre, data.info.apellido, data.info.direccion, data.info.celular, field, data.id];

        const result = pool.query(query, values, (error, result) => {
            return error ? reject(error) : resolve(result);
        });
        // console.log(result);
    });
}

const insertData = (table, data) => {
    return new Promise((resolve, reject) => {
        pool.query(`INSERT INTO ${table} SET ?`, data.info, (error, result) => {
            return error ? reject(error) : resolve(result);
        });
    });
}

// Agregar un dato sea actualizar(updateDataNew) o uno nuevo (insertData)
const addData = (table, field, data) => {

    if (data) {
        if (data.id == 0) {
            return insertData(table, data);
        } else {
            return updateDataNew(table, field, data);
        }
    } else {
        throw new Error('Data not found');
    }
}

// #  Use URL request # 
const deleteData = (table, nameId, id) => {
    return new Promise((resolve, reject) => {
        pool.query(`DELETE FROM ${table} WHERE ${nameId}= ${id}`, (error, result) => {
            return error ? reject(error) : resolve(result);
        });
    });
}

//  #  Use req.body # 
const deleteDataBody = (table, field, data) => {
    const id = data.id;
    return new Promise((resolve, reject) => {
        pool.query(`DELETE FROM ?? WHERE ??= ?`, [table, field, id], (error, result) => {
            return error ? reject(error) : resolve(result);
        });
    });
}

const query = async (table, field, ask) => {
    try {
        const result = await new Promise((resolve, reject) => {
            pool.query(`SELECT * FROM ${table} WHERE ${field} = ?`, ask, (error, result) => {
                return error ? reject(error) : resolve(result);
            });
        });

        return result.length > 0 ? result[0] : null;
    } catch (error) {
        throw error;
    }
}

// Obtener todos los datos del usuario que se ha logueado.
const userProfile = async (ident) => {
    const result = await new Promise((resolve, reject) => {
        pool.query(`SELECT * FROM PERSONA JOIN USUARIO ON PERSONA.ID_PERSONA = USUARIO.ID_USUARIO WHERE PERSONA.IDENTIFICACION = ?`, ident, (error, result) => {
            return error ? reject(error) : resolve(result);
        });
    });

    if (result.length > 0) {
        const userFound = result[0];
        const profileUser = {
            id: userFound.ID_PERSONA,
            identity: userFound.IDENTIFICACION,
            name: userFound.NOMBRE,
            lastName: userFound.APELLIDO,
            address: userFound.DIRECCION,
            phone: userFound.CELULAR,
            email: userFound.CORREO,
            state: userFound.ESTADO_USUARIO,
            birth: userFound.NACIMIENTO,
            role: userFound.FK_ID_REGISTRO_ROL
        }

        return profileUser;

    } else {
        return null;
    }
    // return result.length > 0 ? result[0] : null;
}

// ? Metodos especificos para registrar un usuario
// Obtener persona (estricto para metodo REGISTER)
const getPersonData = async (table, field, data) => {
    return new Promise((resolve, reject) => {
        pool.query(`SELECT * FROM ${table} WHERE ${field} = ?`, data.identity, (error, result) => {
            console.log(result)
            return error ? reject(error) : resolve(result);
        });
    });
}

// En caso de ya existir los datos del usuario se acualiza la tabla persona y se guardan los datos que hayan cambiado, excepto identificacion, id, fecha de nacimiento.
const updateInsertPersonData = async (table, field, data, existingPerson) => {
    const information = existingPerson[0];
    console.log(information);

    const infoData = {
        id: information.ID_PERSONA,
        info: {
            nombre: data.name,
            apellido: data.lastName,
            celular: data.phone,
            direccion: data.address,
            CORREO: data.email,
        }
    }
    const returnResult = await updateDataNew(table, field, infoData);
    const lastInsertId = returnResult.insertId;
    const resultRole = await insertData("REGISTRO_ROL", { id: 0, info: { FK_ID_ROL: 3 } });
    const lastInsertIdRole = resultRole.insertId;
    console.log('RESULTS update, and role')
    console.log(returnResult)
    console.log(resultRole);

    const user = existingPerson[0];
    // let role = resultRole[2];
    const getIdRole = await specificData('REGISTRO_ROL', 'ID_REGISTRO_ROL', lastInsertIdRole);
    const role = getIdRole[0];
    console.log(role);
    console.log(getIdRole)
    const userData = {
        id: user.ID_PERSONA,
        info: {
            ID_USUARIO: user.ID_PERSONA,
            ESTADO_USUARIO: "ACTIVO",
            FK_ID_REGISTRO_ROL: role.ID_REGISTRO_ROL
        }
    };

    const showInfo = await insertData("usuario", userData);
    console.log(showInfo);
    return returnResult;
}

// Agregar una nueva persona desde 0 a la tabla PERSONA
const insertPersonData = async (table, data) => {
    const infoData = {
        info: {
            identificacion: data.identity,
            nombre: data.name,
            apellido: data.lastName,
            celular: data.phone,
            direccion: 'Direccion no ingresada',
            CORREO: data.email,
            NACIMIENTO: data.birth
        }
    }
    // Insertar en tabla persona
    const personInfo = await insertData(table, infoData);
    const lastInsertId = personInfo.insertId;
    const getIdPerson = await specificData('PERSONA', 'ID_PERSONA', lastInsertId);
    const person = getIdPerson[0];
    // Insertar en tabla rol
    const resultRole = await insertData("REGISTRO_ROL", { info: { FK_ID_ROL: 3 } });
    const lastInsertIdRole = resultRole.insertId;
    const getIdRole = await specificData('REGISTRO_ROL', 'ID_REGISTRO_ROL', lastInsertIdRole);
    const role = getIdRole[0];

    // Objeto para insertar en USUARIO
    const userData = {
        id: person.ID_PERSONA,
        info: {
            ID_USUARIO: person.ID_PERSONA,
            ESTADO_USUARIO: "ACTIVO",
            FK_ID_REGISTRO_ROL: role.ID_REGISTRO_ROL
        }
    };

    // Insercion en usuario
    const resultUser = await insertData("USUARIO", userData);
    console.log(resultUser)
    return personInfo;
}

// Methodo principal para registro de usuarios.
const registerClient = async (table, field, data) => {
    try {
        const existingPerson = await getPersonData(table, 'IDENTIFICACION', data);
        console.log(existingPerson);
        const existingUser = await specificData('auth', 'user_auth', data.identity);
        let result;
        let returnResult;
        let idInserted;

        //  ! REVISAR
        if (existingUser.length > 0) {
            return false;
        } else {
            if (existingPerson.length > 0) {
                result = await updateInsertPersonData(table, field, data, existingPerson);
                idInserted = result.insertId;
                returnResult = await specificData(table, field, idInserted)
            } else {
                result = await insertPersonData(table, data);
                idInserted = result.insertId;
                returnResult = await specificData(table, field, idInserted);
            }
            console.log(result);
            console.log(returnResult);
            return returnResult;
        }

    } catch (error) {
        console.log(error)
    }
}

export const methods = {
    allData,
    specificData,
    addData,
    updateDataNew,
    insertData,
    deleteData,
    deleteDataBody,
    query,
    userProfile,
    registerClient
}