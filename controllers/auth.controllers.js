const {response} = require('express');
const Usuario = require('../models/usuario.js');
const bcryptjs = require('bcryptjs');

const login = async(req, res=response) => {


    const {email, password, estado} = req.body;
    try {

    // Verificar si existe el email en la base de datos
    const emailExiste = await Usuario.findOne({email});

    if (!emailExiste){
        return res.status(400).json({
            msg: "Email not found"
        })
    }


    if (emailExiste.estado === false){
        return res.status(400).json({
            msg: "User unactive"
        })
    }

    const passwordValido = bcryptjs.compareSync(password,emailExiste.password);

    if (!passwordValido) {
        return res.status(400).json({
            msg: "El password no es correcto"
        })
    }

    res.json({
        msg: "Todo bien todo bien"
    })
    // Verificar si el usuario esta activo

    // Verificar si el password es correcto y coincide con la llave
    

    } catch (error) {
        console.log(error);
        return res.json({
            msg: "Datos insuficientes, contacte a servicio tecnico"
        });
    }


}

module.exports = {
    login
};