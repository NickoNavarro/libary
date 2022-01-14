const Genre = require('../models/genre')
const Book = require('../models/book')
const async = require('async')
const {body,validationResult} = require('express-validator')

//Mostramos todos los genre

exports.genre_list = function(req, res, next){
    Genre
    .find()
    .sort([['name','ascending']])
    .exec(function(err, list_genres){
        if(err) {return next(err)}

        res.render('genre_list',{title: 'Genre List', genre_list: list_genres})
    })
}

//Mostrar detalles de un genre específico

exports.genre_detail = function(req, res, next){

    async.parallel({
        genre: function(callback){
            Genre
            .findById(req.params.id)
            .exec(callback)
        },
        genre_books: function(callback){
            Book
            .find({'genre': req.params.id})
            .exec(callback)
        }
    },
    function(err, results){
        if(err){return next(err)}
        if(results.genre == null){
            const err = new Error('Genre not found')
            err.status = 404
            return next(err)
        }

        res.render('genre_details', {title: 'Genre Details', genre: results.genre, genre_book: results.genre_books})

    }
    )
}

//Formulario para crear genre con GET (DISPLAY)

exports.genre_create_get = function(req, res, next){
    res.render('genre_form', {title: 'Create Genre'})
}

//Manejador de genre con POST

exports.genre_create_post = [

    //Validamos datos
    body('name','genre name required').trim().isLength({min: 1}).escape(),

    (req, res, next) => {

        const errors = validationResult(req)

        var genre = new Genre({

            name: req.body.name
        })

        if(!errors.isEmpty()){
            res.render('genre_form', {title: 'Create Genre', genre: genre, errors: errors.array()})
            return
        }else{
            Genre.findOne({name: req.body.name}).exec(function(err,found_genre){
                if (err) { return next(err)}

                if(found_genre){
                    res.redirect(found_genre.url)
                }else{
                    genre.save(function(err){

                        if(err){return next(err)}
                        res.redirect(genre.url)
                    })
                }
            })
        }
    }
]

//Formulario de DELETE para genre GET(DISPLAY)

exports.genre_delete_get = function(req, res){
    res.send('NOT IMPLEMENTED NOW: genre Delete GET')
}

//Formulario de DELETE para genre POST

exports.genre_delete_post = function(req, res){
    res.send('NOT IMPLEMENTED NOW: genre Delete POST')
}

//Formulario de UPDATE para genre GET(DISPLAY)

exports.genre_update_get = function(req, res){
    res.send('NOT IMPLEMENTED NOW: genre Update GET')
}

//Formulario de UPDATE para genre POST

exports.genre_update_post = function(req, res){
    res.send('NOT IMPLEMENTED NOW: genre Update POST')
}