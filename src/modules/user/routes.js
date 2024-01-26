import { Router } from "express";
import { succes, error } from '../../network/response.js'
import ctrl from './index.js';
import security from './security.js';

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

// const insertData = async (req, res, next) => {
//     let message;
//     try {
//         if(req.body.id === 0){
//             const items = await ctrl.insertData(req.body);
//             message = 'Data save succesfully';
//         } else {
//             message = 'Bad request. Try Again';
//             throw new Error(message);
//         }
//         succes(req, res, message, 201);
//     } catch (err) {
//         next(err);
//     }
// };

// const updateData = async () => {
//     let message;
//     try {
//         if(req.body.id > 0){
//             const items = await ctrl.updateData(req.body);
//             message = 'Data Updated succesfully';
//         } else {
//             message = 'Bad request. Try Again';
//             throw new Error({message: message});
//         }
//         succes(req, res, message, 201);
//     } catch (err) {
//         next(err);
//     }
// }

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

router.get('/', allData);
router.get('/:id', specificData);
// router.post('/', insertData);
router.post('/', addData);
router.patch('/', security(), addData);
// router.patch('/', security(), updateData);
router.delete('/:id', deleteData);
router.delete('/', security, deleteDataBody);

export default router;

