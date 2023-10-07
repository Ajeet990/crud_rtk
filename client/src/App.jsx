import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'
import Dashboard from './components/Dashboard'
import { Routes, Route } from 'react-router-dom'
import AddUser from './components/AddUser'
import View from './components/View'
import Update from './components/Update'
import Navbar from './components/Navbar'
import Login from './components/Login'
import Home from './components/Home'
import { RequireAuth } from './Authorization/RequireAuth'
import { AuthProvider } from './Authorization/Auth'
import PageNotFound from './components/PageNotFound'

function App() {
  // const [count, setCount] = useState(0)

  return (
    <>
      <AuthProvider>
        <Navbar />
        <Routes>
          <Route path='/' element={<RequireAuth><Dashboard/></RequireAuth>}/>
          {/* <Route path='/' element={<Dashboard />} /> */}
          <Route path='/addUser' element={<AddUser />} />
          <Route path='/view/:id' element={<View />} />
          <Route path='/home' element={<RequireAuth><Home/></RequireAuth>} />
          <Route path='/update/:id' element={<Update />} />
          <Route path='/login' element={<Login />} />
          <Route path='/*' element={<PageNotFound />} />
        </Routes>
      </AuthProvider>
    </>
  )
}

export default App
