const mongoose = require('mongoose');
mongoose.Promisse = global.Promise;

const modelSchema = new mongoose.Schema({
    idProject: String,
    name: String,
    description: String,
    notes: String,
    status: String,
    deadline: Date,
    createdAt: Date,
    updatedAt: Date
});

const modelName = 'tasks';

if(mongoose.connection && mongoose.connection.models[modelName]){
    module.exports = mongoose.connection.models[modelName];//Conexão
}else{
    module.exports = mongoose.model(modelName,modelSchema);//Criar nova conexão
    // (x,y) x: nome, y: estrutura
}