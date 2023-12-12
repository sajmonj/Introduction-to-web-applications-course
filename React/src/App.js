import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { redirect } from 'react-router-dom';
import './index.css';
import Layout from "./pages/Layout";
import Ex1 from "./my-react-app/App";
import Ex2 from "./json-data/App";
import Login from "./login/Login";
import Protected from "./login/Protected";

function App() {
  const [token, setToken] = useState(null);

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<Ex1 />} />
          <Route path="products" element={<Ex2 />} />
          <Route path="login" element={<Login setToken={setToken} />} />
          <Route path="protected" element={<Protected token={token} />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
