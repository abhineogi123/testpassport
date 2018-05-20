const userDataJson = [
    {
        username:"abhi",
        password:"abhipass",
        usercredentials : {
            username:"abhi",
            clientkey:'asgt5egffg5',
            description:'hhs ekjhfdsjk seefuks'
        }
    }
]


const validateLogin = (username,password)=>{
    var response = {valid : false}
    userDataJson.map((user)=>{
        if(user.username === username && user.password === password){
            response ={valid : true, usercredentials:user.usercredentials}
        }
    })
    return response;
}

module.exports={
    validateLogin
}