module.exports = (roles)=>{
    return function (req,res,next){

        console.log("role authentication")
        if(roles.indexOf(req.session.userDetails.role) >-1){
            return next();
        }
        else{
            res.status(401).send({error:'user unauthorized to view this content'});
            return next('unauthorized')
        }
    }
}