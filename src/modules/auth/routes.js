import { Router, json } from "express";
import { succes, error } from '../../network/response.js'
import security from '../../modules/user/security.js';
import { authRequired } from "../../middleware/validateToken.js";
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
        res.cookie('token', token, {sameSite: 'None', secure: true});
        // console.log(req.cookies);
        succes(req, res, 'Log in succed', 200);
    } catch (err) {
        error(req, res, err, 404);
    }
};

async function logout (req, res, next) {
    try {
        res.cookie('token', "", {
            expires: new Date(0)
        })
        const deleteToken = await ctrl.logout(req.body);
        succes(req, res, deleteToken, 200);
    } catch (err) {
        error(req, res, err, 404);
    }
}

async function deleteDataBody(req, res, next) {
    try {
        const items = await ctrl.deleteDataBody(req.body);
        succes(req, res, 'Information deleted succesfully', 200);
    } catch (err) {
        next(err);
        // next() -- Express fun
    }
};

router.post('/login', login);
router.post('/logout', logout);
router.post('/', updateDataNew);
router.patch('/', security(), updateDataNew);
router.get('/:id', specificData);
router.delete('/', deleteDataBody);
router.post('/profile', authRequired, ctrl.profile);

export default router;