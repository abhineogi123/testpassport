var AUTH_SESSION = "authorization",
LEGACY_AUTH_SCHEME = "JWT", 
BEARER_AUTH_SCHEME = 'bearer';
var re = /(\S+)\s+(\S+)/;

function parseAuthSession(authValue) {
    if (typeof authValue !== 'string') {
        return null;
    }
    var matches = authValue.match(re);
    return matches && { scheme: matches[1], value: matches[2] };
}
var extractors = {};

extractors.extractTokenFromCurrentSession = function(auth_scheme){
    var auth_scheme_lower = auth_scheme.toLowerCase();

    return function (request){
        var token = null;
        if(request.session[AUTH_SESSION]){
            var auth_params =  parseAuthSession(request.session[AUTH_SESSION]);

            if(auth_params && auth_scheme_lower===auth_params.scheme.toLowerCase()){
                token = auth_params.value
            }
        }
        return token;
    };

};


extractors.extractTokenFromCookie = function(request){
    var token = null;
    //console.log("request",request);
    if(request && request.cookies){
       token = request.cookies['jwt'];
    }
    console.log("token",token);
    return token;
}

module.exports = {extractors}