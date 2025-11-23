import { Routes, Route } from 'react-router-dom'
import LandingPage from './components/LandingPage.jsx'
import CodeReviewer from './components/CodeReviewer.jsx'

function App () {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/ai" element={<CodeReviewer />} />
    </Routes>
  )
}

export default App
