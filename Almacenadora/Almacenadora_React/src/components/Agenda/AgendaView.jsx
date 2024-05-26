import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAgenda } from '../../shared/hooks/useAgenda.jsx';
import DatePicker from 'react-datepicker';
import { Input } from '../../components/Input.jsx';

export const AgendaView = ({ setestado }) => {
  const { getTareasId, isFetchingGetTareasId, agendaOne, update } = useAgenda();
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    getTareasId(id);
  }, []);

  const handleNaviteToAgendas = () => {
    navigate('/agendas');
  };

  const [formData, setFormData] = useState({
    nombre: { value: '', isValid: false, showError: false },
    descripcion: { value: '', isValid: false, showError: false },
    fechaInicio: { value: '', isValid: false, showError: false },
    fechaFin: { value: '', isValid: false, showError: false },
    activo: { value: false, isValid: false, showError: false }
  });

  useEffect(() => {
    if (agendaOne) {
      const { nombre, descripcion, fechaInicio, fechaFin, activo } = agendaOne;
      setFormData({
        nombre: { value: nombre || '', isValid: !!nombre, showError: !nombre },
        descripcion: { value: descripcion || '', isValid: !!descripcion, showError: !descripcion },
        fechaInicio: { value: new Date(fechaInicio) || '', isValid: !!fechaInicio, showError: !fechaInicio },
        fechaFin: { value: new Date(fechaFin) || '', isValid: !!fechaFin, showError: !fechaFin },
        activo: { value: activo || false, isValid: true, showError: false }
      });
    }
  }, [agendaOne]);

  const onValueChange = (value, field) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: {
        ...prevData[field],
        value
      }
    }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    update(
      id,
      formData.nombre.value,
      formData.descripcion.value,
      formData.fechaInicio.value,
      formData.fechaFin.value,
      formData.activo.value
    );
    navigate('../agendas');
  };

  const toggleActivo = () => {
    setFormData((prevData) => ({
      ...prevData,
      activo: {
        ...prevData.activo,
        value: !prevData.activo.value
      }
    }));
  };
  
  const getActivoText = (value) => {
    return value ? 'Activado' : 'Desactivado';
  };

  if (isFetchingGetTareasId) {
    return (
      <div className="channel-offline-placeholder">
        <span>Cargando...</span>
      </div>
    );
  }

  return (
    <div className="register-container" style={{ backgroundColor: '#0b141b', marginTop: '5%', height:'auto'}}>
      <div style={{ backgroundColor: '#2a3942', borderRadius: '10px', width: '90%' }}>
        <h1 style={{ textAlign: 'center' }}>Editar Tarea</h1>
      </div>
      <form className="auth-form" onSubmit={handleUpdate}>
        <Input
          field='nombre'
          label={'Nombre'}
          type='text'
          value={formData.nombre.value}
          onChangeHandler={(value) => onValueChange(value, 'nombre')}
          showErrorMessage={formData.nombre.showError}
          validationMessage={''}
        />

        <Input
          field='descripcion'
          label={'Descripción'}
          type='text'
          value={formData.descripcion.value}
          onChangeHandler={(value) => onValueChange(value, 'descripcion')}
          showErrorMessage={formData.descripcion.showError}
          validationMessage={''}
        />

        <div className="datepicker-container">
          <div className="input-label\">
            <label>Fecha Inicio:</label>
          </div>
          <DatePicker
            selected={formData.fechaInicio.value}
            onChange={(date) => onValueChange(date, 'fechaInicio')}
            dateFormat="dd/MM/yyyy"
          />
        </div>

        <div className="datepicker-container">
          <div className="input-label">
            <label>Fecha Fin:</label>
          </div>
          <DatePicker
            selected={formData.fechaFin.value}
            onChange={(date) => onValueChange(date, 'fechaFin')}
            dateFormat="dd/MM/yyyy"
          />
        </div>

        <div>
          <label>Estado:</label>
          <div style={{ fontWeight: 'bold', marginTop: '5px' }}>
            {getActivoText(formData.activo.value)}
          </div>
          <button onClick={toggleActivo} style={{ marginTop: '10px' }}>
            {formData.activo.value ? 'Desactivar' : 'Activar'}
          </button>
        </div>

        <div style={{display:'flex', width:'50%', gap:'10%'}}>
          <button style={{backgroundColor:'#53bdeb'}} disabled={!formData.nombre.isValid || !formData.descripcion.isValid || !formData.activo.isValid}>Actualizar</button>
          <button style={{backgroundColor:'red'}} onClick={handleNaviteToAgendas}>Cancelar</button>
        </div>
      </form>
    </div>
  );
};
