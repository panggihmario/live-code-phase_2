const User = require('../models/user')
const bcrypt = require('bcryptjs')
const jwt =  require('jsonwebtoken')

class Controller {

    static register(req,res){
        var salt = bcrypt.genSaltSync(10);
        var hash = bcrypt.hashSync(req.body.password, salt);

        User.findOne({
            name : req.body.name
        })
        .then(dataUser=>{
            if(!dataUser){
                User.create({
                    name :req.body.name,
                    password : hash
                })
                .then(data=>{
                    // let token = jwt.sign({name : data.name},process.env.secretKey)
                    let token = jwt.sign({name : data.name,id:data._id},'secret')
                    res.status(200).json({
                        success : true,
                        message : `Account ${data.name} registered`
                    })
                })
                .catch(err=>{
                    res.status(400).json(err)
                })
            }else{
                res.json({msg : "username has already taken"})
            }
        })
    }

    static login(req,res){
        User.findOne({
            name : req.body.name
        })
        .then(data=>{
            // console.log(data)
            if(data){
                let checkPassword = bcrypt.compareSync(req.body.password, data.password);
                // console.log(checkPassword)
                if(checkPassword){
                    let token = jwt.sign({name : data.name,id:data._id},'secret')
                    console.log(token)
                    res.status(201).json(token)
                }else{
                    res.json({msg : 'wrong name/password'})
                } 
            }else{
                res.json({msg : 'wrong name/password'})
            }
        })
        .catch(err=>{
            res.status(400).json(err)
        })
    }

}

module.exports = Controller