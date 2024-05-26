import UserModel from '../auth/User.model.js'
import Agenda from './Agenda.model.js'

export const testAgenda = (req, res)=>{
    return res.send({message: 'Conectado a Agenda'})
}

export const addAgenda = async (req, res) => {
    console.log('Entro');
    try {
        let { uid } = req.user
        let { nombre, descripcion, fechaInicio, fechaFin, activo } = req.body

        let existUser = await UserModel.findOne({ _id: uid })

        if (!existUser) return res.status(404).json({ msg: 'No existe el usuario' })

     
        if (new Date(fechaFin) <= new Date(fechaInicio)) {
            return res.status(400).json({ msg: 'La fecha de cierre debe ser posterior a la fecha de inicio' })
        }

        const tarea = await Agenda.create({
            nombre,
            descripcion,
            fechaInicio,
            fechaFin,
            activo,
            autor: uid
        })

        return res.status(200).json({
            msg: "Notes has been added to database",
            userDetails: {
                nombre: tarea.nombre,
                descripcion: tarea.descripcion,
            },
        })
    } catch (err) {
        console.error(err)
        return res.status(500).send({ message: err })
    }
}


export const viewAgenda = async (req, res) => {
    try {
        let { uid } = req.user
        let agendasData = await Agenda.find({autor: uid})

        const agendas = agendasData
        .map((agenda) => {
            return {
                id: agenda._id,
                nombre: agenda.nombre,
                descripcion: agenda.descripcion,
                fechaInicio: agenda.fechaInicio,
                fechaFin: agenda.fechaFin,
                activo: agenda.activo,
                autor: agenda.autor
            }
        })

        return res.status(200).json({
            agendas,
        })
    } catch (err) {
        console.error(err)
        return res.status(500).send({ message: err })
    }
}

export const viewAgendaId = async (req, res) => {
    try {
        let { id } = req.params

        let agenda = await Agenda.findOne({_id:id})

        return res.status(200).json({
            agenda,
        })
    } catch (err) {
        console.error(err)
        return res.status(500).send({ message: err })
    }
}


export const updatedAgenda = async (req, res) => {
    try {
        let { id } = req.params
        let existAgenda = await Agenda.findOne({ _id: id })
        
        if (!existAgenda)
            return res.status(404).send({ message: 'La nota no existe' })
        
        let { fechaInicio, fechaFin } = req.body
        
        console.log('Fecha de inicio:', fechaInicio);
        console.log('Fecha de fin:', fechaFin);

        if (new Date(fechaFin) <= new Date(fechaInicio)) {
            return res.status(400).json({ message: 'La fecha de finalización debe ser posterior a la fecha de inicio' })
        }
        
        let agendaUpdate = await Agenda.findOneAndUpdate(
            { _id: id },
            req.body,
            { new: true }
        )
        
        if (!agendaUpdate)
            return res.status(401).send({ message: 'La nota no pudo ser actualizada' })
        
        return res.status(200).json({
            agendaUpdate,
        })
    } catch (err) {
        console.error(err)
        return res.status(500).send({ message: err })
    }
}


export const deleteAgenda = async (req, res) => {
    try {
        let { id } = req.params
        let existAgenda = await Agenda.findOne({ _id: id })
        if (!existAgenda)return res.status(404).send({ message: 'This Notes Does Not Exists' })

        let agendaDelete = await Agenda.findOneAndDelete({ _id: id })
        if (!agendaDelete)
            return res.status(404).send({ message: 'Notes Not Found, Not Deleted' })

        return res.send({message: `The Notes: ${agendaDelete.nombre} has been successfully removed`})
    } catch (err) {
        console.error(err)
        return res.status(500).send({ message: err })
    }
}