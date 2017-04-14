'use strict'

const UserInfo = require('../models/userInfo');
const WorkInfo = require('../models/workInfo')
const WorkInProcess = require('../models/workInProcess')
const WorkComplete = require('../models/workComplete')

/*Crear usuarios*/
function createUser(req, res) {
    let user = new UserInfo()
    user.email = req.body.email
    user.displayName = req.body.displayName
    user.avatar = req.body.avatar
    user.password = req.body.password
    user.userRoll = req.body.userRoll

    console.log(req.body)
    user.save((err, userSave) => {
        if (err) {
            if (err.code == 11000)
                return res.status(405).send({message: 'Ya existe un usuario con el correo electronico ingresado.'})
            else
                res.status(500).send({message: `Error al guardar en la base de datos: ${err}`})
        }
        res.status(200).send({user: userSave});
    })
}

/*Obtener el listado de usuarios*/
function getUsers(req, res) {
    UserInfo.find({}, (err, users) => {
        if (err)
            return res.status(500).send({message: `ERROR: error al obtener los usuarios: ${err}`})
        res.status(200).send(users)
    })
}

/*Actualizar datos de usuario*/
function userUpdate(req, res) {
    let userUdp = req.body
    let id = req.params.userId
    UserInfo.update({
        _id: id
    }, userUdp, (err, response) => {
        if (err)
            return res.status(500).send({message: `ERROR: error al obtener los usuarios: ${err}`})
        if (response.nModified === 1)
            res.status(200).send({message: 'Datos actualizados'})
        if (response.nModified === 0)
            res.status(200).send({message: 'Datos actualmente actualizados'})
    })
}

function userDelete(req, res) {
    let userEmail = req.params.email
    console.log(userEmail);

    UserInfo.remove({
        email: userEmail
    }, (err, resDelete) => {
        if (err)
            return res.status(500).send({message: `ERROR: error al obtener los usuarios: ${err}`})
            //res.status(200).send(response)
        res.status(200).send({message: 'Usuario eliminado satisfactoriamente'})
    })
}

/*Asignarse tareas*/
function takeWork(req, res) {
    let takeUserId = req.params.takeUserId
    let takeWorkId = req.params.takeWorkId

    WorkInfo.find({
        _id: takeWorkId
    }, (err, work) => {
        if (err)
            return res.status(500).send({message: `ERROR: error al obtener el trabajo:${err}`})
        User.find({
            _id: takeUserId
        }, (err, user) => {
            if (err)
                return res.status(500).send({message: `ERROR: error al obtener el trabajo:${err}`})

            let workInProcessInfo = new WorkInProcess()

            workInProcessInfo.workId = work._id
            workInProcessInfo.them = work.them
            workInProcessInfo.description = work.description
            workInProcessInfo.dateOfDelivery = work.dateOfDelivery
            workInProcessInfo.user.userId = work.student.studentId
            workInProcessInfo.user.name = work.student.name
            workInProcessInfo.employee.employeeId = user._id
            workInProcessInfo.employee.name = user.displayName

            workInProcessInfo.save(workInProcessInfo, (err, respondeSave) => {
                if (err)
                    return res.status(500).send({message: `ERROR: error al obtener el trabajo:${err}`})

                res.status(200).send({message: 'Usted tiene un nuevo trabajo asignado'})
            })

        })

        /*workInProcessInfo.workId=work._id
            workInProcessInfo.them*/
    })
}
module.exports = {
    createUser,
    getUsers,
    takeWork,
    //updateUser,
    userUpdate,
    userDelete
}
