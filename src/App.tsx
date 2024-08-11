import Welcome from '@/pages/Welcome'
import { ConfigProvider } from 'antd'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

function App() {
  return (
    <ConfigProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Welcome />} />
        </Routes>
      </BrowserRouter>
    </ConfigProvider>
  )
}

export default App
