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
            const token =jwt.sign(payload, 'config.secret', {
                expiresIn: 10080
            });
            //response.token = token;
            req.session.authorization = 'BEARER '+ token; //for session auth
            //res.cookie('jwt',token); //for cookie auth
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

    loginRouter.get('/getSession',(req,res)=>{
        console.log("getting session")
        if(req.session.userDetails)
            res.send(req.session.userDetails)
        else
            res.send({loggedIn:false})
    })
    loginRouter.get('/fakeLogin', (req,res)=>{
        var user ={
            username:"abhi",
            password:"abhipass",
            usercredentials : {
                username:"abhi",
                clientkey:'asgt5egffg5',
                description:'hhs ekjhfdsjk seefuks',
                role:'admin'
            }
        }
        req.session.userDetails = user.usercredentials;
        payload = {...user.usercredentials}
        const token =jwt.sign(payload, 'config.secret', {
            expiresIn: 10080
        });
        req.session.authorization = 'BEARER '+ token; //for session auth
        res.cookie('jwt',token,{
            expires: new Date(Date.now() + 3600),
            path:'/'
        }); //for cookie auth
        req.session.save((err)=>{
            if(err){
                res.status(500).send(err)
            }
            else
                res.status(200).send(user)
        })
    })
    app.use('/api',loginRouter);
}