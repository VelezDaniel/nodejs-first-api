import { Router } from "express";
import { succes, error } from '../../network/response.js'
import security from '../../modules/user/security.js';
import ctrl from './index.js';

const router = Router();

const updateDataNew = async (req, res, next) => {
    let message;
    try {
        if(req.body.user > 0){
            const items = await ctrl.updateDataNew(req.body, req.method);
            message = 'Data save succesfully';
            succes(req, res, message, 201);
        } else {
            throw new Error({message: "Information not updated"});
        }
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

async function login (req, res, next) {
    try {
        const token = await ctrl.login(req.body.user, req.body.password);
        succes(req, res, token, 200);
    } catch (err) {
        next(err);
    }
};

async function deleteDataBody(req, res, next) {
    try {
        const items = await ctrl.deleteDataBody(req.body);
        succes(req, res, 'Information deleted succesfully', 200);
    } catch (err) {
        next(err);
        // next() -- Express fun
    }
};

router.get('/login', login);
router.post('/', updateDataNew);
router.patch('/', security(), updateDataNew);
router.get('/:id', specificData);
router.delete('/', deleteDataBody);
router.post('/login/user', ctrl.logIn);

export default router;