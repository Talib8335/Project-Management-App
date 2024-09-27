import { io } from "socket.io-client";

const socket = ()=>{
    return io('http://localhost:8080')
}

export default socket