import { AgendaCard } from './AgendaCard.jsx'
import { useAgenda } from '../../shared/hooks/useAgenda.jsx'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'

export const Agendas = ({ dataAgendas = [] }) => {

  const { eliminarTareas, isFetching } = useAgenda()
  const navigate = useNavigate()

  const eliminar = () => {
    eliminarTareas(event.target.id)
    window.location.reload()
  }

  const actualizar = (event) => {
    navigate(`/agendas/${event.target.id}`);
  };
  

  return (
    <div>
        <h1 style={{ backgroundColor: '#202c33', width: '50%', textAlign: 'center', borderRadius: '10px', marginLeft: '20%', border: 'solid 5px #0b141b' }}>Tareas</h1>
      <div className='channels-container'>
        {
          dataAgendas.map((agenda) => (
            <AgendaCard
              key={agenda.id}
              id={agenda.id}
              nombre={agenda.nombre}
              descripcion={agenda.descripcion}
              fechaInicio={agenda.fechaInicio}
              fechaFin={agenda.fechaFin}
              activo={agenda.activo}
              eliminar={eliminar}
              actulizarPage={actualizar}
            />
          ))
        }
      </div>
    </div>
  )
}

