const mongoose = require ('mongoose');
const {validationResult, matchedData} = require('express-validator');
const bcrypt = require('bcrypt');
const State = require("../model/state");
const User = require("../model/user");
const match = require('nodemon/lib/monitor/match');

module.exports = {
    signin: async(req, res) => {
        const erros = validationResult(req);
        if(!erros.isEmpty()){
            res.json({
                error: erros.mapped()
                //mapped faz uma estrutura dos erros
            });
            return;
        }
        const data = matchedData(req);
        //Validar email correspondente no Banco:
        const user = await User.findOne({email:data.email});
        if(!user){
            res.json({error: 'Email e/ou Senha não correspondentes'});
            return;
        }
        
        //validar senha
        const match = await bcrypt.compare(data.password, user.passwordHash);
        
        if(!match){
            res.json({error: 'Email e/ou Senha não correspondentes'});
            return;
        }

        const patternToken = (Date.now + Math.random()).toString();//padraotoken
        const token = await bcrypt.hash(patternToken,10);
        user.token = token;
        await user.save();

        req.json({token,email: data.email});
    },

    signup: async(req, res) => {
        const erros = validationResult(req);
        if(!erros.isEmpty()){
            res.json({
                error: erros.mapped()
            });
            return;
        }
        const data = matchedData(req);

        const user = await User.findOne({email:data.email});
        
        if(user){
            res.json({error: 'Email já existe'});
            return;
        }

        if(mongoose.Types.ObjectId.isValid(data.state)){
            const stateCheck = await State.findById(data.state);
            if(!stateCheck){
                res.json({error: 'Estado não existe'});
                return;
            }
            // updates.states = data.state;
        }else{
            res.json({error: 'Codigo do estado em formato invalido'});
            return;
        }

        const passwordHash = await bcrypt.hash(data.password, 10);
        const patternToken = (Date.now + Math.random()).toString();//padraotoken
        const token = await bcrypt.hash(patternToken,10);

        const newUser = new User({
            name: data.name,
            email: data.email,
            passwordHash: passwordHash,
            token: token,
            state: data.state
        });

        await newUser.save();
        res.json({token});
    }

}