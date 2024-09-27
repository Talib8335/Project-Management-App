import { createClient } from "redis";

const client = createClient()

client.on('error', ()=>{
    console.error("Unable to connect with redis")
    process.exit(1)
})

client.connect().then(()=>{
    console.log("Connected with redis")
})

export default client