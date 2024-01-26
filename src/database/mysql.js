import mysql from 'mysql2'
import config from "../config.js";

const dbConfig = {
    host: config.mysql.host,
    user: config.mysql.user,
    password: config.mysql.password,
    database: config.mysql.database
}

let connection;

const connectionMysql = () => {
    connection = mysql.createConnection(dbConfig);
    connection.connect((err) => {
        if (err) {
            console.log('[DB Error]', err);
            setTimeout(connectionMysql, 200);
        } else {
            console.log(' DB connected');
        }
    });

    connection.on('error', err => {
        console.log('[DB error]', err);
        if (err.code === 'PROTOCOL_CONNECTION_LOST') {
            connectionMysql();
        } else {
            throw err;
        }
    });
}

connectionMysql();

const allData = (table) => {
    return new Promise((resolve, reject) => {
        connection.query(`SELECT * FROM ${table}`, (error, result) => {
            return error ? reject(error) : resolve(result);
        });
    });
}

const specificData = (table, field, id) => {
    return new Promise((resolve, reject) => {
        connection.query(`SELECT * FROM ${table} WHERE ${field} = ${id}`, (error, result) => {
            return error ? reject(error) : resolve(result);
        });
    });
}

// const updateData = (table, field, data) => {
//     return new Promise((resolve, reject) => {
//         connection.query(`UPDATE ${table} SET ? WHERE ?? = ?`, [data.info, field, data.id], (error, result) => {
//             return error ? reject(error) : resolve(result);
//         });
//     });
// }

// ? FUNCIONA ESTE CODIGO
// const updateDataNew = (table, field, data) => {
//     return new Promise((resolve, reject) => {

//         const query = `UPDATE ${table} SET identificacion = IFNULL(?, identificacion), nombre = IFNULL(?, nombre), apellido = IFNULL(?, apellido), direccion = IFNULL(?, direccion), celular = IFNULL(?, celular) WHERE ?? = ?`;

//         const values = [data.info.identificacion, data.info.nombre, data.info.apellido, data.info.direccion, data.info.celular, field, data.id];

//         const result = connection.query(query, values, (error, result) => {
//             return error ? reject(error) : resolve(result);
//         });
//         console.log(result);
//     });
// }

const updateDataNew = (table, field, data) => {
    return new Promise((resolve, reject) => {

        const keys = Object.keys(data.info);
        const setClause = keys.map(key => `${key} = IFNULL(?, ${key})`).join(', ');

        const query = `UPDATE ${table} SET ${setClause} WHERE ?? = ?`;
        const values = keys.map(key => data.info[key]).concat([field, data.id]);

        // const values = [data.info.identificacion, data.info.nombre, data.info.apellido, data.info.direccion, data.info.celular, field, data.id];

        const result = connection.query(query, values, (error, result) => {
            return error ? reject(error) : resolve(result);
        });
        // console.log(result);
    });
}

const insertData = (table, data) => {
    return new Promise((resolve, reject) => {
        connection.query(`INSERT INTO ${table} SET ?`, data.info, (error, result) => {
            return error ? reject(error) : resolve(result);
        });
    });
}

const addData = (table, field, data) => {
    if (data && data.id == 0) {
        return insertData(table, data);
    } else {
        return updateDataNew(table, field, data);
    }
}

// #  Use URL request # 
const deleteData = (table, nameId, id) => {
    return new Promise((resolve, reject) => {
        connection.query(`DELETE FROM ${table} WHERE ${nameId}= ${id}`, (error, result) => {
            return error ? reject(error) : resolve(result);
        });
    });
}

//  #  Use req.body # 
const deleteDataBody = (table, field, data) => {
    const id = data.id;
    return new Promise((resolve, reject) => {
        connection.query(`DELETE FROM ?? WHERE ??= ?`, [table, field, id], (error, result) => {
            return error ? reject(error) : resolve(result);
        });
    });
}

// ! no se esta utilizando
const insertUser = (table, data) => {
    return new Promise((resolve, reject) => {
        connection.query(`INSERT INTO ${table} SET ? ON DUPLICATE KEY UPDATE ?`, [data.info, data.info], (error, result) => {
            return error ? reject(error) : resolve(result);
        });
    });
};

// ! no se esta utilizando
const insertDataUser = (table, data) => {
    return new Promise((resolve, reject) => {
        connection.query(`INSERT INTO ${table} SET ? ON DUPLICATE KEY UPDATE ?`, [data.info, data.info], (error, result) => {
            return error ? reject(error) : resolve(result);
        });
    });
};

const query = async (table, field, ask) => {
    try {
        const result = await new Promise((resolve, reject) => {
            connection.query(`SELECT * FROM ${table} WHERE ${field} = ?`,ask, (error, result) => {
                return error ? reject(error) : resolve(result);
            });
        });

        return result.length > 0 ? result[0] : null;
    } catch (error) {
        throw error;
    }
}

export const methods = {
    allData,
    specificData,
    addData,
    // updateData,
    updateDataNew,
    insertData,
    deleteData,
    // insertUser,
    insertDataUser,
    deleteDataBody,
    query
}