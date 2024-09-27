import React from 'react'
import AppLayout from '../AppLayout'
import socket from '../../lib/socket'

const Chat = () => {
    const sidebarWidth = 250
    const asideWidth = 350
    const io = socket()

    return (
        <AppLayout>
            <div>
                <aside className='border-r fixed top-20 h-full p-4 overflow-auto' style={{
                    left: sidebarWidth,
                    width: asideWidth
                }}>
                    dfsddg
                </aside>
                <section className='h-full overflow-auto fixed top-20 p-4'
                    style={{
                        left: (sidebarWidth+asideWidth),
                        width: `calc(100% - ${sidebarWidth+asideWidth}px)`
                    }}
                >sdfsd</section>
            </div>
        </AppLayout>
    )
}

export default Chat
