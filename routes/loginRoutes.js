const express = require('express');
const loginController = require('../controllers/loginController');
const jwt = require('jsonwebtoken');
module.exports = (app)=>{
    const loginRouter = express.Router();

    loginRouter.post('/validateLogin', (req,res)=>{
        response = loginController.validateLogin(req.body.username, req.body.password)

        if(response.valid){
            req.session.userDetails = response.usercredentials;
            payload = {...response.usercredentials}
            const token ='BEARER'+ jwt.sign(payload, 'config.secret', {
                expiresIn: 10080
            });
            response.token = token;
            req.session.save((err)=>{
                if(err){
                    res.status(500).send(err)
                }
                else
                    res.status(200).send(response)
            })
        }
        else{
            res.status(403).send({response});
        }
    })

    app.use('/api',loginRouter);
}