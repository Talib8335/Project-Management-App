import { useState } from 'react'
import {
    Form,
    Input,
    Button,
    message
} from 'antd'
import Logo from './Logo'
import { Link } from 'react-router-dom'
import Interceptor from '../lib/interceptor'
import { useNavigate } from 'react-router-dom'

const ForgotPassword = () => {
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const [otp, setOtp] = useState(false)
    const [forgotToken, setForgotToken] = useState('')

    const forgot = async (values: any)=>{
        try {
            setLoading(true)
            const http = Interceptor()
            const {data} = await http.post('/user/forgot-password', values)
            setForgotToken(data.token)
            setOtp(true)
            message.success("Email has been sent to your mail id")
        }
        catch(err: any)
        {
            message.error(err.response.data.message)
        }
        finally {
            setLoading(false)
        }
    }

    const changePassword = async (values: any)=>{
        try {
            setLoading(true)
            const http = Interceptor({
                Authorization: `Bearer ${forgotToken}`
            })
            await http.post('/user/change-password', values)
            message.success("Password has been changed successfully !")
            navigate("/login")
        }
        catch(err: any)
        {
            message.error(err.response.data.message)
        }
        finally {
            setLoading(false)
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
            <h1 className="text-3xl font-bold mb-6">Forgot Password</h1>
            {
                !otp && 
                <Form layout="vertical" onFinish={forgot}>
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

                    <Form.Item>
                    <Button loading={loading} htmlType="submit" className="w-full p-6 bg-orange-600 text-lg font-medium border-0" type="primary">Proceed</Button>
                    </Form.Item>
                </Form>
            }
            {
                otp &&
                <Form layout="vertical" onFinish={changePassword}>
                    <Form.Item
                    label={<label className="font-medium text-[16px]">OTP</label>}
                    name="otp"
                    rules={[{required: true}]}
                    >
                    <Input 
                        placeholder="****"
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
                        placeholder="****"
                        size="large"
                        className="rounded py-3"
                    />
                    </Form.Item>

                    <Form.Item>
                    <Button loading={loading} htmlType="submit" className="w-full p-6 bg-orange-600 text-lg font-medium border-0" type="primary">Proceed</Button>
                    </Form.Item>
                </Form>
            }
            </div>
        </div>
        </div>
    )
}

export default ForgotPassword
