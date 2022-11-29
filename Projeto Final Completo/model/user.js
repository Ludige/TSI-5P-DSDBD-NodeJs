const mongoose = require('mongoose');
mongoose.Promisse = global.Promise;

const modelSchema = new mongoose.Schema({//Esqueleto  do banco de dados
    name: String,
    email: String,
    passwordHash: String,
    state: String,
    token: String
});

const modelName = 'user';

if(mongoose.connection && mongoose.connection.models[modelName]){
    module.exports = mongoose.connection.models[modelName];//Conexão
}else{
    module.exports = mongoose.model(modelName,modelSchema);//Criar nova conexão
    // (x,y) x: nome, y: estrutura
}
