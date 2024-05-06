import { useState } from 'react'
import toast from 'react-hot-toast'
import { loginRequest } from '../../services/api.js'
import { useNavigate } from 'react-router-dom'

export const useLogin = () => {
    const [isLoading, setIsLoading] = useState(false)
    const navigate = useNavigate()

    const login = async(email, password)=> {
        setIsLoading(true)
        const user = {
          email,
          password
        }
        const response = await loginRequest(user)
        setIsLoading(false)
    
        if(response.error){
            return toast.error(
                response?.e?.response?.data ||
                'Error general al intentar logearse. Intenta de nuevo.'
            )
        }
        const { userDetails }  = response.data
        localStorage.setItem('user', JSON.stringify(userDetails))
        localStorage.setItem('token', userDetails.token)
        navigate('/agendas')
    }
  return {
    login, 
    isLoading
  }
}
