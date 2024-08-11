import Welcome from "@/pages/Welcome";
import Login from "@/pages/Login";
import { ConfigProvider } from "antd";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <ConfigProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </ConfigProvider>
  );
}

export default App;
