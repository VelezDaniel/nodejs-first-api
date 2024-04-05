import { Router } from "express";
import { succes, error } from '../../network/response.js'
import ctrl from './index.js';
// import { utilities as authIndex } from "../../auth/index.js";
// import { validateSchema } from "../../middleware/validator.middleware.js";
// import { registerSchema } from "../../schemas/auth.schema.js";

const router = Router();

async function getRoles(req, res) {
    try {
        const items = await ctrl.allData();
        succes(req, res, items, 200);
    } catch (err) {
        console.log('error: ', err);
        error(req, res, err, 500);
    }
}

async function insertRegisterRole(req, res) {
    try {
        const result = await ctrl.insertRegisterRole(req.body)
        succes(req, res, result, 200);
    } catch (err) {
        console.log('Error in routes:  ', err);
    }
}

router.get('/', getRoles);
router.post('/', insertRegisterRole);
export default router;

