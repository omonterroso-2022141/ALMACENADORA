import { Route, Routes } from 'react-router-dom'
import { Agendas } from './Agenda/Agendas.jsx'
import { AgendaView } from './Agenda/AgendaView.jsx'
 
export const DashboardContent = ({agendas, setestado}) => {
  return (
    <div className="content-container">
      <Routes>
        <Route path='agendas' element={<Agendas dataAgendas={agendas}/>}/>
        <Route path='agendas/:id' element={<AgendaView setestado={setestado}/>}/>
      </Routes>
    </div>
  )
}
