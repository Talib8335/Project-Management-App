import Interceptor from "./interceptor"
const http = Interceptor()

const fetcher = async (url: string)=>{
    try {
        const {data} = await http.get(url)
        return data
    }
    catch(err: any)
    {
        throw new Error(err)
    }
}

export default fetcher