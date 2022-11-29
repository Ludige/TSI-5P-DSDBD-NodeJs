const mongoose = require ('mongoose');
const {validationResult, matchedData} = require('express-validator');
const Tasks = require ('../model/tasks');
const TasksController = require ('../validator/projectvalidator');

module.exports = {
    addTask: async(req, res)=> {//POST
        let {name,description,status,deadline,idProject} = req.query;

        if (!name || !description || !status || !idProject) {
            res.json({ error: 'Nome, Descrição, Status ou Projeto não foram preenchidos ou inexistente' });
            return;
        }

        //idProjeto > verificar com findOneById
        

        const newTask = new Tasks();
        newTask.name = name;
        newTask.idProject = idProject;
        newTask.description = description;
        newTask.status = status;
        newTask.deadline = deadline;
        newTask.createdAt = Date.now();

        const info = await newTask.save();
        res.json({ id: info._id });
    },
    editTasks: async(req, res)=> {//PUT 
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

        if(dados.notes){
            novosDados.notes = dados.notes;
        }

        if(dados.status){
            novosDados.status = dados.status;
        }

        novosDados.updatedAt = Date.now;

        // encontra item baseado no id, atualiza ($set) baseado nos novos dados 
        await project.findOneandUpdate({id:dados.id},{$set:novosDados});
    },
    getTasks: async(req, res)=> {
        let task = await Tasks.find();
        res.json({task});
    }
    // removeTask: async(req, res)=> {//TODO --> DELETE
    // },
};