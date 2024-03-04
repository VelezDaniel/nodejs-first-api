import { Router, json } from "express";
import { succes, error } from '../../network/response.js'
import ctrl from './index.js';
import { utilities as authIndex } from "../../auth/index.js";

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
            // const token = await authIndex.createAccessToken({id: WAIT})
            // res.cookie("token", token);
            message = 'Data saved succesfully';
        } else {
            message = 'Data updated succesfully';
        }
        succes(req, res, message, 201);
    } catch (err) {
        next(err);
    }
};

async function deleteData(req, res,) {
    try {
        const items = await ctrl.deleteData(req.params.id);
        succes(req, res, items, 200);
    } catch (err) {
        error(req, res, err, 500);
    }
};

async function deleteDataBody(req, res, next) {
    try {
        const items = await ctrl.deleteDataBody(req.body);
        succes(req, res, 'Information deleted succesfully', 200);
    } catch (err) {
        next(err);
    }
};

async function registerClient(req, res) {
    try {
        const items = await ctrl.registerClient(req.body);
        succes(req, res, items, 201);
    } catch (error) {
        throw new Error(error);
    }
};

router.get('/', allData);
router.get('/:id', specificData);
// router.post('/', addData);
router.post('/', registerClient);
router.delete('/:id', deleteData);
router.delete('/', deleteDataBody);

export default router;

