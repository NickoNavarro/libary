const {body, validationResult} = require('express-validator')

body('name', 'Empty name').trim().isLength({min:1}).escape()

body('age', 'Invalid age').optional({checkFalsy: true}).isISO8601().toDate().withMessage('Jioooo')

const validar = (req, res, next) => {

    const validador = validationResult(req)

}
