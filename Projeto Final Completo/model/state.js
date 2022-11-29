const mongoose = require('mongoose');
mongoose.Promisse = global.Promise;

//Esqueleto  do bd
const modelSchema = new mongoose.Schema({
    name: String
});

const modelName = 'states';

if(mongoose.connection && mongoose.connection.models[modelName]){
    module.exports = mongoose.connection.models[modelName];//Conexão
}else{
    module.exports = mongoose.model(modelName,modelSchema);//Criar nova conexão
    // (x,y) x: nome, y: estrutura
}
