const passport = require('passport');

module.exports = (strategy,useSession)=>{
    return passport.authenticate(strategy,{session:useSession})
}