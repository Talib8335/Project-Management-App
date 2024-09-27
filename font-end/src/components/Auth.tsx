import { useContext, useEffect } from "react"
import Context from "../lib/context"
import { Outlet, useNavigate } from "react-router-dom"
import Interceptor from "../lib/interceptor"
import { Spin } from "antd"
const http = Interceptor()

const Auth = () => {
  const navigate = useNavigate()
  const {session, setSession} = useContext(Context)

  useEffect(()=>{
    const req = async ()=>{
      try {
        const {data} = await http.post('/user/refresh-token')
        setSession(data)
      }
      catch(err)
      {
        navigate("/login")
      }
    }
    req()
  }, [])

  
  if(session)
    return <Outlet />

  return (
    <div className="h-screen flex items-center justify-center">
      <Spin size="large" />
    </div>
  )
}

export default Auth
