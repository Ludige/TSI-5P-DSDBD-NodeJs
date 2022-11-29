const mongoose = require ('mongoose');
const {validationResult, matchedData} = require('express-validator');
const bcrypt = require('bcrypt');
const State = require("../model/state");
const User = require("../model/user");
const UserValidator = require("../validator/uservalidator");
// const { update } = require('../model/state');

module.exports = {
    getStates: async(req, res) => {
        let states = await State.find();
        res.json({ states });
    },
    getUsers: async(req,res) => {
        let users = await User.find();
        req.json({users});
    },
    editAction: async(req, res)=> {
        const erros = validationResult (req);

        if(!erros.isEmpty()){
            req.json({
                error: erros.mapped()
            });
            return;
        }
        const data = matchedData(req);

        let updates = {};

        if(data.name){
            updates.name = data.name;
        }

        if(data.email){
            const emailCheck = await User.findOne({email: data.email});
            if(emailCheck){
                res.json({error: 'Email já existente'});
                return;
            }

            updates.email = data.email;
        }

        // if(data.state){
        //     if(mongoose.Types.ObjectId.isValid(data.state)){
        //         const stateCheck = await State.findById(data.state);
        //         if(!stateCheck){
        //             res.json({error: 'Estado não existe'});
        //             return;
        //         }
        //         updates.states = data.state;
        //     }else{
        //         res.json({error: 'Codigo do estado em formato invalido'});
        //         return;
        //     }
        // }

        if(data.passwordHash){
            updates.passwordHash = await bcrypt.hash(data.password, 10);
        }

        await User.findByIdAndUpdate({ token: data.token }, {$set: updates});
        res.json({});
    }
    //Signin
    //Signout
};