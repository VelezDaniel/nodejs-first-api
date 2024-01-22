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
            const items = await ctrl.addData(req.body);
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

// const updateData = async (req, res) =>{
//     // let message;
//     try {
//         const items = await ctrl.updatedData(req.body);
//         succes(req, res, items, 200);
//     } catch (err) {
//         error(req, res, err, 500);
//     }
// }

// const insertData = async (req, res, next) => {
//     // let message;
//     try {
//         const items = await ctrl.insertData(req.body);
//         succes(req, res, items, 200);
//     } catch (err) {
//         error(req, res, err, 500);
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
router.post('/', addData);
// router.post('/add', addData);
// router.patch('/', updateData);
router.delete('/:id', deleteData);
router.delete('/', deleteDataBody);

export default router;

