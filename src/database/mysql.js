import mysql from 'mysql2'
import config from "../config.js";

const dbConfig = {
    host: config.mysql.host,
    user: config.mysql.user,
    password: config.mysql.password,
    database: config.mysql.database,
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

    // console.log('products from backend: ', result);
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
            area: userFound.AREA_ENTREGA,
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
            area: userFound.AREA_ENTREGA,
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
            correo: data.email,
            area_entrega: data.area,
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

    if (isUser === true) {
        showInfo = await updateDataNew("usuario", "id_usuario", userData);
    } else {
        showInfo = await insertData("usuario", userData);
    }

    if (isUser === true && data.password) {
        pass = await bcrypt.hash(data.password.toString(), 5);

        const authInfo = {
            id: user.ID_PERSONA,
            info: {
                pass_auth: pass
            }
        }

        addPassword = await updateDataNew("auth", "id_auth", authInfo);
    }

    console.log('showInfo: ', showInfo);
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
            correo: data.email,
            nacimiento: data.birth,
            area_entrega: data.area,
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

    // if (isUser === true && data.password) {
    //     pass = await bcrypt.hash(data.password.toString(), 5);

    //     const authInfo = {
    //         id: user.ID_PERSONA,
    //         info: {
    //             pass_auth: pass
    //         }
    //     }

    //     addPassword = await updateDataNew("auth", "id_auth", authInfo);
    // }
    return personInfo;
}

// Methodo principal para registro de usuarios.
const registerClient = async (table, field, data) => {
    try {
        let existingUser;
        let existingAuth;
        let isUser = false;

        // if(data.id && data.id === 0){
        //     const isRegistered =  await getPersonData(table, 'IDENTIFICACION', data.identity);
        //     console.log("isregistered: ", isRegistered);

        // }

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

        if ((existingPerson && existingPerson.length > 0) && data.accionRequestForm === "prevPayForm") {
            // Si solo el json con los datos enviados contiene un campo llamado "accionRequestForm" el condicional ejecutará unicamente esta acción
            const updateOnlyPerson = await updateDataNew(table, 'IDENTIFICACION', {
                id: existingPerson[0].IDENTIFICACION,
                info: {
                    NOMBRE: data.name,
                    APELLIDO: data.lastName,
                    DIRECCION: data.address,
                    CELULAR: data.phone,
                    NACIMIENTO: data.birth,
                    AREA_ENTREGA: data.area
                }
            })
            console.log("updateOnlyPerson ", updateOnlyPerson);
            return updateOnlyPerson;

        } else if (existingAuth && existingAuth.length > 0 && existingAuth[0].PASS_AUTH !== '') {
            return false;
        } else {
            if (existingPerson.length > 0 && existingUser.length < 1) {

                result = await updateInsertPersonData(table, field, data, existingPerson, isUser);
                idInserted = result.insertId;
                preReturnResult = await specificData(table, field, idInserted)
                console.log("preReturnResult ", preReturnResult)
                returnResult = {
                    id: preReturnResult[0].IDENTIFICACION,
                    name: preReturnResult[0].NOMBRE
                }
            } else if (existingPerson.length > 0 && existingUser.length > 0 && existingAuth[0].PASS_AUTH === '') {
                isUser = true;
                result = await updateInsertPersonData(table, field, data, existingPerson, isUser);
                idInserted = result.insertId;
                preReturnResult = await specificData(table, field, idInserted);
                console.log("preReturnResult missing only pass: ", preReturnResult)
                returnResult = {
                    id: existingPerson[0].IDENTIFICACION,
                    name: existingPerson[0].NOMBRE,
                    lastName: existingPerson[0].APELLIDO,
                    address: existingPerson[0].DIRECCION,
                    area: existingPerson[0].AREA_ENTREGA,
                }
            } else {
                result = await insertPersonData(table, data);
                idInserted = result.insertId;
                preReturnResult = await specificData(table, field, idInserted);
                returnResult = {
                    idClient: preReturnResult[0].ID_PERSONA,
                    identity: preReturnResult[0].IDENTIFICACION,
                    name: preReturnResult[0].NOMBRE,
                    lastName: preReturnResult[0].APELLIDO,
                    // address: preReturnResult[0].DIRECCION,
                    // area: preReturnResult[0].AREA_ENTREGA,
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

// const queryOrder = async (table, order) => {
//     return new Promise((resolve, reject) => {
//         pool.query(`INSERT INTO ${table} (ID_PEDIDO, SUBTOTAL_PEDIDO, FK_ID_PERSONA, FK_ID_ESTADO_PEDIDO, FK_ID_TIPO_ENTREGA, FK_ID_DOMICILIO, FK_ID_ESTADO_PAGO) VALUES (NULL, ?, ?, ?, ?, ?, ?)`, [order.info.SUBTOTAL_PEDIDO, order.info.FK_ID_PERSONA, order.info.FK_ID_ESTADO_PEDIDO, order.info.FK_ID_TIPO_ENTREGA, order.info.FK_ID_DOMICILIO, order.info.FK_ID_ESTADO_PAGO], (error, result) => {
//             return error ? reject(error) : resolve(result);
//         });
//     });
// }

// Funcion exclusiva para la generacion de pedidos
const insertOrderProcess = async (finalOrder) => {

    let finalOrderComplete;
    let idOrder;
    let resultOrderInsertion;

    console.log("Final order: In mysql", finalOrder);

    if ((finalOrder && finalOrder.fromLocal === true) || (finalOrder && finalOrder.client && finalOrder.client?.area == null)) {
        finalOrderComplete = {
            info: {
                SUBTOTAL_PEDIDO: finalOrder.totalPriceOrder,
                TERMINADO: null,
                FK_ID_PERSONA: parseInt(finalOrder.client.id),
                FK_ID_ESTADO_PEDIDO: 1,
                FK_ID_TIPO_ENTREGA: 2,
                FK_ID_DOMICILIO: null,
                FK_ID_ESTADO_PAGO: 2,
            }
        }
        console.log("finalOrderComplete condition 1: ", finalOrderComplete)

    } else if ((finalOrder && finalOrder.client) && (finalOrder.client.area !== null)) {
        const resultDelivery = await specificData("DOMICILIO", "ID_DOMICILIO", finalOrder.client.area);
        console.log(" ************** RESULT DELIVERY *******************",resultDelivery)
        const sumPrice = resultDelivery[0].COSTO_DOMICILIO + finalOrder.totalPriceOrder;

        finalOrderComplete = {
            info: {
                SUBTOTAL_PEDIDO: sumPrice,
                TERMINADO: null,
                FK_ID_PERSONA: parseInt(finalOrder.client.idClient || finalOrder.client.id || null),
                FK_ID_ESTADO_PEDIDO: 1,
                FK_ID_TIPO_ENTREGA: 1,
                FK_ID_DOMICILIO: resultDelivery[0].ID_DOMICILIO || null,
                FK_ID_ESTADO_PAGO: 2,
            }
        }
        console.log("finalOrderComplete condition 2: ", finalOrderComplete)
    } else {
        console.log("Client information is missing or invalid");
        return;
    }

    console.log("finalOrderComplete before insertion: ", finalOrderComplete)

    if (finalOrderComplete) {
        resultOrderInsertion = await insertData("pedido", finalOrderComplete);
        console.log("resulOrderinsertion: ", resultOrderInsertion);
    } else {
        console.log("final order is undefined or it doesn't exist");
        return;
    }

    if (resultOrderInsertion && resultOrderInsertion.insertId) {
        idOrder = resultOrderInsertion.insertId;

        console.log("resultOrderInsertion: ", resultOrderInsertion);
        console.log(finalOrder);

        // 2 - agregar cada item del carrito
        if (finalOrder.cart && Array.isArray(finalOrder.cart)) {
            const processCartElement = async (element) => {
                console.log("Processing cart element: ", element);

                const orderDetail = {
                    info: {
                        CANTIDAD_PRODUCTO: element.quantity,
                        DESCRIPCION_DETALLE: element.orderBody.description,
                        VALOR_TOTAL: element.price,
                        CUBIERTOS: element.orderBody.cutlery === true ? 1 : 0,
                        FK_ID_PRODUCTO: element.orderBody.productInfo.id,
                        FK_ID_PEDIDO: idOrder,
                    }
                };

                try {
                    const orderDetailResult = await insertData("detalle_pedido", orderDetail);
                    console.log("orderResult: ", orderDetailResult);

                    if (!orderDetailResult) {
                        throw new Error("Failed to insert order detail");
                    }

                    if (element.orderBody.aditions && element.orderBody.aditions.length > 0) {
                        const combineAditions = element.orderBody.aditions.map(adition => ({
                            id: adition.id,
                            quantity: element.orderBody.aditionQuantity[adition.id] || 0,
                        }));

                        await Promise.all(combineAditions.map(async (adition) => {
                            const aditionInfo = {
                                info: {
                                    CANTIDAD_ADICION: adition.quantity,
                                    FK_ID_ADICION: adition.id,
                                    FK_ID_DETALLE_PEDIDO: orderDetailResult.insertId,
                                }
                            };
                            const insertAditionsDetail = await insertData("adicion_detalle_pedido", aditionInfo);
                            console.log("insertAditionsDetail: ", insertAditionsDetail);
                        }));
                    }

                    if (element.orderBody.flavors && element.orderBody.flavors.length > 0) {
                        await Promise.all(element.orderBody.flavors.map(async (flavor) => {
                            const flavorInfo = {
                                info: {
                                    FK_ID_SABOR: flavor.id,
                                    FK_ID_DETALLE_PEDIDO: orderDetailResult.insertId,
                                }
                            };
                            const insertFlavorDetail = await insertData("sabor_detalle_pedido", flavorInfo);
                            console.log("insertFlavorDetail: ", insertFlavorDetail);
                        }));
                    }
                } catch (error) {
                    console.error("Error creating order: ", error);
                    throw error;
                }
            };

            await Promise.all(finalOrder.cart.map(processCartElement));
        } else {
            console.log("Cart is not defined or not an array");
            return;
        }
    }
}

const getAllOrders = () => {
    return new Promise((resolve, reject) => {
        pool.query(`WITH Adiciones AS 
    (SELECT ADICION_DETALLE_PEDIDO.FK_ID_DETALLE_PEDIDO, GROUP_CONCAT(CONCAT(ADICION.NOMBRE_ADICION, ' (', ADICION_DETALLE_PEDIDO.CANTIDAD_ADICION, ')') ORDER BY ADICION.NOMBRE_ADICION SEPARATOR ', ') AS NOMBRES_ADICIONES FROM ADICION_DETALLE_PEDIDO LEFT JOIN ADICION ON ADICION_DETALLE_PEDIDO.FK_ID_ADICION = ADICION.ID_ADICION GROUP BY ADICION_DETALLE_PEDIDO.FK_ID_DETALLE_PEDIDO), Sabores AS (SELECT SABOR_DETALLE_PEDIDO.FK_ID_DETALLE_PEDIDO, GROUP_CONCAT(SABOR.NOMBRE_SABOR ORDER BY SABOR.NOMBRE_SABOR SEPARATOR ', ') AS NOMBRES_SABORES FROM SABOR_DETALLE_PEDIDO LEFT JOIN SABOR ON SABOR_DETALLE_PEDIDO.FK_ID_SABOR = SABOR.ID_SABOR GROUP BY SABOR_DETALLE_PEDIDO.FK_ID_DETALLE_PEDIDO)SELECT PEDIDO.ID_PEDIDO, PEDIDO.SUBTOTAL_PEDIDO, PEDIDO.FK_ID_PERSONA, PEDIDO.FK_ID_ESTADO_PEDIDO, PEDIDO.FK_ID_TIPO_ENTREGA, PEDIDO.FK_ID_DOMICILIO, PEDIDO.FK_ID_ESTADO_PAGO, PERSONA.ID_PERSONA, PERSONA.IDENTIFICACION, PERSONA.NOMBRE, PERSONA.APELLIDO, PERSONA.DIRECCION, PERSONA.CELULAR, PERSONA.CORREO, PERSONA.NACIMIENTO, PERSONA.AREA_ENTREGA, TIPO_ENTREGA.DESCRIPCION_ENTREGA, DOMICILIO.COSTO_DOMICILIO, DOMICILIO.DESCRIPCION_DOMICILIO, ESTADO_PEDIDO.DESCRIPCION_ESTADO_PEDIDO, ESTADO_PAGO_PEDIDO.DESCRIPCION_ESTADO, GROUP_CONCAT(CONCAT(DETALLE_PEDIDO.ID_DETALLE_PEDIDO, '::', DETALLE_PEDIDO.CANTIDAD_PRODUCTO, '::', DETALLE_PEDIDO.DESCRIPCION_DETALLE, '::', DETALLE_PEDIDO.VALOR_TOTAL, '::', DETALLE_PEDIDO.CUBIERTOS, '::', PRODUCTO.NOMBRE_PRODUCTO, '::', PRODUCTO.DESCRIPCION_PRODUCTO, '::', PRODUCTO.PRECIO_UNITARIO, '::', PRODUCTO.ESTADO_PRODUCTO, '::', PRODUCTO.RANGO, '::', PRODUCTO.TAMANO, '::', PRODUCTO.TIPO_PRODUCTO, '::', PRODUCTO.CANTIDAD_HELADO, '::', COALESCE(Adiciones.NOMBRES_ADICIONES, ''), '::', COALESCE(Sabores.NOMBRES_SABORES, '')) SEPARATOR '||') AS DETALLES_PEDIDO FROM PEDIDO JOIN PERSONA ON PEDIDO.FK_ID_PERSONA = PERSONA.ID_PERSONA JOIN ESTADO_PEDIDO ON PEDIDO.FK_ID_ESTADO_PEDIDO = ESTADO_PEDIDO.ID_ESTADO_PEDIDO JOIN TIPO_ENTREGA ON PEDIDO.FK_ID_TIPO_ENTREGA = TIPO_ENTREGA.ID_TIPO_ENTREGA LEFT JOIN DOMICILIO ON PEDIDO.FK_ID_DOMICILIO = DOMICILIO.ID_DOMICILIO JOIN ESTADO_PAGO_PEDIDO ON PEDIDO.FK_ID_ESTADO_PAGO = ESTADO_PAGO_PEDIDO.ID_ESTADO_PAGO JOIN DETALLE_PEDIDO ON DETALLE_PEDIDO.FK_ID_PEDIDO = PEDIDO.ID_PEDIDO JOIN PRODUCTO ON DETALLE_PEDIDO.FK_ID_PRODUCTO = PRODUCTO.ID_PRODUCTO LEFT JOIN Adiciones ON DETALLE_PEDIDO.ID_DETALLE_PEDIDO = Adiciones.FK_ID_DETALLE_PEDIDO LEFT JOIN Sabores ON DETALLE_PEDIDO.ID_DETALLE_PEDIDO = Sabores.FK_ID_DETALLE_PEDIDO GROUP BY PEDIDO.ID_PEDIDO ORDER BY PEDIDO.ID_PEDIDO`, (error, result) => {
            if (error) {
                reject(error);
            } else {
                console.log("result allOrders: ", result);
                resolve(result);
            }
        });
    });
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
    registerClient,
    insertOrderProcess,
    getAllOrders,
}