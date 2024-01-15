import mysql from 'mysql'
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
        if(err) {
            console.log('[DB Error]', err);
            setTimeout(connectionMysql, 200);
        } else {
            console.log(' DB connected');
        }
    });

    connection.on('error', err => {
        console.log('[DB error]', err);
        if(err.code === 'PROTOCOL_CONNECTION_LOST') {
            connectionMysql();
        } else {
            throw err;
        }
    });
}

connectionMysql();

const allData = (table) => {
    return new Promise( (resolve, reject) => {
        connection.query(`SELECT * FROM ${table}`, (error, result) => {
            return error ? reject(error) : resolve(result);
        });
    });
}

const specificData = (table, nameId, id) => {
    return new Promise( (resolve, reject) => {
        connection.query(`SELECT * FROM ${table} WHERE ${nameId} = ${id}`, (error, result) => {
            return error ? reject(error) : resolve(result);
        });
    });
}

const updateData = (table, data) =>{
    return new Promise((resolve, reject) =>{
        connection.query(`UPDATE ${table} SET ? WHERE ?? = ?`, [data.info, data.nameId, data.id], (error, result) =>{
            return error ? reject(error) : resolve(result);
        });
    });
}

const insertData = (table, data) => {
    return new Promise((resolve, reject) => {
        connection.query(`INSERT INTO ${table} SET ?`, data.info, (error, result) => {
            return error ? reject(error) : resolve(result);
        });
    });
}

const addData = (table, data) => {
    if(data && data.id == 0){
        return insertData(table, data);
    } else {
        return updateData(table, data);
    }
}

// #  Use URL request # 
const deleteData = (table, nameId, id) => {
    return new Promise( (resolve, reject) => {
        connection.query(`DELETE FROM ${table} WHERE ${nameId}= ${id}`, (error, result) => {
            return error ? reject(error) : resolve(result);
        });
    });
}

//  #  Use req.body # 
const deleteDataBody = (table, data) => {
    const nameId = data.nameId;
    const id = data.id;
    return new Promise( (resolve, reject) => {
        connection.query(`DELETE FROM ?? WHERE ??= ?`, [table, nameId, id], (error, result) => {
            return error ? reject(error) : resolve(result);
        });
    });
}

export const methods = {
    allData,
    specificData,
    addData,
    deleteData,
    deleteDataBody
}