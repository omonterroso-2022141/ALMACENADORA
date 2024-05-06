import { useNavigate, useParams } from 'react-router-dom'
import { useAgenda } from '../../shared/hooks/useAgenda.jsx'
import { useEffect } from 'react'
import {
  activoValidationMessage,
  cadenaValidationMessage,
  convertedFecha,
  fechaValidationMessage,
  usernameValidationMessage,
  validateActivo,
  validateCaracteres,
  validateFecha,
  validateUsername
} from '../../shared/validators/validaroAll.js'
import { Input } from '../../components/Input.jsx'
import { useState } from 'react'

export const AgendaView = ({ setestado }) => {

  const { getTareasId, isFetchingGetTareasId, agendaOne } = useAgenda()
  const { id } = useParams()

  const navigate = useNavigate()
  const handleNaviteToAgendas = () => {
    navigate('/agendas')
  }

  useEffect(() => {
    getTareasId(id)
  }, [])

  const { nombre, descripcion, fechaInicio, fechaFin, activo } = agendaOne || {}
  let fechaInicioResult = ''
  let fechaFinResult = ''

  if (agendaOne) {
    const regex = /(\d{4})-(\d{2})-(\d{2})T.*/
    const fechaInicioMod = regex.exec(fechaInicio)
    const fechaFinMod = regex.exec(fechaFin)
    fechaInicioResult = `${fechaInicioMod[3]}/${fechaInicioMod[2]}/${fechaInicioMod[1]}`
    fechaFinResult = `${fechaFinMod[3]}/${fechaFinMod[2]}/${fechaFinMod[1]}`
  }

  if (isFetchingGetTareasId) {
    return (
      <div className="channel-offline-placeholder">
        <span>Cargando...</span>
      </div>
    )
  }

  const { update, isLoading } = useAgenda()

  const [formData, setFormData] = useState(
    {
      nombre: {
        value: '',
        isValid: false,
        showError: false
      },
      descripcion: {
        value: '',
        isValid: false,
        showError: false
      },
      fechaInicio: {
        value: '',
        isValid: false,
        showError: false
      },
      fechaFin: {
        value: '',
        isValid: false,
        showError: false
      },
      activo: {
        value: '',
        isValid: false,
        showError: false
      }
    }
  )

  const onValueChange = (value, field) => {
    setFormData((prevData) => (
      {
        ...prevData,
        [field]: {
          ...prevData[field],
          value
        }
      }
    ))
  }

  const handleValidationOnBlur = (value, field) => {
    let isValid = false
    switch (field) {
      case 'nombre':
        isValid = validateUsername(value)
        break
      case 'descripcion':
        isValid = validateCaracteres(value)
        break
      case 'fechaInicio':
        isValid = validateFecha(value)
        break
      case 'fechaFin':
        isValid = validateFecha(value)
        break
      case 'activo':
        isValid = validateActivo(value)
        break
      default:
        break
    }
    setFormData((prevData) => (
      {
        ...prevData,
        [field]: {
          ...prevData[field],
          isValid,
          showError: !isValid
        }
      }
    ))
  }

  const handleUpdate = async (e) => {
    e.preventDefault()
    update(
      id,
      formData.nombre.value,
      formData.descripcion.value,
      convertedFecha(formData.fechaInicio.value),
      convertedFecha(formData.fechaFin.value),
      formData.activo.value
    )
    navigate('../agendas')
  }

  const isSubmitButtonDisable = !formData.nombre.isValid ||
    !formData.descripcion.isValid ||
    !formData.fechaInicio.isValid ||
    !formData.fechaFin.isValid ||
    !formData.activo.isValid

  return (
    <div className="register-container" style={{ backgroundColor: '#0b141b', marginTop: '5%', height:'auto'}}>
      <div style={{ backgroundColor: '#2a3942', borderRadius: '10px', width: '90%' }}>
        <h1 style={{ textAlign: 'center' }}>Editar Tarea</h1>
      </div>
      <form
        className="auth-form"
        onSubmit={handleUpdate}
      >
        <Input
          field='nombre'
          label={"Nombre Actual: " + nombre}
          type='text'
          value={formData.nombre.value}
          onChangeHandler={onValueChange}
          onBlurHandler={handleValidationOnBlur}
          showErrorMessage={formData.nombre.showError}
          validationMessage={usernameValidationMessage}
          placeholder={nombre}
        />

        <Input
          field='descripcion'
          label={'Descripcion:'}
          type='text'
          value={formData.descripcion.value}
          onChangeHandler={onValueChange}
          onBlurHandler={handleValidationOnBlur}
          showErrorMessage={formData.descripcion.showError}
          validationMessage={cadenaValidationMessage}
          placeholder={descripcion}
        />

        <Input
          field='fechaInicio'
          label={'Fecha Inicio:'}
          type='text'
          value={formData.fechaInicio.value}
          onChangeHandler={onValueChange}
          onBlurHandler={handleValidationOnBlur}
          showErrorMessage={formData.fechaInicio.showError}
          validationMessage={fechaValidationMessage}
          placeholder={fechaInicioResult}
        />

        <Input
          field='fechaFin'
          label={'Fecha Fin:'}
          type='text'
          value={formData.fechaFin.value}
          onChangeHandler={onValueChange}
          onBlurHandler={handleValidationOnBlur}
          showErrorMessage={formData.fechaFin.showError}
          validationMessage={fechaValidationMessage}
          placeholder={fechaFinResult}
        />


        <Input
          field='activo'
          label={activo ? 'Activo' : 'Desactivada'}
          type='text'
          value={formData.activo.value}
          onChangeHandler={onValueChange}
          onBlurHandler={handleValidationOnBlur}
          showErrorMessage={formData.activo.showError}
          validationMessage={activoValidationMessage}
          placeholder={activo !== undefined && activo !== null ? activo.toString() : ''}
        />
        <div style={{display:'flex', width:'50%', gap:'10%'}}>
          <button style={{backgroundColor:'#53bdeb'}} disabled={isSubmitButtonDisable}>Actualizar</button>
          <button style={{backgroundColor:'red'}} onClick={handleNaviteToAgendas}>Cancelar</button>
        </div>
      </form>
    </div>
  )
}

