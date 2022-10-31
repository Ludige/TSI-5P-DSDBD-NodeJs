const { checkSchema } = require('express-validator');

module.exports = {
    editTasks: checkSchema({
        id:{
            notEmpty:true
        },
        idProject:{
            notEmpty:true
        },
        name:{
            notEmpty:true,
            trim: true, //Corta espaços extra
            isLength: {
                options:{min: 1}
            },
            errorMessage: 'Nome precisa de no minimo 1 caracter'
        },
        description:{
            notEmpty:true,
            isLength:{
                options:{min:20, max: 160}
            },
            errorMessage: 'Escreva uma descrição, mínimo 20 caracteres'
        },
        notes:{
            notEmpty:true,
            isLength:{
                options:{max: 250}
            },
            errorMessage: 'Notação Invalida, ultrapassou o limite de caracteres'
        },
        deadline:{
            isDate: true
        },
        createdAt:{
            isDate:true
        },
        updatedAt:{
            isDate:true
        }
    })
}