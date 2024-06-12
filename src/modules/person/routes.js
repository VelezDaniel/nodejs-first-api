import { Router, json } from "express";
import { succes, error } from '../../network/response.js'
import ctrl from './index.js';
import { utilities as authIndex } from "../../auth/index.js";
import { validateSchema } from "../../middleware/validator.middleware.js";
import { registerSchema } from "../../schemas/auth.schema.js";

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

            message = 'Data saved succesfully';
        } else {
            message = 'Data updated succesfully';
        }
        console.log("items in addData Back", items)
        succes(req, res, message, 201);
    } catch (err) {
        next(err);
    }
};

async function deleteData(req, res) {
    try {
        const items = await ctrl.deleteData(req.params.id);
        succes(req, res, items, 200);
    } catch (err) {
        error(req, res, err, 500);
    }
};

// async function deleteDataBody(req, res, next) {
//     try {
//         const items = await ctrl.deleteDataBody(req.body);
//         succes(req, res, 'Information deleted succesfully', 200);
//     } catch (err) {
//         next(err);
//     }
// };

async function registerClient(req, res) {
    try {
        const items = await ctrl.registerClient(req.body);
        console.log('items: ', items);
        // const resultItems = {
        //     user: items.body,
        // }
        if (items === false) {
            // res.status(409).json(["El usuario ya existe"]);
            succes(req, res, ["El usuario ya existe"], 409);
        } else {
            succes(req, res, items, 201);
        }
    } catch (err) {
        console.log(err);
        error(req, res, err, 500);
    }
};

router.get('/', allData);
router.get('/:id', specificData);
router.patch('/', addData);
router.post('/', validateSchema(registerSchema), registerClient);
router.post('/complete', registerClient);
router.post('/newperson', addData);
router.delete('/:id', deleteData);
// router.delete('/', deleteDataBody);

export default router;
