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

            const ordersMap = new Map();
            orders.forEach(row => {
                const {
                    ID_PEDIDO,
                    SUBTOTAL_PEDIDO,
                    TERMINADO,
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
                        finished: TERMINADO,
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
            return finalOrders;

        } catch (error) {
            console.log("Error en controller: ", error);
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

    const updateOrder = (body) => {
        let data = {
            id: body.idOrder,
            info: {}
        };
        switch (body.requiredAction) {
            case "STATE":
                data.info.FK_ID_ESTADO_PEDIDO = parseInt(body.row);
                break;
            case "PAYED":
                data.info.FK_ID_ESTADO_PAGO = parseInt(body.row);
                break;
            case "FINISHED":
                data.info.TERMINADO = parseInt(body.row);
                break;
            default:
                return false;
        }

        return db.addData("PEDIDO", "ID_PEDIDO", data);
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
        updateOrder,
    }
}