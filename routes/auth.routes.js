const {Router} = require('express');

const {check} = require('express-validator');
const { login } = require('../controllers/auth.controllers.js');
const { validateDocuments } = require('../middlewares/validate.documents.js');

const  router = Router();
 
router.post("/login",[
    check("email", "Email is required").isEmail(),
    check("password", "Password is required").not().isEmpty(),
    validateDocuments
], login );

module.exports = router;