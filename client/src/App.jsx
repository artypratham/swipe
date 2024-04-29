import './App.css'
import Home from './pages/Home/Home';
import Dashboard from './pages/Dashboard/Dashboard';
import OnBoarding from './pages/OnBoarding/OnBoarding';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import ChatContainer from "./components/ChatContainer/ChatContainer";
import { useCookies } from 'react-cookie';

const App = () => {
  const [ cookies, setCookie, removeCookie ] = useCookies(['user'])
  const authToken = cookies.AuthToken
  return (
    <BrowserRouter>
      <Routes>
        <Route path="https://swipe-server.vercel.app/" element={<Home/>}/>
        <Route path="https://swipe-server.vercel.app/dashboard" element={<Dashboard/>}/>
        <Route path="https://swipe-server.vercel.app/onboarding" element={<OnBoarding/>}/>
        {/* <Route path="/chat" element={<ChatContainer />} /> */}
      </Routes>
    </BrowserRouter>
  )
}

export default App
