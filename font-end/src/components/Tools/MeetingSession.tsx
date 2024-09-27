import React, {useEffect, useRef} from 'react'
import AppLayout from '../AppLayout'
import { Button, Form, Input, message, Tooltip } from 'antd'
import { ScreenShare, Send, Video } from 'lucide-react'

const MeetingSession = () => {
    const videoEl = useRef<HTMLVideoElement | null>(null)
    
    const toggleVideo = async ()=>{
        try {
            if(videoEl.current && videoEl.current.srcObject)
            {
                const tracks = (videoEl.current.srcObject as MediaStream).getTracks()
                tracks.forEach((track)=>track.stop())
                videoEl.current.srcObject = null
            }

            else {
                const stream:MediaStream = await navigator.mediaDevices.getUserMedia({
                    video: true,
                    // audio: true
                })
                if(videoEl.current)
                {
                    videoEl.current.srcObject = stream
                    videoEl.current.play()
                }
            }
        }
        catch(err: any)
        {
            message.error(err.message)
        }
    }

    const shareScreen = async ()=>{
        try {
            if(videoEl.current && videoEl.current.srcObject)
            {
                const tracks = (videoEl.current.srcObject as MediaStream).getTracks()
                tracks.forEach((track)=>track.stop())
                videoEl.current.srcObject = null
            }
            else {
                const stream: MediaStream  = await navigator.mediaDevices.getDisplayMedia({
                    video: true
                })
                if(videoEl.current)
                {
                    videoEl.current.srcObject = stream
                    videoEl.current.play()
                }
            } 
        }
        catch(err: any)
        {
            message.error(err.message)
        }
    }

    return (
        <AppLayout>
            <div className='flex items-start gap-8'>
                <div className='h-[480px] bg-black w-8/12 rounded-lg'>
                    <video
                        ref={videoEl} 
                        className='w-full h-full object-cover rounded-lg'
                        playsInline
                        poster='https://c0.wallpaperflare.com/preview/389/615/630/business-businessman-communication-concept.jpg'
                    />
                    <div className='mt-6 flex justify-between items-center'>
                        <h1 className='text-lg font-medium'>Give me new product update</h1>
                        <div className='space-x-4'>
                            <Tooltip title="Toggle video">
                                <Button icon={<Video className='w-4 h-4'/>} onClick={toggleVideo} />
                            </Tooltip>

                            <Tooltip title="Share screen">
                                <Button icon={<ScreenShare className='w-4 h-4'/>} onClick={shareScreen} />
                            </Tooltip>
                        </div>
                    </div>
                </div>
                <div className='bg-gray-100 h-[480px] overflow-auto flex-1 rounded-lg p-4'>
                    <Form>
                        <Form.Item>
                            <Input.TextArea rows={4} placeholder='Enter your message here'/>
                        </Form.Item>
                        <Form.Item>
                            <Button size="large" htmlType="submit" type="primary" icon={<Send className='w-4 h-4 mr-2'/>} className='w-full bg-violet-600'>Send</Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        </AppLayout>
    )
}

export default MeetingSession
