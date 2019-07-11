const express = require('express');
const router = express.Router();

const userModel = require('../models/mongodb/userModel');
const errorHandler = require('../util/errorHandler');
const jwtAuth = require('../util/jwtAuth');

const route = '/user';

router.get(`${route}`, jwtAuth, async (req, res, next) => {

    try {

        const result = await userModel.find();

        result.map( (user) => {
            user.password = undefined;
        });

        return res.json(result);
        
    } catch (error) {
        //console.error(error);
        return res.status(500).json(error);
    }
});

router.get(`${route}/:id`, jwtAuth, async (req, res, next) => {

    try {

        const result = await userModel.findById(req.params.id);

        result.password = undefined;

        return res.json(result);
        
    } catch (error) {
        //console.error(error);
        return res.status(500).json(error);
    }
});

router.post(`${route}`, jwtAuth, async (req, res, next) => {

    req.assert('name', 'Nome inválido, precisa ter no minimo 3 caracteres').isLength({ min: 3, max: 50});
    req.assert('email', 'e-mail inválido').isEmail();
    req.assert('password', 'Senha inválida, precisa ter entre 6 a 16 caracteres').isLength({ min: 6, max: 16 });
    
    if(req.validationErrors()) {
        return res.status(400).json(errorHandler(req.validationErrors()));
    } 
    
    try {
        
        let result = await userModel.create(req.body);
        
        result.password = undefined;
        
        return res.json(result);
        
    } catch (error) {
        //console.error(error);

        if(error.code == 11000){
            return res.status(400).json({ 'errors': ['e-mail já cadastrado'] });
        }

        return res.status(500).json(error);        
    }
});

router.put(`${route}/:id`, jwtAuth, async (req, res, next) => {

    if(req.body.name) req.assert('name', 'Nome inválido, precisa ter no minimo 3 caracteres').isLength({ min: 3, max: 50});
    if(req.body.email) req.assert('email', 'e-mail inválido').isEmail();
    if(req.body.password) req.assert('password', 'Senha inválida, precisa ter entre 6 a 16 caracteres').isLength({ min: 6, max: 16 });
    
    if(req.validationErrors()) {
        return res.status(400).json(errorHandler(req.validationErrors()));
    } 
    
    try {
        
        let result = await userModel.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        
        result.password = undefined;

        return res.json(result);
        
    } catch (error) {
        //console.error(error);
        return res.status(500).json(error);        
    }
});

router.delete(`${route}/:id`, jwtAuth, async (req, res, next) => {
    
    try {
        
        await userModel.findByIdAndDelete(req.params.id);
        
        return res.json('ok');
        
    } catch (error) {
        //console.error(error);

        if(error.name == 'CastError'){
            return res.status(400).json({ 'errors': ['invalid Id'] });
        }

        return res.status(500).json(error);        
    }
});

module.exports = router;
