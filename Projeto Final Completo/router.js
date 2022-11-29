const express = require ('express');
const router = express.Router();

// const Auth = require('../middleware/middleware');
const AuthValidator = require('./validator/authvalidator');
const UserValidator = require('./validator/uservalidator');

const AuthController = require('./controller/authcontroller');
const UserController = require('./controller/usercontroller');
const ProjectController = require('./controller/projectcontroller');
const TasksController = require('./controller/taskscontroller');


const Auth = require('./middleware/middleware');
const taskscontroller = require('./controller/taskscontroller');

router.get('/ping', (req, res) => {
    res.json({ pong: true });
});

//
router.get('/states', UserController.getStates);

// Processo Login
router.post('/user/singin', AuthValidator.signin, AuthController.signin);
router.post('/user/signup', AuthValidator.signup, AuthController.signup);

//User
router.get('/user/me', Auth.private, UserController.getUsers);
router.put('/user/me', UserValidator.editAction, Auth.private, UserController.editAction);

//Gerir Projeto

router.post('/project/add', ProjectController.adicionarProjeto);
router.put('/project/modify', ProjectController.alterarProjeto);//
router.get('/project/show', ProjectController.pegarProjetos);//
// router.getProject('/project/mostrarProjeto', ProjectController.pegarProjetos);

//Gerir Tarefas
router.post('/tasks/add', TasksController.addTask);
router.put('/tasks/edit', TasksController.editTasks);
router.get('/tasks/get', TasksController.getTasks);

module.exports = router;
