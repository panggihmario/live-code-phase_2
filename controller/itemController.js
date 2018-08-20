const Item = require('../models/item')
const jwt = require('jsonwebtoken')


class Controller {

    static create(req,res){
        var decoded = jwt.verify(req.headers.token, 'secret')
        Item.create({
            name : req.body.name,
            price : req.body.price,
            stock : req.body.stock,
            tags : req.body.tags,
            user : decoded.id
        })
        .then(dataItem=>{
            res.status(201).json(dataItem)
        })
        .catch(err=>{
            res.status(400).json(err)
        })
    }

    static listItem(req,res){
        var decoded = jwt.verify(req.headers.token, 'secret')
        Item.find({
            user : decoded.id
        })
        .populate('user')
        .then(item=>{
            res.status(201).json(item)
        })
        .catch(err=>{
            res.status(400).json(err)
        })

    }

    static find(req,res){
        var tmpt =[]
        Item.find({
            name : new RegExp(req.body.value,'i')
        })
        .then(itemByName=>{
            for(let i=0;i<itemByName.length;i++){
                tmpt.push(itemByName[i])
            }
            Item.find({
                price : new RegExp(req.body.value,'i')
            })
            .then(itemByPrice=>{
                for(let i=0;i<itemByPrice.length;i++){
                    tmpt.push(itemByPrice[i])
                }
                Item.find({
                    tags :  new RegExp(req.body.value,'i')
                })
                .then(itemByTag=>{
                    for(let i=0;i<itemByTag.length;i++){
                        tmpt.push(itemByTag[i])
                        res.status(200).json(tmpt)
                    }
                })
            })
        })
    }
}

module.exports = Controller