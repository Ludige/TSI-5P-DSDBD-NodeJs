const mongoose = require('mongoose');
mongoose.Promisse = global.Promise;

const modelSchema = new mongoose.Schema({
    idUser: String,//
    name: String,
    description: String,
    createdAt: Date,
    updatedAt: Date
});

const modelName = 'project';

if(mongoose.connection && mongoose.connection.models[modelName]){
    module.exports = mongoose.connection.models[modelName];//Conexão
}else{
    module.exports = mongoose.model(modelName,modelSchema);//Criar nova conexão
    // (x,y) x: nome, y: estrutura
}