import { useState } from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "./components/Home"
import Login from "./components/Login"
import Signup from "./components/Signup"
import Dashboard from "./components/Tools/Dashboard"
import Projects from "./components/Tools/Projects"
import Meetings from "./components/Tools/Meetings"
import Tasks from "./components/Tools/Tasks"
import Events from "./components/Tools/Events"
import Issues from "./components/Tools/Issues"
import Context from "./lib/context"
import Auth from './components/Auth'
import ForgotPassword from "./components/ForgotPassword"
import Members from "./components/Tools/Members"
import MeetingSession from "./components/Tools/MeetingSession"
import Chat from "./components/Tools/Chat"

const App = ()=>{
  const [session, setSession] = useState(null)
  return (
    <Context.Provider value={{session, setSession}}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forgot" element={<ForgotPassword />} />
          <Route path="/tools" element={<Auth />}>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="members" element={<Members />} />
            <Route path="projects" element={<Projects />} />
            <Route path="meetings" element={<Meetings />} />
            <Route path="meetings/:id" element={<MeetingSession />} />
            <Route path="tasks" element={<Tasks />} />
            <Route path="events" element={<Events />} />
            <Route path="issues" element={<Issues />} />
            <Route path="chat" element={<Chat />} />
          </Route>
          <Route path="*" element={<div className="flex items-center justify-center h-screen font-semibold"><h1>Not Found ! 404</h1></div>} />
        </Routes>
      </BrowserRouter>
    </Context.Provider>
  )
}

export default App