import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { ConfigProvider } from 'antd'
import Home from '@/pages/Home'

function App() {
  return (
    <ConfigProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </ConfigProvider>
  )
}

export default App
