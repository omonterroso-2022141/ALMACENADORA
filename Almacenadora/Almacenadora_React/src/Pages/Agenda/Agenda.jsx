import { convertedFecha, fechaValidationMessage, usernameValidationMessage, validateActivo, validateCaracteres, validateFecha, validateUsername } from "../../shared/validators/validaroAll.js"
import { Input } from "../../components/Input.jsx"
import { useState } from "react"
import { useAgenda } from "../../shared/hooks/useAgenda.jsx"
import { useNavigate } from 'react-router-dom'
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

export const Agenda = () => {

  const navigate = useNavigate();
  const { guardando } = useAgenda();
  const handleNaviteToAgendas = () => {
    navigate('/agendas')
  }
  

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

  const handleRegister = async (e) => {
    e.preventDefault();
    guardando(
      formData.nombre.value,
      formData.descripcion.value,
      formData.fechaInicio.value,
      formData.fechaFin.value,
      formData.activo.value
    );
    navigate('/agendas');
  };
  
  const handleStartDateChange = (date) => {
    setStartDate(date);
    setFormData(prevData => ({
      ...prevData,
      fechaInicio: {
        ...prevData.fechaInicio,
        isValid: date !== null
      }
    }));
  };

  const handleEndDateChange = (date) => {
    setEndDate(date);
    setFormData(prevData => ({
      ...prevData,
      fechaFin: {
        ...prevData.fechaFin,
        isValid: date !== null
      }
    }));
  };

  const isSubmitButtonDisable = !formData.nombre.isValid ||
    !formData.descripcion.isValid ||
    !formData.activo.isValid
  return (
    <div className="register-container" style={{ backgroundColor: '#0b141b', marginTop: '5%', boxShadow: '10px 10px 10px #22c063', height: 'auto' }}>
      <div style={{ backgroundColor: '#2a3942', borderRadius: '10px', width: '90%' }}>
        <h1 style={{ textAlign: 'center' }}>Agregar Tarea</h1>
      </div>
      <form
        className="auth-form"
        onSubmit={handleRegister}
      >
        <Input
          field='nombre'
          label='Nombre'
          type='text'
          value={formData.nombre.value}
          onChangeHandler={onValueChange}
          onBlurHandler={handleValidationOnBlur}
          showErrorMessage={formData.nombre.showError}
          placeholder={'Nombre de la tarea'}
        />

        <Input
          field='descripcion'
          label='Descripcion'
          type='text'
          value={formData.descripcion.value}
          onChangeHandler={onValueChange}
          onBlurHandler={handleValidationOnBlur}
          showErrorMessage={formData.descripcion.showError}
          placeholder={'Descripcion breve de la tarea'}
        />

<div className="datepicker-container">
  <div className="input-label\">
    <label>Fecha Inicio:</label>
  </div>
  <DatePicker
    selected={formData.fechaInicio.value}
    onChange={(date) => onValueChange(date, 'fechaInicio')}
    dateFormat="dd/MM/yyyy"
    placeholderText="Día/Mes/Año"
  />
  {formData.fechaInicio.showError && (
    <div className="error-message">{fechaValidationMessage}</div>
  )}
</div>

<div className="datepicker-container">
  <div className="input-label">
    <label>Fecha Fin:</label>
  </div>
  <DatePicker
    selected={formData.fechaFin.value}
    onChange={(date) => onValueChange(date, 'fechaFin')}
    dateFormat="dd/MM/yyyy"
    placeholderText="Día/Mes/Año"
  />
  {formData.fechaFin.showError && (
    <div className="error-message">{fechaValidationMessage}</div>
  )}
</div>



        <Input
          field='activo'
          label='Activo'
          type='text'
          value={formData.activo.value}
          onChangeHandler={onValueChange}
          onBlurHandler={handleValidationOnBlur}
          showErrorMessage={formData.activo.showError}
          placeholder={'True o False'}
        />
        <div style={{ display: 'flex', width: '50%', gap: '10%' }}>
          <button style={{ backgroundColor: '#22c063' }} disabled={isSubmitButtonDisable}>Agregar</button>
          <button style={{ backgroundColor: 'red' }} onClick={handleNaviteToAgendas}>Cancelar</button>
        </div>
      </form>
    </div>
  )
}

