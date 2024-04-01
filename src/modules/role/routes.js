import { Router } from "express";
import { succes, error } from '../../network/response.js'
import ctrl from './index.js';
// import { utilities as authIndex } from "../../auth/index.js";
// import { validateSchema } from "../../middleware/validator.middleware.js";
// import { registerSchema } from "../../schemas/auth.schema.js";

const router = Router();

async function getRoles(req, res,) {
    try {
        const items = await ctrl.allData();
        succes(res, res, items, 200);
    } catch (err) {
        console.log('error: ', err);
        error(res, res, err, 500);
    }
}

router.get('/', getRoles);

export default router;

