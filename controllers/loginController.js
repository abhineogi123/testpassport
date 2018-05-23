const userDataJson = [
    {
        username:"abhi",
        password:"abhipass",
        usercredentials : {
            username:"abhi",
            clientkey:'asgt5egffg5',
            description:'hhs ekjhfdsjk seefuks',
            role:'admin'
        }
    },
    {
        username:"user",
        password:"userpass",
        usercredentials : {
            username:"user",
            clientkey:'asgt5rfersfd',
            description:'hhs ekjhfdsjk seefuks',
            role:'user'
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