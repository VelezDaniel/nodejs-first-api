import { Router } from "express";
import { succes, error } from '../../network/response.js'
import ctrl from './index.js';
import checkAuth from "../../auth/security.js";

const router = Router();

// ! no usado
const allData = async (req, res, next) => {
    try {
        const items = await ctrl.allData();
        succes(req, res, items, 200);
    } catch (err) {
        next(err);
    }
};

const allUsers = async (req, res, next) => {
    try {
        const items = await ctrl.allUsers();
        console.log(items);
        succes(req, res, items, 200);
    } catch (error) {
        next(err);
    }
}

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
        if(req.body.id > 0){
            const items = await ctrl.addData(req.body, req.method);
            message = 'Data save succesfully';
        } else {
            message = 'Bad request. Try Again';
            throw new Error({message: "Invalid ID"});
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
        console.log(err);
        // next() -- Express fun
    }
};

router.get('/', allUsers);
router.get('/:id', specificData);
// Añadir un usuario que no ha sido registrado antes como usuario
router.post('/', addData);
// Cuando el usuario registrado desee actualizar sus datos
router.patch('/', checkAuth(), addData);
router.delete('/:id', deleteData);
router.delete('/', checkAuth(), deleteDataBody);

export default router;