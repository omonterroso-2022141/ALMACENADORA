import { useState } from 'react'
import { deleteAgenda, getAgenda, getAgendaId, postAgenda, updateAgenda } from '../../services/api'
import toast from 'react-hot-toast'

export const useAgenda = () => {
    const [ isLoading, setIsLoading ] = useState(false)
    const [ agendas, setAgendas ] = useState(null) 
    const [ agenda, setAgenda ] = useState(null) 

    const guardando = async(nombre, descripcion, fechaInicio, fechaFin, activo)=>{
        setIsLoading(true)
        const agenda = {
            nombre,
            descripcion,
            fechaInicio,
            fechaFin,
            activo
        }
        const response = await postAgenda(agenda)
        setIsLoading(false)
        if(response.error){
          if(response?.err?.response?.data?.errors){
            let arr = response?.err?.response?.data?.errors
            for (const error of arr) {
              return toast.error(
                error.msg
              )
            }
          }
            return toast.error(
              response?.err?.response?.data?.msg ||
              response?.err?.data?.msg ||
              'Error al registrar el usuario, intenta de nuevo.'
            )
        }
    }

    const getTareas = async(isLogged = false)=>{
      setIsLoading(true)

      const response = await getAgenda()
      setIsLoading(false)

      if(response.error){
        if(response?.err?.response?.data?.errors){
          let arr = response?.err?.response?.data?.errors
          for (const error of arr) {
            return toast.error(
              error.msg
            )
          }
        }
          return toast.error(
            response?.err?.response?.data?.msg ||
            response?.err?.data?.msg ||
            'Error al registrar el usuario, intenta de nuevo.'
          )
      }
      if(!isLogged){        
        return setAgendas(
          {
            agendas: response.data?.agendas
          }
        )
      }
    }

    const getTareasId = async(id)=>{
      setIsLoading(true)

      const response = await getAgendaId(id)
      setIsLoading(false)

      if(response.error){
        if(response?.err?.response?.data?.errors){
          let arr = response?.err?.response?.data?.errors
          for (const error of arr) {
            return toast.error(
              error.msg
            )
          }
        }
          return toast.error(
            response?.err?.response?.data?.msg ||
            response?.err?.data?.msg ||
            'Error al registrar el usuario, intenta de nuevo.'
          )
      }
      return setAgenda(
        {
          agenda: response.data?.agenda
        }
      )
    }

    const eliminarTareas = async(id)=>{
      setIsLoading(true)
      const response = await deleteAgenda(id)
      setIsLoading(false)

      if(response.error){
        if(response?.err?.response?.data?.errors){
          let arr = response?.err?.response?.data?.errors
          for (const error of arr) {
            return toast.error(
              error.msg
            )
          }
        }
          return toast.error(
            response?.err?.response?.data?.msg ||
            response?.err?.data?.msg ||
            'Error al registrar el usuario, intenta de nuevo.'
          )
      }
    }

    const update = async(id, nombre, descripcion, fechaInicio, fechaFin, activo)=>{
      setIsLoading(true)
      const agenda = {
          nombre,
          descripcion,
          fechaInicio,
          fechaFin,
          activo
      }
      const response = await updateAgenda(id, agenda)
      setIsLoading(false)
      if(response.error){
        if(response?.err?.response?.data?.errors){
          let arr = response?.err?.response?.data?.errors
          for (const error of arr) {
            return toast.error(
              error.msg
            )
          }
        }
          return toast.error(
            response?.err?.response?.data?.msg ||
            response?.err?.data?.msg ||
            'Error al registrar el usuario, intenta de nuevo.'
          )
      }
      getAgenda()
    }
  return {
    guardando,
    getTareas,
    getTareasId,
    update,
    eliminarTareas,
    isFetchingGetTareas: !(getTareas),
    isFetchingGetTareasId: !(getTareasId),
    isFetchingUpdate: !update, 
    isFetchingElimiante: !eliminarTareas,
    isLoading,
    allAgendas: agendas?.agendas,
    agendaOne: agenda?.agenda
  }
}

