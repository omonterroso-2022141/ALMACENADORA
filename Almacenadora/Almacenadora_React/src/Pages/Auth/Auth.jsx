import { Register } from "../../components/Register.jsx"
import { Login } from "../../components/Login.jsx"
import { useState } from "react"
import './Auth.css'

export const Auth = () => {
  const [isLogin, setIsLogin] = useState(true)
  const handleAuthPage = ()=>{
    setIsLogin(prev=> !prev)
  }

  return (
    <>
    <div className="auth-container">
      {
        isLogin ? (
          <Login switchAuthHandler={handleAuthPage}></Login>
        ) : (
          <Register switchAuthHandler={handleAuthPage}></Register>
        )
      }
    </div>
    </>
  )
}
