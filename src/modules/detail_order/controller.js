// import { methods as db } from "../../database/mysql";
const TABLE = 'DETALLE_PEDIDO';
const FIELD = 'ID_DETALLE_PEDIDO';
const FIELD2 = 'ESTADO_SAPOR';
export function methods(dbInyected) {

    let db = dbInyected;

    if (!db) {
        db = require('../../database/mysql.js');
    }

    const getOrders = async () => {
        try {
            const orders = await db.getAllOrders();
            console.log("orders: ", orders);

            const ordersMap = new Map();
            orders.forEach(row => {
                const {
                    ID_PEDIDO,
                    SUBTOTAL_PEDIDO,
                    FK_ID_PERSONA,
                    FK_ID_ESTADO_PEDIDO,
                    FK_ID_TIPO_ENTREGA,
                    FK_ID_DOMICILIO,
                    FK_ID_ESTADO_PAGO,
                    ID_PERSONA,
                    IDENTIFICACION,
                    NOMBRE,
                    APELLIDO,
                    DIRECCION,
                    CELULAR,
                    CORREO,
                    NACIMIENTO,
                    AREA_ENTREGA,
                    DESCRIPCION_ENTREGA,
                    COSTO_DOMICILIO,
                    DESCRIPCION_DOMICILIO,
                    DESCRIPCION_ESTADO_PEDIDO,
                    DESCRIPCION_ESTADO,
                    DETALLES_PEDIDO
                } = row;

                if (!ordersMap.has(ID_PEDIDO)) {
                    ordersMap.set(ID_PEDIDO, {
                        idOrder: ID_PEDIDO,
                        totalOrder: SUBTOTAL_PEDIDO,
                        client: {
                            idClient: ID_PERSONA,
                            identity: IDENTIFICACION,
                            name: NOMBRE,
                            lastName: APELLIDO,
                            address: DIRECCION,
                            phone: CELULAR,
                            email: CORREO,
                            birth: NACIMIENTO,
                            area: AREA_ENTREGA
                        },
                        deliveryDescription: DESCRIPCION_ENTREGA,
                        priceDelivery: COSTO_DOMICILIO,
                        descriptionOrderDelivery: DESCRIPCION_DOMICILIO,
                        stateOrderDelivery: DESCRIPCION_ESTADO_PEDIDO,
                        stateDescription: DESCRIPCION_ESTADO,
                        details: []
                    });
                }

                const order = ordersMap.get(ID_PEDIDO);
                const details = DETALLES_PEDIDO.split('||').map(detail => {
                    const [
                        idDetail,
                        productQuantity,
                        detailDescription,
                        totalProduct,
                        cutlery,
                        productName,
                        productDescription,
                        productPrice,
                        productState,
                        productRank,
                        productSize,
                        productType,
                        iceQuantity,
                        aditionsName,
                        flavorsName
                    ] = detail.split('::');

                    return {
                        idDetail,
                        productQuantity,
                        detailDescription,
                        totalProduct,
                        cutlery,
                        product: {
                            productName,
                            productDescription,
                            productPrice,
                            productState,
                            productRank,
                            productSize,
                            productType,
                            iceQuantity
                        },
                        aditionsName: aditionsName ? aditionsName.split(', ') : [],
                        flavorsName: flavorsName ? flavorsName.split(', ') : []
                    };
                });

                order.details.push(...details);
            });

            const finalOrders = Array.from(ordersMap.values());

            console.log(JSON.stringify(finalOrders, null, 2));

            return finalOrders;

        } catch (error) {
            console.log("Error en controller: ", error);
        }
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
                return { message: 'No se obtuvieron datos del pedido seleccionada' }
            }
        } catch (error) {
            console.log('error in details orders BK: ', error)
        }
    }

    const addData = (body) => {
        const data = {
            id: body.id,
            info: {
                CANTIDAD_PRODUCTO: body.quantity,
                DESCRIPCION_DETALLE: body.description,
                VALOR_TOTAL: body.totalValueProduct,
                CUBIERTOS: body.cutlery,
                FK_ID_PRODUCTO: body.idProduct,
            }
        }
        return db.addData(TABLE, FIELD, data);
    }

    const addOrder = (body) => { return db.insertOrderProcess(body) }

    const specificData = (id) => {
        return db.specificData(TABLE, FIELD, id);
    }

    function deleteData(id) {
        return db.deleteData(TABLE, FIELD, id);
    }

    return {
        getOrders,
        specificData,
        addData,
        deleteData,
        addOrder,
    }
}