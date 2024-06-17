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

async function specificData(req, res, next) {
    try {
        if(!req.params.id) {
            return error(req, res, 'Item not foun', 404);
        }
        const items = await ctrl.specificData(req.params.id);
        succes(req, res, items, 200);
    } catch (err) {
        next(err);
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

async function deleteData(req, res,) {
    try {
        if(!req.params.id) {
            return error(req, res, 'Item not foun', 404);
        }
        const items = await ctrl.deleteData(req.params.id);
        succes(req, res, 'Information deleted', 200);
    } catch (err) {
        error(req, res, err, 500);
    }
};

router.get('/', allData);
router.get('/:id', specificData);
router.post('/', addData);
router.delete('/:id', deleteData);

export default router;

