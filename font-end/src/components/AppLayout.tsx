import { FC, ReactNode, useState, useContext, useEffect, useRef } from "react"
import { useNavigate } from "react-router-dom"
import Context from "../lib/context"
import { Button, Divider, Drawer, Dropdown, message, Modal } from "antd"
import { useLocation, Link } from "react-router-dom"
import Logo from "./Logo"
import socket from "../lib/socket"
import { 
    AlarmClockCheck,
    AlignRight, 
    Bell, 
    Calendar, 
    CalendarCheck2, 
    CircleGauge,
    LogOut,
    MessageCircle,
    Plus,
    Presentation,
    Projector,
    Settings,
    User,
} from "lucide-react"
import Interceptor from "../lib/interceptor"
import useSWR, {mutate} from "swr"
import fetcher from "../lib/fetcher"
const http = Interceptor()
const io = socket()

interface AppLayoutInterface {
    children: ReactNode
}

const AppLayout: FC<AppLayoutInterface> = ({children}) => {
    const audio = useRef<HTMLAudioElement | null>(null)
    const [invitation, setInvitation] = useState<any | null>(null)
    const navigate = useNavigate()
    const {session, setSession } = useContext(Context)
    const location = useLocation()
    const path = location.pathname.split("/")
    const [space, setSpace] = useState(250)
    const [open, setOpen] = useState(false)
    const {data, error, isLoading } = useSWR('/invitation/mine', fetcher)

    // Refreshing token
    useEffect(()=>{
        const req = async ()=>{
            try {
                const {data} = await http.post('/user/refresh-token')
                setSession(data)
            }
            catch(err)
            {
                console.log(err)
                setSession(null)
            }
        }
        req()
    }, [])

    // LIve invitation notification
    useEffect(()=>{
        const player = audio.current
        if(player && session)
        {
            io.on('invitation', (data)=>{
                if(data.member === session._id)
                {
                    player.src = "/sound/notification.mp3"
                    player.load()
                    player.play()
                    setInvitation(data)
                }
            })
        }

    }, [session])

    // Checking user has invitation
    useEffect(()=>{
        if(data && data.length > 0)
        {
            setOpen(true)
        }
        else {
            setOpen(false)
        }
    }, [data])


    const updateInvitation = async (item: any, status: string)=>{
        try {
            await http.put(`/invitation/${item._id}`, {
                status,
                admin: item.admin._id
            })
            mutate('/invitation?member=true')
        }   
        catch(err: any)
        {
            message.error(err.response.data.message || err.message)
        }
    }

    const logout = async ()=>{
        try {
            await http.post('/user/logout')
            navigate("/")
        }
        catch(err: any)
        {
            message.error(err.response.data.message || err.message)
        }
    }

    const menus = [
        {
            label: 'Dashboard',
            icon: <CircleGauge className="w-4 h-4 mr-1"/>,
            link: '/tools/dashboard'
        },
        {
            label: 'Members',
            icon: <User className="w-4 h-4 mr-1"/>,
            link: '/tools/members'
        },
        {
            label: 'Chat',
            icon: <MessageCircle className="w-4 h-4 mr-1"/>,
            link: '/tools/chat'
        },
        {
            label: 'Projects',
            icon: <Presentation className="w-4 h-4 mr-1"/>,
            link: '/tools/projects'
        },
        {
            label: 'Meetings',
            icon: <Projector className="w-4 h-4 mr-1"/>,
            link: '/tools/meetings'
        },
        {
            label: 'Task',
            icon: <AlarmClockCheck className="w-4 h-4 mr-1"/>,
            link: '/tools/tasks'
        },
        {
            label: 'Events',
            icon: <Calendar className="w-4 h-4 mr-1"/>,
            link: '/tools/events'
        },
        {
            label: 'Issues',
            icon: <CalendarCheck2 className="w-4 h-4 mr-1"/>,
            link: '/tools/issues'
        },
    ]

    const dropdownMenu: any = {
        items: [
            {
                key: 'fullname',
                label: (
                    <a className="capitalize font-medium">{session && session.fullname}</a>
                )
            },
            {
                key: 'email',
                label: (
                    <a>{session && session.email}</a>
                )
            },
            {
                type: 'divider'
            },
            {
                key: 'logout',
                label: (
                    <a className="flex items-center gap-2" onClick={logout}>
                        <LogOut className="w-4 h-4" />
                        Logout
                    </a>
                )
            }
        ]
    }

    const Toggler = ()=>{
        return (
            <Button 
                icon={<AlignRight />} 
                type="text" 
                className="text-[#FF8F00] app-layout-menu-btn-icon"
                onClick={()=>setSpace(space === 0 ? 250 : 0)}
            />
        )
    }

    return (
        <div>
        <nav 
            className="bg-gray-900 fixed top-0 left-0 h-full overflow-hidden space-y-8 z-[10000]"
            style={{
                width: space,
                transition: '0.3s'
            }}
        >
            <div className="flex justify-between bg-slate-800 p-3 items-center">
                <Logo />
                <Toggler />
            </div>

            <div className="flex flex-col">
                <h1 className="text-gray-400 text-base px-3 mb-2">General</h1>
                {
                    menus.map((item, index)=>(
                        <Link to={item.link} key={index}>
                            <Button
                                icon={item.icon}
                                type="primary"
                                className={`w-full ${item.link !== location.pathname && 'app-layout-menu-btn'} bg-transparent shadow-none rounded-none flex items-center justify-start py-6 px-7`}
                                style={{
                                    background: item.link === location.pathname ? '#FF8F00' : 'inherit'
                                }}
                            >{item.label}</Button>
                        </Link>
                    ))
                }
            </div>
        </nav>

        <main 
            style={{
                width: `calc(100% - ${space}px)`,
                marginLeft: space,
                transition: '0.3s'
            }}
        >
            <nav
                className="p-4 fixed top-0 shadow flex justify-between items-center bg-white z-[1000]"
                style={{
                    width: `calc(100% - ${space}px)`,
                    left: space,
                    transition: '0.3s'
                }}
            >
                <div className="flex items-center gap-3 p-1">
                    { space === 0 && <Toggler /> }
                    <h1 className="font-semibold capitalize">{path[path.length-1]}</h1>
                </div>

                <div className="flex items-center gap-3">
                    <Button icon={<Plus className="w-4 h-4"/>} />
                    <Button icon={<Bell className="w-4 h-4"/>} />
                    <Button icon={<Settings className="w-4 h-4"/>} />
                    <Dropdown menu={dropdownMenu}>
                        <img src="/images/avt.jpg" className="w-12 h-12 rounded-full object-fit" />
                    </Dropdown>
                </div>
            </nav>

            <section className="mt-24 px-8 pb-16">
                {children}
            </section>
                
            <footer
                className="p-6 fixed bottom-0 border-t border-gray-100 bg-white"
                style={{
                    width: `calc(100% - ${space}px)`,
                    left: space,
                    transition: '0.3s'
                }}
            >

            </footer>
            {
                (invitation && session) &&
                <Modal open={invitation.memberEmail === session.email ? true : false} footer={null} onCancel={()=>setInvitation(null)}>
                    <h1 className="text-lg font-semibold">Invitation recieved</h1>
                    <Divider />
                    <div>
                        <h1 className="text-lg font-semibold capitalize">{invitation.admin.fullname}</h1>
                        <small className="text-gray-500">{invitation.admin.email}</small>
                    </div>
                    <div className="mt-6 flex justify-end">
                        <Button onClick={()=>updateInvitation(invitation, 'accepted')}>Accept</Button>
                        <Button onClick={()=>updateInvitation(invitation, 'rejected')} type="primary" className="bg-rose-600">Reject</Button>
                    </div>
                </Modal>
            }
        </main>
        <audio 
            ref={audio}
            className="absolute bottom-0 right-0"
        />
        <Drawer 
            open={open}
            width={480}
            title="Your Invitations"
            onClose={()=>setOpen(false)}
        >
            <div className="space-y-6">
                {
                    data && data.map((item: any, index: number)=>(
                        <div className="border p-4 rounded-lg" key={index}>
                            <h1 className="text-lg font-semibold capitalize">{item.admin.fullname}</h1>
                            <p className="text-gray-500 text-base mb-1">{item.admin.email}</p>
                            <p className="text-gray-500 text-xs">{item.createdAt}</p>
                            <div className="space-x-3 mt-3">
                                <Button onClick={()=>updateInvitation(item, 'accepted')}>Accept</Button>
                                <Button onClick={()=>updateInvitation(item, 'rejected')} type="primary" className="bg-rose-600">Reject</Button>
                            </div>
                        </div>
                    ))
                }
            </div>
        </Drawer>
        </div>
    )
}

export default AppLayout
