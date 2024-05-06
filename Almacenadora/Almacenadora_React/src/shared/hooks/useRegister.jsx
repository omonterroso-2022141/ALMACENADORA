import { useState } from 'react'
import { registerRequest } from '../../services/api'
import toast from 'react-hot-toast'

export const useRegister = () => {
    const [isLoading, setIsLoading] = useState(false)

    const register = async(email, username, password)=>{
        setIsLoading(true)
        const user = {
            email,
            username,
            password
        }
        const response = await registerRequest(user)
        setIsLoading(false)
        if(response.error){
          if(response?.err?.response?.data?.errors){
            let arr = response?.err?.response?.data?.errors
            for (const error of arr) {
              return toast.error(
                error.msg
              )
            }
          }
            return toast.error(
              response?.err?.response?.data?.msg ||
              response?.err?.data?.msg ||
              'Error al registrar el usuario, intenta de nuevo.'
            )
        }
    }

  return {
    register,
    isLoading
  }
}
