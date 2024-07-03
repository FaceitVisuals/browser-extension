import React from 'react'
import Header from './sections/Header'
import About from './sections/About'
import Section1 from './sections/Section1'
import './app.css'

function App() {
  return (
    <div className="app">
      <Header />
      <Section1 />
      <About />

      <style jsx>{`
        .app {
          width: 400px;
          background-color: #161616;
          font-family: 'Source Sans Pro', sans-serif;
          color: #f0eff4};
        }
      `}</style>
    </div>
  )
}
export default App
