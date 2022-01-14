const Author = require('../models/author')
const async = require('async')
const Book = require('../models/book')
//Mostramos todos los autores

const {body,validationResult} = require('express-validator')

exports.author_list = function(req, res, next){
    Author
    .find()
    .sort([['family_name', 'ascending']])
    .exec(function(err, list_authors){
        if(err) {return next(err)}

        res.render('author_list',{title: 'Author List', author_list: list_authors})
    })
}

//Mostrar detalles de un autor específico

exports.author_detail = function (req, res, next) {

    async.parallel({
        author: function (callback) {
            Author.findById(req.params.id)
                .exec(callback)
        },
        authors_books: function (callback) {
            Book.find({ 'author': req.params.id }, 'title summary')
                .exec(callback)
        },
    }, function (err, results) {
        if (err) { return next(err); } // Error in API usage.
        if (results.author == null) { // No results.
            var err = new Error('Author not found');
            err.status = 404;
            return next(err);
        }
        // Successful, so render.
        res.render('author_details', { title: 'Author Detail', author: results.author, author_books: results.authors_books });
    });

};



exports.author_create_get = function (req, res, next) {
    res.render('author_form', { title: 'Create Author' });
};


exports.author_create_post = [

    
    body('first_name').trim().isLength({ min: 1 }).escape().withMessage('First name must be specified.')
        .isAlphanumeric().withMessage('First name has non-alphanumeric characters.'),
    body('family_name').trim().isLength({ min: 1 }).escape().withMessage('Family name must be specified.')
        .isAlphanumeric().withMessage('Family name has non-alphanumeric characters.'),
    body('date_of_birth', 'Invalid date of birth').optional({ checkFalsy: true }).isISO8601().toDate(),
    body('date_of_death', 'Invalid date of death').optional({ checkFalsy: true }).isISO8601().toDate(),


    (req, res, next) => {
        const errors = validationResult(req);
        
        var author = new Author(
            {
                first_name: req.body.first_name,
                family_name: req.body.family_name,
                date_of_birth: req.body.date_of_birth,
                date_of_death: req.body.date_of_death,
            }
        );

        if (!errors.isEmpty()) {
          
            res.render('author_form', { title: 'Create Author', author: author, errors: errors.array() });
            return;
        }
        else {
            

            
            author.save(function (err) {
                if (err) { return next(err); }
                
                res.redirect(author.url);
            });
        }
    }
];
//Formulario de DELETE para Author GET(DISPLAY)

exports.author_delete_get = function (req, res, next) {

    async.parallel({
        author: function (callback) {
            Author.findById(req.params.id).exec(callback)
        },
        authors_books: function (callback) {
            Book.find({ 'author': req.params.id }).exec(callback)
        },
    }, function (err, results) {
        if (err) { return next(err); }
        if (results == null) { 
            res.redirect('/catalog/authors');
        }
       
        res.render('author_delete', { title: 'Delete Author', author: results.author, author_books: results.authors_books });
    });

};

//Formulario de DELETE para Author POST

exports.author_delete_post = function(req, res){
    async.parallel({
        author: function (callback) {
            Author.findById(req.body.authorid).exec(callback)
        },
        authors_books: function (callback) {
            Book.find({ 'author': req.body.authorid }).exec(callback)
        },
    }, function (err, results) {
        if (err) { return next(err); }
        if (results.authors_books.length > 0) {
            res.render('author_delete', { title: 'Delete Author', author: results.author, author_books: results.authors_books });
            return;
        }
        else {
            Author.findByIdAndDelete(req.body.authorid, function deleteAuthor(err) {
                if (err) { return next(err); }
                res.redirect('/catalog/authors')
            })
        }
    });

}

//Formulario de UPDATE para Author GET(DISPLAY)

exports.author_update_get = function(req, res){
    res.send('NOT IMPLEMENTED NOW: Author Update GET')
}

//Formulario de UPDATE para Author POST

exports.author_update_post = function(req, res){
    res.send('NOT IMPLEMENTED NOW: Author Update POST')
}