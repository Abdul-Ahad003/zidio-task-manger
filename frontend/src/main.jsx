import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
import Login from './pages/Login.jsx';
import Signup from './pages/Signup.jsx';
import Nopage from './pages/Nopage.jsx';
import Createdocs from './pages/Createdocs.jsx';
import Deadline from './assets/components/Deadline.jsx';
import Team from './assets/components/team.jsx';


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/login",
    element: <Login/>,

  },
  {
    path: "/signup",
    element: <Signup/>,
  },
  {
    path: "/createDocs/:docsId",
    element: <Createdocs/>,
  },
  {
    path: "/deadlines",
    element: <Deadline/>
  },
  {
    path: "/team",
    element: <Team/>
  },
  {
    path: "*",
    element: <Nopage/>
  }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} >
        <App />
      </RouterProvider>
  </StrictMode>,
)
