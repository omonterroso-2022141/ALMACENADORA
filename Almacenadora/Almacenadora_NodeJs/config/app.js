//Importaciones de:
//Configuraciones
import helmet from 'helmet'
import cors from 'cors'
import express from 'express'
import morgan from 'morgan'

//MiddleWares
import apiLimiter from '../src/middlewares/validar-cant-peticiones.js'

//BD Mongoose
import { connect } from './mongo.js'

//Routes de entidades
import routerAgenda from '../src/Agenda/Agenda.routes.js'
import authRoutes from '../src/auth/auth.routes.js'

class Server{
    //Configurando el puerto y los Paths
    constructor(){
        this.app = express()
        this.port = process.env.PORT
        this.agendaPath = '/Notas/v1/Agenda'
        this.userPath = '/Notas/v1/User'
        
        this.middlewares()
        this.conectarDB()
        this.routes()
    }

    //Conectando a la db
    async conectarDB(){
        await connect()
    }

    //Configurando el serverd
    middlewares(){
        this.app.use(express.urlencoded({ extended: false }))
        this.app.use(cors())
        this.app.use(express.json())
        this.app.use(helmet())
        this.app.use(morgan('dev'))
        this.app.use(apiLimiter)
    }

    //Cargando Rutas
    routes(){
        this.app.use(this.agendaPath, routerAgenda)
        this.app.use(this.userPath, authRoutes)
    }

    //Puerta de enlace
    listen(){
        this.app.listen(this.port, () => {
            console.log(`Server HTTP running in port ${this.port}`)
        })
    }
}

export default Server





