import { Link } from "react-router-dom"
import Logo from "./Logo"
import interceptor from '../lib/interceptor'
import { useNavigate } from "react-router-dom"
import { message } from "antd"
import {
  Form,
  Input,
  Button
} from 'antd'

const http = interceptor()

const Signup = () => {
  const navigate = useNavigate()

  const signup = async (values: any)=>{
    try {
      await http.post('/user/signup', values)
      navigate('/login')
    }
    catch(err: any)
    {
      message.error(err.response.data.message)
    }
  }

  return (
    <div className="h-screen bg-gray-100 flex items-center justify-center">
      <div className="w-8/12 bg-white rounded-lg shadow-lg flex">
        <div className="w-6/12 flex flex-col gap-3 items-center justify-center bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90%">
          <Logo large />
          <p className="text-gray-200 text-lg">An Enterprise Solutions For Project Managment</p>
          <Link to="/login" className="bg-orange-600 text-white px-8 py-3 rounded border border-white border-2 mt-2">Signin</Link>
        </div>
        <div className="p-8 w-6/12">
          <h1 className="text-3xl font-bold mb-6">Register</h1>
          <Form layout="vertical" onFinish={signup}>
            <Form.Item
              label={<label className="font-medium text-[16px]">Fullname</label>}
              name="fullname"
              rules={[{required: true}]}
            >
              <Input 
                placeholder="Fullname"
                size="large"
                className="rounded py-3"
              />
            </Form.Item>

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
              <Button htmlType="submit" className="w-full p-6 bg-orange-600 text-lg font-medium border-0" type="primary">Signup</Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  )
}

export default Signup
