import mongoose, { model, Schema } from 'mongoose'

const agendaSchema = Schema({
    nombre: {
        type: String,
        required: true
    },
    descripcion: {
        type: String,
        required: true
    },
    fechaInicio: {
        type: Date,
        required: true
    },
    fechaFin: {
        type: Date,
        required: true
    },
    activo: {
        type: Boolean,
        required: true
    },
    autor: {
        type: mongoose.Schema.ObjectId,
        ref: 'user',
        required: true
    }
})

agendaSchema.methods.toJSON = function(){
    const { __v, password, _id, ...usuario} = this.toObject();
    usuario.uid = _id;
    return usuario;
}

export default model('Agenda', agendaSchema)