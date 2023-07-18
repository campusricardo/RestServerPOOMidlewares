const {Router} = require('express');
const {check} = require('express-validator');
const {validateDocuments} = require('../middlewares/validate.documents.js');
const Role = require('../models/role.js');
const {getUsers,postUsers,deleteUsers,putUsers,patchUsers} = require('../controllers/usuario.controllers.js');

const router = Router();

router.get("/", getUsers);

router.post("/", [
    check('nombre', 'Nombre no es valido').not().isEmpty(),
    check('password', 'Password debe ser minimo de 6 letras').isLength({min: 6}),
    check('email', 'El correo no es valio').isEmail(),
    check('rol').custom(async(rol= '')=>{
        const existeRol = await Role.findOne({rol});
        if(!existeRol){
            throw new Error(`El rol ${rol} no esta registrado en la base de datos`);
        }
    }),
    validateDocuments 
] ,postUsers);

router.delete("/", deleteUsers);

router.put("/", putUsers);

router.patch("/", patchUsers);


module.exports = router;