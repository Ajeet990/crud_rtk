import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Home from './components/Home'
import { Routes, Route } from 'react-router-dom'
import AddUser from './components/AddUser'
import View from './components/View'
import Update from './components/Update'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Routes>
      <Route path='/' element={<Home />}/>
      <Route path='/addUser' element={<AddUser />}/>
      <Route path='/view/:id' element={<View />}/>
      <Route path='/update/:id' element={<Update />}/>
    </Routes>
    </>
  )
}

export default App
