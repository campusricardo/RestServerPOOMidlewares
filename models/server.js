const express = require('express');
const cors = require('cors');
const {dbConnection} = require('../database/config.js');

class Server {

    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        this.usuariosPath = "/api/usuarios";
        // Conectar a base de datos MongoDB
        this.connectDB();
        //Middlewares
        this.middlewares();
        //Routing
        
        this.routes();

    }
    async connectDB() {
        await dbConnection();
    }
    middlewares() {
        //cors
        this.app.use(cors());

        // Leer y parsear JSON en BODY
        this.app.use(express.json());

        //public directory
        this.app.use(express.static('public'));
    }
    routes(){
        this.app.use(this.usuariosPath, require('../routes/usuario.routes.js'));
    }

    listen(){
        this.app.listen(this.port, ()=>{
            console.log(`SERVER RUNNING ON PORT: ${this.port}`);
        });
    };
}

module.exports = Server;