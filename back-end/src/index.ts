import 'dotenv/config'
import '../lib/db.lib'
import '../lib/redis.lib'
import cors from 'cors'
import crypto from 'crypto-js'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import express, {Request, Response} from "express"
const app = express()
import socket from '../lib/socket.lib'
socket(app)

// Routes
import projectRouter from './project/project.routes'
import taskRouter from './task/task.routes'
import invitationRouter from './invitation/invitation.routes'
import userRouter from './user/user.routes'


app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}))
app.use((req, res, next)=>{
    const userAgent = req.headers['x-user-agent']

    if(!userAgent)
        return res.status(400).send("Invalid Request !")
    
    const {sigBytes} = crypto.AES.decrypt(userAgent as string, process.env.USER_AGENT_SECRET as string)

    if(sigBytes < 0)
        return res.status(400).send("Invalid Request !")

    // Verified user agent
    next()
})

app.use(cookieParser())
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

app.get('/test', (req: Request, res: Response)=>{
    res.json({success: true})
})
app.use('/user', userRouter)
app.use('/invitation', invitationRouter)
app.use('/task', taskRouter)
app.use('/project', projectRouter)