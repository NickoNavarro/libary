const mongoose = require("mongoose")

const mongoDB = process.env.MONGODB_PROD

mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true})

const db = mongoose.connection

db.on('error',console.error.bind(console, 'Fallo conexion BD!!'))
db.once('open', () =>{
    console.log("Conectado")
})