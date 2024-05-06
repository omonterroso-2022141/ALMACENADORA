import axios from "axios"

const apiClient = axios.create({
    baseURL: 'http://localhost:2800/Notas/v1',
    timeout: 5000
})

apiClient.interceptors.request.use(
    (config)=>{
        const userDetails = localStorage.getItem('user')
        if(userDetails){
            const token = JSON.parse(userDetails).token
            config.headers.Authorization = `Bearer ${token}`
        }
        return config
    }, (err)=> Promise.reject(err)
)

export const registerRequest = async(data)=>{
    try{
        return await apiClient.post('/User/register', data)
    }catch(err){
        return {
            error: true,
            err
        }
    }
}

export const loginRequest = async(user)=>{
    try{
        return await apiClient.post('/User/login', user)
    }catch(err){
        return {
            error: true,
            err
        }
    }
}

export const updateUser = async(user)=>{
    try{
        return await apiClient.put('/User/updateUser', user)
    }catch(err){
        return {
            error: true,
            err
        }
    }
}

export const getChannelsIsRequest = async()=>{
    try{
        return await apiClient.get('/channels')       
    }catch(err){
        return {
            error: true,
            err: err
        }
    }
}

export const postAgenda = async(data)=>{
    try{
        return await apiClient.post('/Agenda/addAgenda', data)       
    }catch(err){
        return {
            error: true,
            err: err
        }
    }
}

export const getAgenda = async()=>{
    try{
        return await apiClient.get('/Agenda/viewAgenda')       
    }catch(err){
        return {
            error: true,
            err: err
        }
    }
}

export const getAgendaId = async(id)=>{
    try{
        return await apiClient.get(`/Agenda/viewAgendaId/${id}`)       
    }catch(err){
        return {
            error: true,
            err: err
        }
    }
}

export const updateAgenda = async(id, data)=>{
    try{
        return await apiClient.put(`/Agenda/updatedAgenda/${id}`, data)       
    }catch(err){
        return {
            error: true,
            err: err
        }
    }
}

export const deleteAgenda = async(id)=>{
    try{
        return await apiClient.delete(`/Agenda/deleteAgenda/${id}`)       
    }catch(err){
        return {
            error: true,
            err: err
        }
    }
}