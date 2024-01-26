import { Router } from "express";
import { succes, error } from '../../network/response.js'
import ctrl from './index.js';

const router = Router();

const updateDataNew = async (req, res, next) => {
    let message;
    try {
        if(req.body.user > 0){
            const items = await ctrl.updateDataNew(req.body);
            message = 'Data save succesfully';
            succes(req, res, message, 201);
        } else {
            throw new Error({message: "Information not updated"});
        }
    } catch (err) {
        next(err);
    }
};


// ? Defaul code VIDEO
// const addData = async (req, res, next) => {
//     let message;
//     try {
//         const items = await ctrl.addData(req.body);
//         if(req.body.id == 0){
//             message = 'Data save succesfully';
//         } else {
//             message = 'Data updated succesfully';
//         }
//         succes(req, res, message, 201);
//     } catch (err) {
//         next(err);
//     }
// };

// const allData = async (req, res, next) => {
//     try {
//         const items = await ctrl.allData();
//         succes(req, res, items, 200);
//     } catch (err) {
//         next(err);
//     }
// };

async function specificData(req, res, next) {
    try {
        const items = await ctrl.specificData(req.params.nameId, req.params.id);
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

// const addData = async (req, res, next) => {
//     let message;
//     try {
//         const items = await ctrl.addData(req.body);
//         if(req.body.id == 0){
//             message = 'Data save succesfully';
//         } else {
//             message = 'Data updated succesfully';
//         }
//         succes(req, res, message, 201);
//     } catch (err) {
//         next(err);
//     }
// };

// async function deleteData(req, res,) {
//     try {
//         const items = await ctrl.deleteData(req.params.nameId, req.params.id);
//         succes(req, res, items, 200);
//     } catch (err) {
//         error(req, res, err, 500);
//     }
// };

// async function deleteDataBody(req, res, next) {
//     try {
//         const items = await ctrl.deleteDataBody(req.body);
//         succes(req, res, 'Information deleted succesfully', 200);
//     } catch (err) {
//         next(err);
//         // next() -- Express fun
//     }
// };

// router.get('/', allData);
router.get('/login', login);
router.post('/', updateDataNew);
// router.delete('/:id', deleteData);
// router.delete('/', deleteDataBody);

export default router;

