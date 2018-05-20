//const passport = require('passport');
var JwtStrategy = require('passport-jwt').Strategy;
var ExtractJwt = require('passport-jwt').ExtractJwt;

const CustomExtractor = (req)=>{
    console.log("CustomExtractor-",req.session)
    console.log("headers", req.headers)
    return true
}
module.exports = (passport)=>{
    
    var jwtOptions = {
        jwtFromRequest:CustomExtractor,
        secretOrKey: 'config.secret'
    };
    
    var strategy = new JwtStrategy(jwtOptions, (payload,done)=>{
        console.log("strategy function", payload)
        if(payload.username){
            done(null, payload.username)
        }
    })
    passport.use(strategy);
}
