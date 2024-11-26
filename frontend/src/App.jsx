import { useState } from 'react'

import './App.css'
import AppContent from './components/AppContent'
import { Outlet } from 'react-router-dom';
import Left from './components/Left'
import Right from './components/Right'

function App() {
  return (
    <div className='app-main'>
    <Left/>
    <Right>
      <Outlet /> 
    </Right>
    </div>
  )
}

export default App
