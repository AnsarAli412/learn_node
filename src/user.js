const express = require('express');
const app = express();
const port = 3000;
const bodyPerser = require('body-parser');


module.exports =  class UserServices{

    constructor(users){
        this.users = []
    }


    jsonParser(){
        return app.use(bodyPerser.json());
    }

    getUsers(){
        this.jsonParser();
        app.get('/users',(req,res)=>{
            if(this.users.length >0){
                res.json(this.successResponse(this.users));
            }else{
                res.json(this.errorResponse())
            }
            
        })
    }

    updateUser(){
        this.jsonParser();
        app.put('/users/:id',(req,res)=>{
            let user = this.users.find(i=>i.id === parseInt(req.params.id));
            // if(!user) return res.json(this.errorResponse());
            // user.name = req.body.name;
            res.json(this.successResponse(user));
        })
    }

    addUser(){
        this.jsonParser();
        app.post('/users',(req,res)=>{
            let data = {
                id:this.users.length+1,
                name:req.body.name
            }

            this.users.push(data);
            res.json(this.successResponse(this.users))
        })
    }

    startUserServer(){
        app.listen(port,()=>{
            console.log("user server started");
        })
    }

    successResponse(users){
        return {
            "status":200,
            "message":"OK",
            "data":users
        }
    }

    errorResponse(){
        return {
           "status":404,
            "message":"Not Found"
        }
    }

}
