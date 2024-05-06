import './dashboard.css'
import { Navbar } from '../../components/Navbar'
import { Sidebar } from '../../components/Sidebar'
import { DashboardContent } from '../../components/DashboardContent.jsx'
import { useEffect } from 'react'
import { useAgenda } from '../../shared/hooks/useAgenda.jsx'

export const Dashboard = () => {
  const { getTareas, isFetching, allAgendas } = useAgenda() 

  useEffect(()=>{
    getTareas(false)
  }, [])

  return (
    <div className='dashboard-container'>
      <Navbar />
      <Sidebar />
      <DashboardContent agendas={allAgendas}/>
    </div>
  )
}
