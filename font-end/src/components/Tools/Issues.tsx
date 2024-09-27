import { Card, Input, Form, Select, Button } from 'antd'
import AppLayout from '../AppLayout'
import { Calendar } from 'lucide-react'

const Issues = () => {
  return (
    <AppLayout>
        <div className='w-8/12 mx-auto py-4 space-y-8'>
            <Select size='large' placeholder="Choose a Project">
              <Select.Option value="ecom">Ecom Website</Select.Option>
            </Select>
            <div className='flex flex-col gap-8'>
              <Card className='bg-rose-100 border-none w-9/12 self-start'>
                <h1 className='text-base font-medium mb-2'>Fix the bug as soon as possible</h1>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum numquam labore eligendi perferendis sapiente ad omnis! Eos excepturi itaque sapiente accusantium blanditiis magnam possimus, dicta nisi, quisquam suscipit quas sunt?</p>
                <div className='flex flex-col mt-3'>
                 <label className='font-medium'>Er Talib</label>
                 <div className='flex gap-2 items-center text-gray-600'>
                  <Calendar className='w-4 h-4' />
                  June 20 2024 08:00Pm
                 </div>
                </div>
              </Card>

              <Card className='bg-indigo-100 border-none w-9/12 self-end'>
                <h1 className='text-base font-medium mb-2'>Fix the bug as soon as possible</h1>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum numquam labore eligendi perferendis sapiente ad omnis! Eos excepturi itaque sapiente accusantium blanditiis magnam possimus, dicta nisi, quisquam suscipit quas sunt?</p>
                <div className='flex flex-col mt-3'>
                 <label className='font-medium'>Er sanjay</label>
                 <div className='flex gap-2 items-center text-gray-600'>
                  <Calendar className='w-4 h-4' />
                  June 20 2024 08:00Pm
                 </div>
                </div>
              </Card>

              <Card className='bg-green-100 border-none w-9/12 self-start'>
                <h1 className='text-base font-medium mb-2'>Fix the bug as soon as possible</h1>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum numquam labore eligendi perferendis sapiente ad omnis! Eos excepturi itaque sapiente accusantium blanditiis magnam possimus, dicta nisi, quisquam suscipit quas sunt?</p>
                <div className='flex flex-col mt-3'>
                 <label className='font-medium'>Er Saurav</label>
                 <div className='flex gap-2 items-center text-gray-600'>
                  <Calendar className='w-4 h-4' />
                  June 20 2024 08:00Pm
                 </div>
                </div>
              </Card>

              <Card className='bg-blue-100 border-none w-9/12 self-end'>
                <h1 className='text-base font-medium mb-2'>Fix the bug as soon as possible</h1>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum numquam labore eligendi perferendis sapiente ad omnis! Eos excepturi itaque sapiente accusantium blanditiis magnam possimus, dicta nisi, quisquam suscipit quas sunt?</p>
                <div className='flex flex-col mt-3'>
                 <label className='font-medium'>Er santosh</label>
                 <div className='flex gap-2 items-center text-gray-600'>
                  <Calendar className='w-4 h-4' />
                  June 20 2024 08:00Pm
                 </div>
                </div>
              </Card>

              <Form layout='vertical'>
                <Form.Item name="title" label={<h1 className='font-medium text-lg'>Enter your comment</h1>} rules={[{required: true}]}>
                  <Input.TextArea rows={8} />
                </Form.Item>
                <Form.Item>
                  <Button size="large" type="primary" htmlType='submit'>Submit</Button>
                </Form.Item>
              </Form>
            </div>
        </div>
    </AppLayout>
  )
}

export default Issues
