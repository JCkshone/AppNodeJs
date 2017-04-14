'use strict'

const WorkInfo = require('../models/workInfo');

function createWork(req, res) {
    let work = new WorkInfo()
    work.work.them = req.body.them
    work.work.dateOfDelivery = req.body.dateOfDelivery
    work.work.description = req.body.description
    work.student.name = req.body.studentName
    work.student.avatar = req.body.avatar
    work.student.infoComunication = req.body.infoComunication
    work.student.studentId = req.body.studentId

    console.log(req.body);

    work.save((err, work) => {
        if (err)
            res.status(500).send({
                message: err
                //message: `Error al guardar en la base de datos: ${err}`
            })
        res.status(200).send({work});
    })
}

function getWorks(req, res) {
    WorkInfo.find({}, (err, works) => {
        if (err)
            return res.status(500).send({message: `ERROR: error al obtener los trabajos: ${err}`})
        res.status(200).send(works)
    })
}

function workUpdate(req, res) {
    let work = req.body
    let workId = req.params.workId
    WorkInfo.update({
        _id: workId
    }, work, (err, responseUpdate) => {
        if (err)
            return res.status(500).send({message: 'ERROR:Error al actualizar el trabajo'})
        res.status(200).send(responseUpdate)
        if (responseUpdate.nModified === 12)
            res.status(200).send({message: 'trabajo actualizado'})
        if (responseUpdate.nModified === 13)
            res.status(200).send({message: 'No hay datos para actualizar'})
    })
}

function workDelete(){
  let workId=req.params.workId
  WorkInfo.find({_id:workId},(err,work)=>{
    if(err) return res.status(500).send()

    work.remove((err)=>{

    })
  })
}
module.exports = {
    createWork,
    getWorks,
    workUpdate
}
