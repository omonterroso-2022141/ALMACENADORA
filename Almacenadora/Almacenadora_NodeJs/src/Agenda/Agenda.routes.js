import { Router } from 'express'
import { 
    testAgenda,
    addAgenda,
    viewAgenda,
    updatedAgenda,
    deleteAgenda,
    viewAgendaId
} from './Agenda.controller.js'
import { check } from 'express-validator'
import { validarCampos } from '../middlewares/validar-campos.js'
import { validarJWT } from '../middlewares/validar-jwt.js'

const api = Router()

api.get('/testAgenda', testAgenda)
api.post('/addAgenda', validarJWT,
    [
        check('nombre','Nombre Requerido').not().isEmpty(),
        check('descripcion','Decripcion Requerida').not().isEmpty(),
        check('fechaInicio','Fecha Inicial Requerida').not().isEmpty(),
        check('fechaFin','Fecha Final Requerida').not().isEmpty(),
        check('activo','Esta activo?').not().isEmpty(),
        validarCampos
    ], addAgenda)
api.get('/viewAgenda', validarJWT, viewAgenda)
api.get('/viewAgendaId/:id', validarJWT, viewAgendaId)
api.put('/updatedAgenda/:id', validarJWT, updatedAgenda)
api.delete('/deleteAgenda/:id', validarJWT, deleteAgenda)

export default api