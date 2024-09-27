import { useContext } from "react"
import Context from "../lib/context"
import { Link } from "react-router-dom"
import Logo from "./Logo"
import { message } from "antd"
import Interceptor from "../lib/interceptor"
import {
  Form,
  Input,
  Button
} from 'antd'
import { useNavigate } from "react-router-dom"
const http = Interceptor()


const Login = () => {
  const {setSession} = useContext(Context)
  const navigate = useNavigate()

  const login = async (values: any)=>{
    try {
      const {data} = await http.post('/user/login', values)
      setSession(data)
      navigate("/tools/dashboard")
    }
    catch(err: any)
    {
      message.error(err.response.data.message)
    }
  }

  return (
    <div className="h-screen bg-gray-100 flex items-center justify-center">
      <div className="w-7/12 bg-white rounded-lg shadow-lg flex">
        <div className="w-6/12 flex flex-col gap-3 items-center justify-center bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90%">
          <Logo large />
          <p className="text-gray-200 text-lg">An Enterprise Solutions For Project Managment</p>
          <Link to="/signup" className="bg-orange-600 text-white px-8 py-3 rounded border border-white border-2 mt-2">
          Register Now
          </Link>
        </div>
        <div className="p-8 flex-1">
          <h1 className="text-3xl font-bold mb-6">Sign In</h1>
          <Form layout="vertical" onFinish={login}>
            <Form.Item
              label={<label className="font-medium text-[16px]">Email</label>}
              name="email"
              rules={[{required: true}]}
            >
              <Input 
                placeholder="example@mail.com"
                size="large"
                className="rounded py-3"
              />
            </Form.Item>

            <Form.Item
              label={<label className="font-medium text-[16px]">Password</label>}
              name="password"
              rules={[{required: true}]}
            >
              <Input 
                placeholder="********"
                size="large"
                type="password"
                className="rounded py-3"
              />
            </Form.Item>

            <Form.Item>
              <Button htmlType="submit" className="w-full p-6 bg-orange-600 text-lg font-medium border-0" type="primary">Login</Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  )
}

export default Login
