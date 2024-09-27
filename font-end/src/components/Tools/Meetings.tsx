import { useState } from 'react'
import AppLayout from '../AppLayout'
import { Input, Form, Select, Button, DatePicker, FloatButton, Modal, Card, Tag, Avatar}  from 'antd'
import { Calendar, Plus } from 'lucide-react'
import useSWR from 'swr'
import fetcher from '../../lib/fetcher'
import moment from 'moment'
import { Link } from 'react-router-dom'

const Meetings = () => {
  const [form] = Form.useForm()
  const [open, setOpen] = useState(false)
  const {data} = useSWR('/invitation/invited?status=accepted', fetcher)

  console.log(data)

  const closeDialog = ()=>{
    setOpen(false)
    form.resetFields()
  }

  const createMeeting = (values: any)=>{
    values.date = moment(values.date).toDate()
    console.log(values)
    closeDialog()
  }

  return (
    <AppLayout>
        <div className='grid grid-cols-4 gap-8'>
          {
            Array(20).fill(0).map((item: any, index: number)=>(
              <Link to="/tools/meetings/123456789">
                <Card hoverable key={index}>
                  <h1>Give me an update on new project</h1>
                  <div className='flex items-center gap-1 my-2 text-gray-500'>
                    <Calendar className='w-3 h-3' />
                    June 20 2024 08:00 Pm
                  </div>
                  <Tag color="green-inverse">Running</Tag>
                </Card>
              </Link>
            ))
          }
        </div>
        <FloatButton onClick={()=>setOpen(true)} icon={<Plus className='w-4 h-4 ml-[2px]' />} type='primary' className='flex items-center justify-center' />
        <Modal footer={null} open={open} title="New Meeting" onCancel={closeDialog}>
          <Form layout='vertical' onFinish={createMeeting} form={form}>
            <Form.Item label="Enter Meeting Title" name="title" rules={[{required: true}]}>
              <Input size="large" placeholder="Give me an update about new project" />
            </Form.Item>

            <Form.Item label="Description" name="description" rules={[{required: true}]}>
              <Input.TextArea size="large" placeholder="Tell me more" rows={5} />
            </Form.Item>

            <Form.Item label="Invite members" name="members" rules={[{required: true}]}>
              <Select size="large" placeholder="Choose members" mode="multiple">
                {
                  data && data.map((item: any, index: number)=>(
                    <Select.Option 
                      key={index} 
                      value={item.member._id}
                    >{item.member.email}</Select.Option>
                  ))
                }
              </Select>
            </Form.Item>

            <Form.Item label="Date" name="date" rules={[{required: true}]}>
              <DatePicker size="large" showTime />
            </Form.Item>

            <Form.Item>
              <Button htmlType="submit" type="primary" className='bg-violet-600' size="large">Schedule</Button>
            </Form.Item>
          </Form>
        </Modal>
    </AppLayout>
  )
}

export default Meetings
