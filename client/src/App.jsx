import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Dashboard from "./pages/Dashboard"
import SignIn from "./pages/SignIn"
import SignUp from "./pages/SignUp"
import Home from './pages/Home'
import Roadmap from './pages/Roadmap'


const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />}/>
          <Route path='/signin' element={<SignIn />}/>
          <Route path='/signup' element={<SignUp />}/>
          <Route path='/dashboard' element={<Dashboard />}/>
          <Route path='/roadmap/:goalId' element={<Roadmap />}/>
        </Routes>
      </BrowserRouter>
      
    </>
  )
}

export default App