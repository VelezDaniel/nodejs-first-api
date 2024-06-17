import { Router } from "express";
import { succes, error } from '../../network/response.js'
import ctrl from './index.js';

const router = Router();

const allData = async (req, res, next) => {
    try {
        const items = await ctrl.allData();
        succes(req, res, items, 200);
    } catch (err) {
        next(err);
    }
};

const getOrders = async (req, res) => {
    try {
        const items = await ctrl.getOrders();

        if (items) {
            succes(req, res, items, 200);
        } else {
            error(req, res, "Error in router: ", 404);
        }
    } catch (error) {
        console.log(error)
    }
}

async function specificData(req, res) {
    try {
        if (!req.params.id) {
            return error(req, res, 'Item not foun', 404);
        }
        const items = await ctrl.specificData(req.params.id);
        succes(req, res, items, 200);
    } catch (err) {
        console.log(err)
        return error(req, res, err, 404);
    }
};

const addData = async (req, res, next) => {
    let message;
    try {
        const items = await ctrl.addData(req.body);

        if (req.body.id == 0) {
            message = 'Data saved succesfully';
        } else {
            message = 'Data updated succesfully';
        }
        succes(req, res, [message, items], 201);
    } catch (err) {
        next(err);
    }
};

const addOrder = async (req, res, next) => {
    let message = "true";
    try {
        const items = await ctrl.addOrder(req.body);
        succes(req, res, [message, items], 201);
    } catch (err) {
        next(err);
    }
}

const updateOrder = async (req, res, next) => {
    try {
        const result = await ctrl.updateOrder(req.body);
        if (result) {
            succes(req, res, true, 201);
        } else {
            error(req, res, false, 404);
        }
    } catch (error) {
        next(error);
    }
}

async function deleteData(req, res,) {
    try {
        if (!req.params.id) {
            return error(req, res, 'Item not foun', 404);
        }
        const items = await ctrl.deleteData(req.params.id);
        succes(req, res, 'Information deleted', 200);
    } catch (err) {
        error(req, res, err, 500);
    }
};

router.get('/', getOrders);
router.get('/:id', specificData);
router.post('/', addData);
router.post('/new-order', addOrder);
router.patch('/update-order', updateOrder);
router.delete('/:id', deleteData);

export default router;