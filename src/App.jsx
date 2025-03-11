import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'

function App() {
  return (
    <Router basename="/my-portfolio">
      <Routes>
        <Route path="/" element={
          <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center">
            <h1 className="text-4xl font-bold mb-4">3D Portfolio</h1>
            <p className="text-xl text-gray-400">Coming Soon</p>
          </div>
        } />
      </Routes>
    </Router>
  )
}

export default App
