import { useState, useContext, useEffect } from 'react'
import Context from '../../lib/context'
import { Button, Card, Drawer, Input, Table, Form, Select, DatePicker, message, Tag, Dropdown } from 'antd'
import AppLayout from '../AppLayout'
import { EllipsisVertical, Plus } from 'lucide-react'
import Editor from '../Shared/Editor'
import moment from 'moment'
import Interceptor from '../../lib/interceptor'
import useSWR, { mutate } from 'swr'
import fetcher from '../../lib/fetcher'
import { Link, useSearchParams } from 'react-router-dom'
const http = Interceptor()

const Tasks = () => {
  const [open, setOpen] = useState(false)
  const [description, setDescription] = useState('')
  const {session} = useContext(Context)
  const [query] = useSearchParams()
  const projectId = query.get("project")
  const {data: members} = useSWR('/invitation/invited?status=accepted', fetcher)
  const {data: tasks, isLoading: taskLoading} = useSWR(projectId ? `/task/project/${projectId}` : `/task`, fetcher)
  const {data: kanban} = useSWR(projectId ? `/task/kanban/${projectId}` : `/task/kanban`, fetcher)
  const [form] = Form.useForm()
  const [board, setBoard] = useState("sprint")
  
  useEffect(()=>{
    if(projectId)
    {
      form.setFieldsValue({project: projectId})
    }
  }, [projectId])

  const getPriority = (txt: string)=>{
    if(txt === "cold")
      return <Tag color="blue-inverse" className='capitalize'>{txt}</Tag>

    if(txt === "warm")
      return <Tag color="gold-inverse" className='capitalize'>{txt}</Tag>

    if(txt === "hot")
      return <Tag color="magenta-inverse" className='capitalize'>{txt}</Tag>

    return <Tag>{txt}</Tag>
  }

  const createTask = async (values: any)=>{
    try {
        values.description = description
        values.deadline = moment(values.deadline).toDate()
        await http.post('/task', values)
        form.resetFields()
        setOpen(false)
        message.success("Task created successfully !")
        mutate(projectId ? `/task/project/${projectId}` : `/task`)
    }
    catch(err: any)
    {
      message.error(err.response.data.message || err.message)
    }
    
  }

  const getStatus = (status: string)=>{
    if(status === "inprogress")
      return <Tag className='capitalize' color="geekblue-inverse">{status}</Tag>

    if(status === "working")
      return <Tag className='capitalize' color="green-inverse">{status}</Tag>

    if(status === "completed")
      return <Tag className='capitalize' color="green-inverse">{status}</Tag>

    if(status === "paused")
      return <Tag className='capitalize' color="lime-inverse">{status}</Tag>

    if(status === "canceled")
      return <Tag className='capitalize' color="magenta-inverse">{status}</Tag>

    return <Tag className='capitalize'>{status}</Tag>
  }

  const getStatusColor = (status: string) => {
    if (status === "inprogress")
      return {
        dark: '#3b82f6',  // bg-blue-500
        light: '#bfdbfe'  // bg-blue-200
      };
  
    if (status === "working")
      return {
        dark: '#06b6d4',  // bg-cyan-500
        light: '#bae6fd'  // bg-cyan-200
      };
  
    if (status === "completed")
      return {
        dark: '#10b981',  // bg-green-500
        light: '#d1fae5'  // bg-green-200
      };
  
    if (status === "paused")
      return {
        dark: '#ef4444',  // bg-red-500
        light: '#fecaca'  // bg-red-200
      };
  
    if (status === "canceled")
      return {
        dark: '#f59e0b',  // bg-orange-500
        light: '#fef3c7'  // bg-orange-200
      };
  
    return {
      dark: '#6366f1',  // bg-indigo-500
      light: '#e0e7ff'  // bg-indigo-200
    };
  };
  
  const updateStatus = async (status: string, id:string)=>{
    try {
      await http.put(`/task/${id}?project=${projectId ? true : false}`, {status})
      mutate(projectId ? `/task/kanban/${projectId}` : `/task/kanban`)
      mutate(projectId ? `/task/project/${projectId}` : `/task`)
    }
    catch(err: any)
    {
      message.error(err.response.data.message || err.message)
    }
  }

  const taskColumns = [
    {
      title: 'Priority',
      key: 'priority',
      render: (item: any)=>getPriority(item.priority)
    },
    {
      title: 'Title',
      key: 'title',
      render: (item: any)=><Link to={`/tools/tasks/${item._id}`} className='capitalize'>{item.title}</Link>
    },
    {
      title: 'Owner',
      key: 'member',
      render: (item: any)=><label className='capitalize font-medium'>{item.owner.fullname}</label>
    },
    {
      title: 'Member',
      key: 'member',
      render: (item: any)=>(
        <div>
          {
            item.members.map((member: any, index: number)=>(
              <Tag 
                key={index} 
                closable
                className='font-medium capitalize'
              >{member.fullname}</Tag>
            ))
          }
        </div>
      )
    },
    {
      title: 'Deadline',
      key: 'deadline',
      render: (item: any)=>(
        <div className='flex gap-2'>
          <label>{moment(item.createdAt).format('MMM DD YYYY hh:mm:ss A')}</label>
          <label>/</label>
          <label className='font-medium'>{moment(item.deadline).format('MMM DD YYYY hh:mm:ss A')}</label>
        </div>
      )
    },
    {
      title: 'Status',
      key:'status',
      render: (item: any)=>getStatus(item.status)
    }
  ]

  const statusMenu = (id:string)=>{
    return [
      {
        label: (
          <a onClick={()=>updateStatus('inprogress', id)}>Inprogress</a>
        ),
        key: 'inprogress'
      },
      {
        label: (
          <a onClick={()=>updateStatus('working', id)}>Working</a>
        ),
        key: 'working'
      },
      {
        label: (
          <a onClick={()=>updateStatus('completed', id)}>Completed</a>
        ),
        key: 'completed'
      },
      {
        label: (
          <a onClick={()=>updateStatus('paused', id)}>Paused</a>
        ),
        key: 'paused'
      },
      {
        label: (
          <a onClick={()=>updateStatus('canceled', id)}>Canceled</a>
        ),
        key: 'canceled'
      }
    ]
  }

  return (
    <AppLayout>
        <div>
            <Card 
              title={<label className='text-lg font-bold'>Tasklist</label>}
              extra={
                <div className='space-x-3'>
                  <Select className='w-[180px]' size="large" value={board} onChange={(v)=>setBoard(v)}>
                    <Select.Option value="sprint">Sprint</Select.Option>
                    <Select.Option value="kanban">Kanban</Select.Option>
                  </Select>
                  <Button 
                    type="primary" 
                    className='bg-indigo-600'
                    icon={<Plus className='w-4 h-4' />}
                    size="large"
                    onClick={()=>setOpen(true)}
                  >New Task</Button>
                </div>
              }
            >
              {
                board === "sprint" &&
                <Table 
                  loading={taskLoading}
                  columns={taskColumns}
                  dataSource={tasks}
                  rowKey='_id'
                />
              }
              {
                board === "kanban" &&
                <div className='flex gap-8 overflow-auto w-full'>
                  {
                    kanban && kanban.map((item: any, index: number)=>(
                      <Card key={index}>
                        <div className='space-y-6'>
                          <button 
                          style={{
                            background: getStatusColor(item._id).dark
                          }}
                          className='rounded w-full py-3 text-white font-medium capitalize'>{item._id}</button>
                          {
                            item.tasks.map((task: any, taskIndex: number)=>(
                              <Card
                                key={taskIndex}
                                style={{
                                  background: getStatusColor(item._id).light
                                }}
                              >
                                <h1 className='font-medium mb-3'>
                                  {task.title[0].toUpperCase()}
                                  {task.title.slice(1)}
                                </h1>
                                <Tag>ersaurav@gmail.com</Tag>
                                <Dropdown 
                                  className='absolute top-3 right-3'
                                  menu={{items: statusMenu(task._id)}}
                                >
                                  <Button icon={<EllipsisVertical className='w-4 h-4' />} size="small" shape='circle' type="text" />
                                </Dropdown>
                              </Card>
                            ))
                          }
                        </div>
                      </Card>
                    ))
                  }
                  
                  
                </div>
              }
            </Card>
            <Drawer
              open={open}
              width={720}
              onClose={()=>setOpen(false)}
              title="Create Tasklist"
            >
              <Form
                form={form}
                onFinish={createTask}
                layout='vertical'
              >
                {
                  projectId &&
                <Form.Item
                  name="project"
                  hidden
                >
                  <Input readOnly />
                </Form.Item>
                }
                <Form.Item
                  name="title"
                  label={<label className='text-lg font-semibold'>Taskname</label>}
                  rules={[{required: true}]}
                >
                  <Input 
                    placeholder='Enter task title'
                    size="large"
                  />
                </Form.Item>
                <div className='flex gap-4'>
                  <Form.Item
                    className='flex-1'
                    name="owner"
                    label={<label className='text-lg font-semibold'>Owner</label>}
                    rules={[{required: true}]}
                  >
                    <Select size='large' placeholder="Choose Owner">
                      {
                        session &&
                        <Select.Option value={session._id}>{session.fullname}</Select.Option>
                      }
                    </Select>
                  </Form.Item>

                  <Form.Item
                    className='flex-1'
                    name="members"
                    label={<label className='text-lg font-semibold'>Members</label>}
                    rules={[{required: true}]}
                  >
                    <Select size='large' placeholder="Choose employee or team member" mode="multiple">
                      {
                        members &&
                        members.map((item: any, index: number)=>(
                          <Select.Option key={index} value={item.member._id}>
                            {item.member.fullname} - {item.member.email}
                          </Select.Option>
                        ))
                      }
                    </Select>
                  </Form.Item>
                </div>

                <div className='flex gap-4'>
                  <Form.Item
                    className='flex-1'
                    name="priority"
                    label={<label className='text-lg font-semibold'>Priority</label>}
                    rules={[{required: true}]}
                  >
                    <Select size='large' placeholder="Choose Owner">
                      <Select.Option value="cold">Cold</Select.Option>
                      <Select.Option value="warm">Warm</Select.Option>
                      <Select.Option value="hot">Hot</Select.Option>
                    </Select>
                  </Form.Item>

                  <Form.Item
                    className='flex-1'
                    name="deadline"
                    label={<label className='text-lg font-semibold'>Deadline</label>}
                    rules={[{required: true}]}
                  >
                    <DatePicker size="large" className="w-full" />
                  </Form.Item>
                </div>

                <Form.Item label={<label className='text-lg font-semibold'>Description</label>} name="description">
                  <Editor getValue={setDescription}/>
                </Form.Item>

                <Form.Item className='mt-16'>
                  <Button 
                    htmlType="submit" 
                    size="large" 
                    type="primary" 
                    className='bg-indigo-600'>Create Task</Button>
                </Form.Item>
              </Form>
            </Drawer>
        </div>
    </AppLayout>
  )
}

export default Tasks
