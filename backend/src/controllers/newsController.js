const express = require('express');
const router = express.Router();

const newsModel = require('../models/mongodb/newsModel');
const errorHandler = require('../util/errorHandler');
const jwtAuth = require('../util/jwtAuth');

const jwt = require('jsonwebtoken')

const route = '/news';

router.get(`${route}`, async (req, res, next) => {
    //console.log(jwt.decode(req.headers.authorization.split(' ')[1]))
    try {
        
        const result = await newsModel.find().sort({ createdAt: 'desc' }).skip(parseInt(req.query.skip)).limit(parseInt(req.query.limit));

        return res.json(result);
        
    } catch (error) {
        console.error(error);
        return res.status(500).json(error);
    }
});

router.get(`${route}/count`, async (req, res, next) => {
   
    try {

        const count = await newsModel.countDocuments();

        return res.json(count);
        
    } catch (error) {
        console.error(error);
        return res.status(500).json(error);
    }
});

router.get(`${route}/:id`, async (req, res, next) => {

    try {

        const result = await newsModel.findById(req.params.id);

        return res.json(result);
        
    } catch (error) {
        //console.error(error);
        return res.status(500).json(error);
    }
});

router.get(`${route}/search/:match`, async (req, res, next) => {
    
    try {
        
        const regexTitle = { title: {$regex: `(?i).*${req.params.match}*.` }};
        const regexTags = { tags: {$regex: `(?i).*${req.params.match}*.` }};

        let count = await newsModel.find({ $or: [regexTitle, regexTags] }).sort({ createdAt: 'desc' });

        count = count.length;
        
        const result = await newsModel.find({ $or: [regexTitle, regexTags] }).sort({ createdAt: 'desc' }).limit(parseInt(req.query.limit)).skip(parseInt(req.query.skip));

        return res.json({result, count});
        
    } catch (error) {
        //console.error(error);
        return res.status(500).json(error);
    }
});

router.post(`${route}`, jwtAuth, async (req, res, next) => {

    req.assert('userId', 'Erro no usuário').isMongoId();
    req.assert('title', 'Titulo inválido, precisa ter no minimo 5 caracteres').isLength({ min: 5, max: 50});
    req.assert('news', 'noticia inválida').notEmpty(); //.isLength({ min: 50});
    
    if(req.validationErrors()) {
        return res.status(400).json(errorHandler(req.validationErrors()));
    } 
    
    try {
        
        let result = await newsModel.create(req.body);
        
        return res.json(true);
        
    } catch (error) {
        //console.error(error);

        return res.status(500).json(error);        
    }
});

router.put(`${route}/:id`, jwtAuth, async (req, res, next) => {
    
    if(req.body.title) req.assert('title', 'Titulo inválido, precisa ter no minimo 5 caracteres').isLength({ min: 5, max: 50});
    if(req.body.news) req.assert('news', 'noticia inválida').isLength({ min: 50});
    
    if(req.validationErrors()) {
        return res.status(400).json(errorHandler(req.validationErrors()));
    } 
    
    try {
        
        let result = await newsModel.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });

        return res.json(true);
        
    } catch (error) {
        //console.error(error);
        return res.status(500).json(error);        
    }
});

router.delete(`${route}/:id`, jwtAuth, async (req, res, next) => {
    
    try {
        
        await newsModel.findByIdAndDelete(req.params.id);
        
        return res.json(true);
        
    } catch (error) {
        //console.error(error);

        if(error.name == 'CastError'){
            return res.status(400).json({ 'errors': ['invalid Id'] });
        }

        return res.status(500).json(error);        
    }
});

module.exports = router;