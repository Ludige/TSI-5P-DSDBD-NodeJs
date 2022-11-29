const { checkSchema } = require('express-validator');

module.exports = {
    editAction: checkSchema({
        id:{
            notEmpty:true
        },
        name:{
            notEmpty:true,
            trim: true,
            isLength: {
                options:{min: 2}
            },
            errorMessage: 'Nome precisa de no minimo 2 caracteres'
        },
        description:{
            notEmpty:true,
            isLength:{
                options:{min:20, max: 160}
            },
            errorMessage: 'Escreva uma descrição, mínimo 20 caracteres'
        },
        createdAt:{
            isDate: true
        },
        updatedAt:{
            isDate: true
        }
    })
}