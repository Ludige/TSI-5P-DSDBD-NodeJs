const { checkSchema } = require('express-validator');

module.exports = {
    editAction: checkSchema({
        token:{
            notEmpty:true
            //Definindo as validações do Usuario
        },
        name:{
            notEmpty:true,
            trim: true, //Corta espaços extra
            isLength: {
                options:{min: 2}
            },
            errorMessage: 'Nome precisa de no minimo 2 caracteres'
        },
        email:{
            isEmail: true,
            normalizeEmail:true,
            errorMessage: 'Email invalido.'
        },
        password:{
            isLength:{
                options:{min: 8,max: 16}
            },
            errorMessage: 'Senha precisa ter no minimo 8 caracteres'
        },
        state:{
            notEmpty:true,
            errorMessage: 'Estado não preenchido'
        }
    })
};
