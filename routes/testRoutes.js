const express = require('express');
const passport = require('passport');
module.exports = (app)=>{
    const testRoutes = express.Router();

    testRoutes.post('/test1',passport.authenticate('jwt', {session:true}),(req,res)=>{
        res.send('hi')
    })

    app.use('/api',testRoutes);
}