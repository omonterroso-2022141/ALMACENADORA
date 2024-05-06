import { useState } from 'react'
import toast from 'react-hot-toast'
import { updateUser } from '../../services/api.js'

export const useEditUser = () => {
    const [isLoading, setIsLoading] = useState(false)

    const update = async(email, username, password)=> {
        setIsLoading(true)
        const data = {
          email,
          username,
          password
        }
        const response = await updateUser(data)
        setIsLoading(false)
    
        if(response.error){
            return toast.error(
                response?.e?.response?.data ||
                'Error general al intentar actualizar. Intenta de nuevo.'
            )
        }
    }
  return {
    update, 
    isLoading
  }
}
