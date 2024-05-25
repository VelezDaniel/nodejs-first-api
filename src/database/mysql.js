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
            if (error) {
                reject(error);
            } else {
                resolve(result);
            }
        });
    });
}

const allProducts = async (table) => {
    const result = await new Promise((resolve, reject) => {
        pool.query(`SELECT * FROM ${table}`, (error, result) => {
            return error ? reject(error) : resolve(result);
        });
    });

    console.log('products from backend: ', result);
    if (result.length > 0) {
        const products = result.map(productFound => ({
            id: productFound.ID_PRODUCTO,
            name: productFound.NOMBRE_PRODUCTO,
            description: productFound.DESCRIPCION_PRODUCTO,
            price: productFound.PRECIO_UNITARIO,
            state: productFound.ESTADO_PRODUCTO,
            rank: productFound.RANGO,
            productSize: productFound.TAMANO,
            productType: productFound.TIPO_PRODUCTO,
            amountBalls: productFound.CANTIDAD_HELADO,
        }));

        // Retorna arreglo de objetos con cada usuario
        return products;

    } else {
        return [];
    }
}

// Traer todos los usuarios
const allUsers = async () => {
    const result = await new Promise((resolve, reject) => {
        pool.query(`SELECT PERSONA.*, USUARIO.*, REGISTRO_ROL.*, ROL.NOMBRE_ROL, DATE_FORMAT(PERSONA.NACIMIENTO, '%Y-%m-%d') AS BIRTH, DATE_FORMAT(REGISTRO_ROL.FECHA_HORA_REGISTRO_ROL, '%Y-%m-%d %H:%i:%s') AS FECHA_ROL FROM PERSONA JOIN USUARIO ON PERSONA.ID_PERSONA = USUARIO.ID_USUARIO JOIN REGISTRO_ROL ON USUARIO.FK_ID_REGISTRO_ROL = REGISTRO_ROL.ID_REGISTRO_ROL JOIN ROL ON REGISTRO_ROL.FK_ID_ROL = ROL.ID_ROL`, (error, result) => {
            return error ? reject(error) : resolve(result);
        });
    });

    console.log('result from allUsers: ')
    console.log(result);

    if (result.length > 0) {
        const users = result.map(userFound => ({
            id: userFound.ID_PERSONA,
            identity: userFound.IDENTIFICACION,
            name: userFound.NOMBRE,
            lastName: userFound.APELLIDO,
            address: userFound.DIRECCION,
            phone: userFound.CELULAR,
            email: userFound.CORREO,
            state: userFound.ESTADO_USUARIO,
            birth: userFound.BIRTH,
            idUserRole: userFound.FK_ID_ROL,
            role: userFound.NOMBRE_ROL,
            dateRole: userFound.FECHA_ROL
        }));

        // Retorna arreglo de objetos con cada usuario
        return users;

    } else {
        return [];
    }
    // return result.length > 0 ? result[0] : null;
}

const allBookings = (table) => {
    return new Promise((resolve, reject) => {
        pool.query(`SELECT ${table}.*, PERSONA.ID_PERSONA, PERSONA.IDENTIFICACION, CONCAT(PERSONA.NOMBRE, ' ', PERSONA.APELLIDO) AS NOMBRE_COMPLETO, DATE_FORMAT(${table}.FECHA_RESERVACION, '%Y-%m-%d') AS FECHA FROM ${table} LEFT JOIN PERSONA ON ${table}.FK_ID_USUARIO = PERSONA.ID_PERSONA`, (error, result) => {
            if (error) {
                reject(error);
            } else {
                resolve(result);
            }
        });
    });
}

const userBookings = (table, userId) => {
    return new Promise((resolve, reject) => {
        pool.query(`SELECT ${table}.ID_RESERVACION, ${table}.NUMERO_ASISTENTES, ${table}.HORA_RESERVACION, ${table}.DESCRIPCION_RESERVA, DATE_FORMAT(${table}.FECHA_RESERVACION, '%Y-%m-%d') AS FECHA FROM ${table} WHERE FK_ID_USUARIO = ${userId}`, (error, result) => {
            if (error) {
                reject(error);
            } else {
                resolve(result);
            }
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
        const result = pool.query(query, values, (error, result) => {
            return error ? reject(error) : resolve(result);
        });
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
        pool.query(`SELECT PERSONA.*, USUARIO.*, REGISTRO_ROL.*, ROL.NOMBRE_ROL FROM PERSONA JOIN USUARIO ON PERSONA.ID_PERSONA = USUARIO.ID_USUARIO JOIN REGISTRO_ROL ON USUARIO.FK_ID_REGISTRO_ROL = REGISTRO_ROL.ID_REGISTRO_ROL JOIN ROL ON REGISTRO_ROL.FK_ID_ROL = ROL.ID_ROL WHERE PERSONA.IDENTIFICACION = ?`, ident, (error, result) => {
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
            idRole: userFound.FK_ID_ROL,
            role: userFound.NOMBRE_ROL,
            dateRole: userFound.FECHA_HORA_REGISTRO_ROL
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
const updateInsertPersonData = async (table, field, data, existingPerson, isUser) => {
    const information = existingPerson[0];
    let showInfo
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

    if (isUser) {
        showInfo = await updateDataNew("usuario", "id_usuario", userData);
    } else {
        showInfo = await insertData("usuario", userData);
    }
    console.log('showInfo: ',showInfo)
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
            direccion: data.address || 'N/A',
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
        let existingUser;
        let existingAuth;
        let isUser = false;
        const existingPerson = await getPersonData(table, 'IDENTIFICACION', data);
        console.log('ExistingPerson: ', existingPerson);
        if (existingPerson.length > 0) {
            existingUser = await specificData('usuario', 'id_usuario', existingPerson[0].ID_PERSONA);
            console.log('existingUser: ', existingUser);
            existingAuth = await specificData('auth', 'user_auth', data.identity);
            console.log('existingAuth: ', existingAuth);
        }
        let result;
        let preReturnResult;
        let idInserted;
        let returnResult;

        //  ! REVISAR
        if (existingAuth && existingAuth[0].PASS_AUTH != '') {
            return false;
        } else {
            if (existingPerson.length > 0 && existingUser.length < 1) {

                result = await updateInsertPersonData(table, field, data, existingPerson, isUser);
                idInserted = result.insertId;
                preReturnResult = await specificData(table, field, idInserted)
                returnResult = {
                    id: preReturnResult[0].IDENTIFICACION,
                    name: preReturnResult[0].NOMBRE
                }
            } else if (existingPerson.length > 0 && existingUser.length > 0 && existingAuth[0].PASS_AUTH === '') {
                isUser = true;
                result = await updateInsertPersonData(table, field, data, existingPerson, isUser);
                idInserted = result.insertId;
                preReturnResult = await specificData(table, field, idInserted);
                returnResult = {
                    id: existingPerson[0].IDENTIFICACION,
                    name: existingPerson[0].NOMBRE,
                }
            } else {
                result = await insertPersonData(table, data);
                idInserted = result.insertId;
                preReturnResult = await specificData(table, field, idInserted);
                returnResult = {
                    id: preReturnResult[0].IDENTIFICACION,
                    name: preReturnResult[0].NOMBRE
                }
            }
            console.log(result);
            console.log('preReturnResult: ', preReturnResult)
            console.log('returnResult: ', returnResult);
            return returnResult;
        }

    } catch (error) {
        console.log(error)
    }
}

export const methods = {
    allData,
    allUsers,
    allProducts,
    allBookings,
    userBookings,
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