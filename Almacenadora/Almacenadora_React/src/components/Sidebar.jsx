import logo from '../assets/img/logo.png'
import addIcon from '../assets/img/Add.png'
import settingsIcon from '../assets/img/Settings.png'
import { useNavigate } from 'react-router-dom'

export const Sidebar = () => {

  const navigate = useNavigate()
  const hanfleNaviteToAgenda = () => {
    navigate('/agenda')
  }
  const handleNaviteToEditUser = () => {
    navigate('/editUser')
  }

  //Codigo momentaneo
  const channels = [
    { id: '22', username: 'LLutin', isOnline: true },
    { id: '21', username: 'Jcruz', isOnline: false }
  ]
  return (
    <div style={{ alignItems: 'center' }} className="sidebar-container">
      <img style={{ width: '50%', marginTop: '15%' }} src={logo} alt="" />
      <h1>RapiNotes</h1>
      <hr style={{ width: '85%' }} />
      <div style={{ alignItems: 'center', height: '10%' }}>
        <div>
          <div className='hover-navbar' style={{ display: 'flex', alignItems: 'center' }}>
            <img onClick={hanfleNaviteToAgenda} style={{ width: 'auto', cursor: 'pointer' }} src={addIcon} />
            <h2 onClick={hanfleNaviteToAgenda} style={{ paddingLeft: '5%', color: '#22c063', cursor: 'pointer' }}>Añadir</h2>
          </div>
        </div>
      </div>
      {
        channels.map((channel) => {
          return (
            <div key={channel.id} className="sidebar-list-item"></div>
          )
        })
      }
      <div onClick={handleNaviteToEditUser} style={{ marginTop: 'auto', display: 'flex', alignItems: 'center', marginBottom: '10%', cursor:'pointer'}}>
        <img style={{ width: '20%' }} src={settingsIcon} alt="" />
        <span style={{ marginLeft: '10%'}}>Settings</span>
      </div>
    </div>
  )
}
