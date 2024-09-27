import axios from "axios";
import crypto from 'crypto-js'
import { nanoid } from "nanoid";

const SECRET = 'dec7794b1744950cd9a5849be1cba8a64e6e8b8a341c99503340a8f873eacfa90be228d7d4f413e21e1fb869dd4a5d152fa41b24cccc86c74f130386ca765147'
const session = nanoid()
const baseUrl = 'http://localhost:8080'

interface headerInterface {
    Authorization?: string
}

const Interceptor = (headers?: headerInterface)=>{
    const token = crypto.AES.encrypt(session, SECRET).toString()
    const interceptor = axios.create({
        baseURL: baseUrl,
        headers: {
            'X-User-Agent': token,
            ...headers
        },
        withCredentials: true
    })
    return interceptor
}

export default Interceptor 