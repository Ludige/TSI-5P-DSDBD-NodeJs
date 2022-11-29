const mongoose = require ('mongoose');
const {validationResult, matchedData} = require('express-validator');
const Project = require('../model/project');
const user = require('../model/user');
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

        // console.log(req);
        // console.log(name +"//"+ description +"//"+ idUser);

        if (!name || !description || !idUser) {
            res.json({ error: 'Titulo ou Descrição ou Usuario nao foram preenchidos' });
            return;
        }

        //idUser > verificar com findOneById

        const newProject = new Project();
        newProject.idUser = idUser;
        newProject.name = name;
        newProject.description = description;
        newProject.createdAt = Date.now();//new Date(); tbm funciona

        const info = await newProject.save();
        res.json({ id: info._id });
    },

    // pegarProjetos: async(req,res) =>{//GET
    //     // let project = await project.find();
    //     // req.json({project});
    // },

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

        //pegar a id pra pegar os dados

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
        await project.findOneandUpdate({id:dados.id},{$set:novosDados});
    },
    // removerTarefaDoProjeto: async(req,res) =>{
    //     //TODO -->Remove a tarefa da lista pelo ID
    // }
};
