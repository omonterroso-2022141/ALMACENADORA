import logo from '../assets/img/EscudoPeque.svg'
import userIcon from '../assets/img/User.png'
import logoutIcon from '../assets/img/Logout.png'
import { useUserDetails } from '../shared/hooks/useUserDetails.jsx'
import { useNavigate } from 'react-router-dom'

const NavLogo = () => {
    return (
        <div className="nav-logo-container">
            <img
                className="nav-logo"
                width='100%'
                height='100%'
                src={logo}
                alt="Logo.svg"
            />
        </div>
    )
}

const NavButton = ({ text, onClickHandler }) => {
    return (
        <span className='nav-button' onClick={onClickHandler}>
            {text}
        </span>
    )
}

export const Navbar = () => {
    const { isLogged, logoutSys } = useUserDetails()
    const navigate = useNavigate()

    const handleLogout = () => {
        logoutSys()
    }
    const handleNaviteToLogin = () => {
        navigate('/auth')
    }
    const hanfleNaviteToAgenda = () => {
        navigate('/agenda')
    }
    const handleNaviteToEditUser = () => {
        navigate('/editUser')
    }
    return (
        <div className="nav-container">
            <div className='nav-buttons-container'>
                <span style={{marginLeft:'1%'}}>Anota lo que importa, cuando importa</span>
                {
                    !isLogged ? (
                        <NavButton text='Login' onClickHandler={handleNaviteToLogin} />
                    ) : (
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <img style={{ width: '13%' }} src={userIcon} />
                            <NavButton text='Account' onClickHandler={handleNaviteToEditUser} />
                            <hr style={{ height: '20px' }} />
                            <img style={{ width: '12%' }} src={logoutIcon} alt="" />
                            <NavButton text='LogOut' onClickHandler={handleLogout} />
                        </div>
                    )
                }
            </div>
        </div>
    )
}