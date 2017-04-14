'use strict'

const express = require('express');
const api = express.Router();
//const auth = require('../middlewares/auth.js');
const userCtrl = require('../controllers/userCtrl')
const workCtrl = require('../controllers/workCtrl')


/*----------------Products list-------------------*/
//api.get('/product', productCtrl.getProducts);

/*----------------rest para usuarios -------------------*/
api.post('/user', userCtrl.createUser)//Crear usuarios
api.get('/user', userCtrl.getUsers)
api.put('/user/:takeUserId/:takeWorkId', userCtrl.takeWork)
api.put('/user/:userId',userCtrl.userUpdate)
api.delete('/user/:email',userCtrl.userDelete)

/*----------------rest para tareas -------------------*/
api.post('/work', workCtrl.createWork)
api.get('/work', workCtrl.getWorks)
api.put('/work/:workId', workCtrl.workUpdate)
api.delete('/work/:workId', workCtrl.workDelete)

module.exports = api;
