const express = require(`express`);
const router = express.Router();
const { check, validationResult } = require('express-validator');
const serviceAuth = require(`../service/auth`);

// Register a new user
// POST method
// URL '.../register'
// input JSON   id,
//              password
router.post(
    '/register',
    [
        check('id', 'Not a valid user ID').isString().not().isEmpty(),
        check('password', 'Not a valid password')
            .isString()
            .isLength({ min: 8 })
            .exists(),
    ],
    (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                status: 400,
                message: errors.array(),
            });
        }
        const { id, password } = req.body;
        serviceAuth
            .register(id, password)
            .then(data => {
                res.status(data.status).json(data);
                console.log(data);
            })
            .catch(err => {
                res.status(err.status).json(err);
                console.log(err);
            });
    }
);

// Login user
// POST method
// URL '.../login'
// input JSON   id,
//              password
router.post(
    '/login',
    [
        check('id', 'Not a valid user ID').isString().not().isEmpty(),
        check('password', 'Not a valid password')
            .isString()
            .isLength({ min: 8 })
            .exists(),
    ],
    (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                status: 400,
                message: errors.array(),
            });
        }
        const { id, password } = req.body;
        serviceAuth
            .login(id, password)
            .then(data => {
                res.header('x-auth-token', data.message).status(data.status).json({
                    success: data.success,
                    status: data.status,
                    message: `User logged in`,
                });
                console.log({
                    success: data.success,
                    status: data.status,
                    message: `User logged in`,
                });
            })
            .catch(err => {
                res.status(err.status).json(err);
                console.log(err);
            });
    }
);

router.get('/logout', (req, res)=>{
    const token = req.header('x-auth-token');
    console.log(token);
  serviceAuth.logout(token).then(data=>{
    res.header('x-auth-token', null);
    const token = req.header('x-auth-token');
    console.log(token);
    res.status(data.status).json(data);
    console.log(data);
  }).catch(err=>{
    res.status(err.status).json(err);
    console.log(err);
  })
})

module.exports = router;
