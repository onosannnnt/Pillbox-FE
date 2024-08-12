import HomeLayout from '@/components/layouts/HomeLayout'
import { BASE_ROUTE, LOGIN_ROUTE, WELCOME_ROUTE } from '@/config/route'
import Home from '@/pages/Home'
import Login from '@/pages/Login'
import Welcome from '@/pages/Welcome'
import { ConfigProvider } from 'antd'
import { Suspense } from 'react'
import { BrowserRouter, Outlet, Route, Routes } from 'react-router-dom'

function App() {
  return (
    <ConfigProvider>
      <BrowserRouter>
        <Routes>
          <Route
            path={BASE_ROUTE}
            element={
              <Suspense>
                <HomeLayout>
                  <Outlet />
                </HomeLayout>
              </Suspense>
            }
          >
            <Route index element={<Home />} />
          </Route>
          <Route path={WELCOME_ROUTE} element={<Welcome />} />
          <Route path={LOGIN_ROUTE} element={<Login />} />
        </Routes>
      </BrowserRouter>
    </ConfigProvider>
  )
}

export default App
