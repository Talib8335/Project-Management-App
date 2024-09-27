import { Link } from "react-router-dom"
import Interceptor from '../../lib/interceptor'
import { message } from "antd"
const http = Interceptor()

const Home = () => {
  const test = async ()=>{
    try {
      const {data} = await http.get("/test")
      console.log(data)
    }
    catch(err)
    {
      console.log(err)
    }
  }

  const refresh = async ()=>{
    try {
      const {data} = await http.post("/user/refresh-token")
      console.log(data)
    }
    catch(err)
    {
      message.error("Failed")
    }
  }

  return (
    <div className="flex gap-8">
      <Link to="/login">Login</Link>
      <Link to="/signup">Signup</Link>
      <button onClick={test}>test</button>
      <button onClick={refresh}>refresh</button>
    </div>
  )
}

export default Home
