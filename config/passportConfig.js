//const passport = require('passport');
var JwtStrategy = require('passport-jwt').Strategy;
//var ExtractJwt = require('passport-jwt').ExtractJwt;
const fetch= require('isomorphic-fetch');
const ExtractJwt = require('./tokenExtractors').extractors;
const CustomExtractor = (req)=>{
    console.log("CustomExtractor-",req.session)
    console.log("headers", req.headers)
    return true
}
module.exports = (passport)=>{
    //session auth
    var jwtOptionsSession = {
        jwtFromRequest:ExtractJwt.extractTokenFromCurrentSession('bearer'),
        secretOrKey: 'config.secret'
    };
    
    var sessionStrategy = new JwtStrategy(jwtOptionsSession, (payload,done)=>{
        console.log("session strategy function", payload)
        done(null, payload)
    })
     //cookie auth
    var jwtOptionsCookie = {
        jwtFromRequest:ExtractJwt.extractTokenFromCookie,
        secretOrKey: 'config.secret'
    };
    
    var cookieStrategy = new JwtStrategy(jwtOptionsCookie, (payload,done)=>{
        console.log("cookie strategy function", payload)
        done(null, payload)
    })


    passport.use("session",sessionStrategy);
    passport.use("cookie", cookieStrategy);
}
