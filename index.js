//vamos a requerir el dotenv para las variables de entorno
require("dotenv").config();
//requerimos la conexion
require("./mongo");
const express = require("express");
const mongoose = require("mongoose");
//requerimos el modelo de los datos del paciente

//compartir recursos de distintos origenes, podemos decidir que origenes acceden a nuestro recurso
const cors = require("cors");
const usersRouter = require("./Controlellers/users");
const loginRouter = require("./Controlellers/login");
const bodyParser = require("body-parser");
const notFound = require("./middlewares/notFound");
const handleErrors = require("./middlewares/handleErrors");
const User = require("./models/user");
const jwt = require("jsonwebtoken");

const app = express();

//middlewares: son funciones que interceptan las peticiones (use se refiere a cualquier peticion) y se ejecutan en orden de arriba ajajo y evalua como se requieren los recursos y se aplican si encajan, por ejemplo en un get, post, y asi. muy util para los 404

app.use(
  cors({
    origin: "*",
  })
);
//para soportar lo que viene en la request y parsearlo
app.use(express.json());
//no se si es necesario esto
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: "true" }));

//middlewares. es muy importante el orden de los middlewares. los de errores están al final para que se llamen luego de pasar por todos los endspoints
//para los controladores de las cuenta de usuario
app.use("/api/users", usersRouter);
//para el logeo
app.use("/api/login", loginRouter);

//para el 404, si no entra en inguno de los enndpoint que definimos, que nos de un 404
app.use(notFound);
// middleware para el manejo de errores que recibe tres parametros el primero es el error, si hay error en alguna de las peticiones entra aca
app.use(handleErrors);

//configuramos el puerto para que se utilice una variable de entorno llamada PORT, que está en .env, si no existe esa variable se utiliza 3001
const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});

module.exports = app;
