//Definiendo ESQUEMAS

//Importamos Mongoose
const { handle } = require("express/lib/application")
const mongoose = require("mongoose")

//Definimos el esquema
const Schema = mongoose.Schema

//Nos creamos un esquema
const SomeModelSchema = new Schema({
    a_string: String,
    a_date: Date,
    name: String,
    binary: Buffer,
    living: Boolean,
    updated: {type: Date, default: Date.now()},
    age: {type: Number, min: 18, max: 65, required: true},
    mixed: Schema.Types.Mixed,
    _someId: Schema.Types.ObjectId,
    array: [],
    offString: [String],
    nested: {stuff: {type: String, lowercase: true, trim: true }}
})

//Nos creamos un modelo
const SomeModel = mongoose.model('SomeModel', SomeModelSchema)

//Otro esquema con validaciones y mensajes de error
const breakfastSchema = new Schema({
    eggs: {type: Number,
        min: [6, "Too few eggs"],
        max: 12,
        required: [true, "Why no eggs??"]
    },
    drink: {
        type: String,
        enum: ["beer","water","cola"]
    }
})


const SomeModelSchema2 = new Schema({
    name: String
})

//Crear un modelo
const SomeModel = mongoose.model("SomeModel", SomeModelSchema2)


//Creamos una instancia para crear un registro
const someModelInstance = new SomeModel({name: "awesome"})
//Guardar la instancia del modelo con callback
someModelInstance.save((err) => {
    if (err) return handleError(err)
})


//Definir la instancia y guardar al mismo tiempo
SomeModel.create({nombre: 'awesome'}, (err, someModelInstance) => {
    if (err) return handleError(err)
})

//Acceso a este nuevo registro añadido
conaole.log(someModelInstance.name)

//Si queremos hacer algún cambio hay que actualizar
someModelInstance.name = 'Pepe Martin'
someModelInstance.save((err) => {
    if (err) return handleError(err)
})

var Atletas = mongoose.model('Atletas',schema)

//Buscar registros
//Encontrar todos los atletas que juegan a tenis en la base de datos que existen por nombre y edad
Atletas.find({'sport':'Tennis'}, 'name age', (err,athletes) => {
    if (err) return handleError(err)
})

var query = Atletas.find({'sport':'Tennis'})

query.select('name')
query.select('name age city')

//Limitar resultados
query.limit(5)

//Ordenar por age
query.sort({age: -1})