// va uno a uno
async.series([
    function(callback){

        callback(null, 'one')
    },
    function(callback){

        callback(null, 'two')
    },
    function(callback){

        callback(null, 'three')
    }
],
    //opcional
    function(err, results){

    }
)

// lanza todos los objetos a la vez 
async.parallel({
    one: function(callback){},
    two: function(callback){},
    three: function(callback){},

    something_else: function(callback){}
},

    function(err, results){

    }
)

// va en cascada, cada función depende de la de arriba
async.waterfall([
    function(callback){

        callback(null, 'one', 'two')
    },
    function(arg1, arg2, callback){

        callback(null, 'three')
    },
    function(arg1, callback){

        callback(null, 'done')
    }
],
    //opcional
    function(err, results){

    }
)