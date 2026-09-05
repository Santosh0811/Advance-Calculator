import React from 'react'
import Panel from './components/Panel'
import './App.css'
import FontAwesome from './components/FontAwesome'

const App = () => {
  return (
    <div>
      <FontAwesome />
      <div className="fixed h-full w-full bg-slate-950">
        <div className="absolute bottom-0 left-0 right-0 top-0 bg-[radial-gradient(circle_500px_at_50%_200px,#3e3e3e,transparent)]"></div>
      </div>
      <div className='relative z-10 screen-1'>
        <Panel />
      </div>
    </div>
  )
}

export default App
