const express = require('express');
const passport = require('passport');
const Authentication = require('../authenticationMiddlewares/index');
module.exports = (app)=>{
    const testRoutes = express.Router();

    testRoutes.get('/test1',
        Authentication.AutheticateStrategyMiddleware('session',false),
        Authentication.AuthenticateRolesMiddleware(['admin']),
        (req,res)=>{
            console.log(req.cookies)
            res.send('hi test1 session authentication')
    });
    testRoutes.get('/test2',
        Authentication.AutheticateStrategyMiddleware('session',false),
        Authentication.AuthenticateRolesMiddleware(['user']),
        (req,res)=>{
            res.send('hi test2 cookie authentication')
    });
    app.use('/api',testRoutes);
}