import { Router } from "express";
import { succes, error } from '../../network/response.js'
// import security from '../../modules/user/security.js';
import checkAuth from "../../auth/security.js";
import authRequired from "../../middleware/validateToken.js";
import { validateSchema } from "../../middleware/validator.middleware.js";
import { loginSchema } from "../../schemas/auth.schema.js";
import ctrl from './index.js';

const router = Router();

const updateDataNew = async (req, res, next) => {
    let message;
    try {
        if (req.body.user > 0) {
            const items = await ctrl.updateDataNew(req.body, req.method);
            message = 'Data save succesfully';
            succes(req, res, { message, items }, 201);
        } else {
            throw new Error({ message: "Information not updated" });
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

async function login(req, res) {
    try {
        const { status, token, userProfile, message } = await ctrl.login(req.body.identity, req.body.password);
        if (status === 200) {
            res.cookie('token', token, { sameSite: 'None', secure: true });
            succes(req, res, userProfile, 200);
        } else {
            error(req, res, message, status);
        }

    } catch (err) {
        const errorsLogin = ['Error inesperado, ', err];
        error(req, res, errorsLogin, 500);
    }
};

const profile = async (req, res) => {
    try {
        const result = await ctrl.profile(req.user);
        succes(req, res, `Session active <Profile> -->>  ${result.name}`, 200);
    } catch (err) {
        console.log(err)
    }
}

async function logout(req, res, next) {
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

async function verifyToken(req, res, next) {
    try {
        // const item = await
        const token = req.cookies.token;
        if (!token) { return error(req, res, 'Token not found', 401) }
        const result = await ctrl.verifyToken(token);
        succes(req, res, result, 201);
        // next();
    } catch (error) {
        console.log('verifyToken function in routes: ', error)
    }
}

router.post('/login', validateSchema(loginSchema), login);
router.post('/verify', verifyToken);
router.post('/logout', logout);
router.post('/', updateDataNew);
// Recibe el token generado por medio de Bearer
router.patch('/', checkAuth(), updateDataNew);
router.get('/:id', specificData);
router.delete('/', deleteDataBody);
//- authRequired Conectato con base de datos - (se gnenera un registro del token y se elimina el mismo cuando se hace logout)
router.post('/profile', authRequired, profile);

export default router;