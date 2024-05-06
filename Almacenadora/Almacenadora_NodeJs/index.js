import { config } from 'dotenv'
config()

import Server from './config/app.js'

const server = new Server()

server.listen()