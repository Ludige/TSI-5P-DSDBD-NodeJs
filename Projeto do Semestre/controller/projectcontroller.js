const mongoose = require ('mongoose');
const {validationResult, matchedData} = require('express-validator');
const Project = require('../model/project');
const User = require('../model/user');
// const ProjectValidator = require ('../validator/projectvalidator');

// const nomeFuncao = async(buffer) => { //Mexer na imagem
//     let nameImage = `${uuid}.jpg`;
//     let temporaryImage = await jimp.read(buffer);//Ler imagem
//     temporaryImage.cover(500, 500).quality(75).write(`./assets/${nameImage}`); //.tamanho .Qualidade .sobrescreverNome
//     return nameImage;
// }

module.exports = {
    adicionarProjeto: async(req, res) =>{//POST
        let {name,description,idUser} = req.query;

        if (!name || !description) {
            res.json({ error: 'Titulo ou Descrição nao foram preenchidos' });
            return;
        }

        // COPY
        //Verificar se usuario existe
        const data = matchedData(req);

        const user = await User.findOne({id:data.idUser});
        if(!user){
            res.json({error:"Usuario não cadastrado"});
        }
        // COPY

        const newProject = new Project();
        newProject.idUser = idUser;
        newProject.name = name;
        newProject.description = description;
        newProject.createdAt = Date.now();//new Date(); tbm funciona

        const info = await newProject.save();
        res.json({ id: info._id });
    },
    pegarProjetos: async(req,res) =>{//GET
        let project = await Project.find();
        res.json({project});
    },
    alterarProjeto: async(req, res)=> {//PUT
        const erros = validationResult(req);

        if(!erros.isEmpty){
            res.json({
                erro:erros.mapped()
            });
            return;
        }

        const dados = matchedData(req);

        let novosDados = {};

        if(dados.name){
            novosDados.name = dados.name;
        }

        if(dados.description){
            novosDados.description = dados.description;
        }

        if(dados.tasks){
            novosDados.tasks = dados.tasks;
        }

        novosDados.updatedAt = Date.now;

        // encontra item baseado no id, atualiza ($set) baseado nos novos dados 
        await Project.findOneAndUpdate({id:dados.id},{$set:novosDados});
    },
    // removerTarefaDoProjeto: async(req,res) =>{
    //     //TODO -->Remove a tarefa da lista pelo ID
    // }
};
