import { useEffect, useContext } from 'react'
import Context from '../../lib/context'
import { Form, Button, Card, Table, Input, message, Tag } from 'antd'
import AppLayout from '../AppLayout'
import useSWR, { mutate } from 'swr'
import Interceptor from '../../lib/interceptor'
import moment from 'moment'
import socket from '../../lib/socket'
const io = socket()
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

const Members = () => {
  const {session} = useContext(Context)
  const {data} = useSWR('/invitation/invited', fetcher)

  useEffect(()=>{
    io.on('invitation-updated', (data: any)=>{
      if(data.admin === session.id)
      {
        mutate('/invitation/invited')
      }
    })
  }, [])

  const inviteMember = async (values: any)=>{
    try {
      await http.post('/invitation', values)
      mutate('/invitation/invited')
    }
    catch(err: any)
    {
      console.log(err)
      message.error(err.message)
    }
  }

  const getStatus = (status: string)=>{
    if(status === "invited")
      return <Tag className='capitalize' color="blue-inverse">{status}</Tag>

    if(status === "accepted")
      return <Tag className='capitalize' color="green-inverse">{status}</Tag>

    if(status === "rejected")
      return <Tag className='capitalize' color="magenta-inverse">{status}</Tag>

    return <Tag className='capitalize'>{status}</Tag>
  }

  const columns = [
    {
      title: 'Fullname',
      key: 'fullname',
      render: (item: any)=><label className='capitalize font-medium'>{item.member.fullname}</label>
    },
    {
      title: 'Email',
      key: 'email',
      render: (item: any)=><label>{item.member.email}</label>
    },
    {
      title: 'Status',
      key: 'status',
      render: (item: any)=>getStatus(item.status)
    },
    {
      title: 'Invited at',
      key: 'invitedAt',
      render: (item: any)=><label>{moment(item.createdAt).format('MMM DD YYYY hh:mm:ss A')}</label>
    }
  ]
  
  return (
    <AppLayout>
        <div className='space-y-8'>
          <div
            className='p-12 rounded-xl text-center'
            style={{backgroundImage: 'linear-gradient(to top, #1e3c72 0%, #1e3c72 1%, #2a5298 100%)'}}
          >
            <h1 className='text-4xl text-white text-center font-semibold'>Invite Members</h1>
            <p className='text-gray-200 text-center'>Invite any user with email id to start working with his or her</p>
            <Form onFinish={inviteMember}>
              <Form.Item
                name="email"
                rules={[{required: true}]}
              >
                <Input 
                  size="large"
                  placeholder='Enter email id'
                  className='rounded mt-6 w-9/12'
                  suffix={<Button type="text" htmlType='submit' className='font-medium'>Invite</Button>}
                />
              </Form.Item>
            </Form>
          </div>
          {
            data && 
            <Table 
              dataSource={data}
              columns={columns}
              rowKey="_id"
            />

          }
        </div>
    </AppLayout>
  )
}

export default Members
