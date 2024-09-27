import { Button, Card, Form, Input, message } from 'antd'
import AppLayout from '../AppLayout'
import { Calendar, Folder } from 'lucide-react'
import { Link } from 'react-router-dom'
import Interceptor from '../../lib/interceptor'
import useSWR, { mutate } from 'swr'
import fetcher from '../../lib/fetcher'
import moment from 'moment'
const http = Interceptor()

const Projects = () => {
  const [form] = Form.useForm()
  const {data: projects, isLoading} = useSWR('/project', fetcher)


  const createProject = async (values: any)=>{
    try {
        await http.post('/project', values)
        form.resetFields()
        mutate('/project')
    }
    catch(err: any)
    {
      message.error(err.response.data.message || err.message)
    }
  }
  return (
    <AppLayout>
        <div className='space-y-12'>
          <div className='h-[150px] flex items-center justify-center rounded-lg bg-gray-200'>
            <Form onFinish={createProject} form={form}>
              <Form.Item
                name="title"
                rules={[{required: true}]}
              >
                <Input 
                  placeholder='Create new project'
                  className='w-[500px]' 
                  size="large" 
                  suffix={<Button htmlType="submit" type="text" className='font-medium'>Add</Button>}
                />
              </Form.Item>
            </Form>
          </div>
          <div className='grid grid-cols-4 gap-8'>
            {
              projects && projects.map((item: any, index: number)=>(
                <Link key={index} to={`/tools/tasks?project=${item._id}`}>
                  <Card hoverable>
                    <div className='flex flex-col items-center justify-center'>
                      <Folder className='text-amber-500 mb-2' />
                      <h1 className='text-base capitalize font-medium'>{item.title}</h1>
                      <div className='text-gray-600 flex items-center mt-1'>
                        <Calendar className='w-4 h-4 mr-2' />
                        <label>{moment(item.createdAt).format('MMM DD YYYY hh:mm A')}</label>
                      </div>
                    </div>
                  </Card>
                </Link>
              ))
            }
          </div>
        </div>
    </AppLayout>
  )
}

export default Projects
