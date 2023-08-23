import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import ErrorPage from './pages/Errorpage.jsx'
import Signup from './pages/Signup.jsx'
import Login from './pages/Login.jsx'
import Onboarding from './pages/Onboarding.jsx'
import { AuthProvider } from './context/AuthContext';
import PrivateRoute from './component/PrivateRoute.jsx'
import Dashboard from './component/Dashboard.jsx'
import ForgotPassword from './component/ForgotPassword.jsx'
import Chat from './component/Chat.jsx'
import UpdateProfile from './component/UpdateProfile.jsx'


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/dashboard",
    element: <PrivateRoute><Dashboard /></PrivateRoute>
  },
  {
    path: "signup",
    element: <Signup />,
  },
  {
    path: "login",
    element: <Login />
  },
  {
    path: "boarding",
    element: <Onboarding />
  },
  {
    path: "forgot-password",
    element: <ForgotPassword />
  },
  {
    path: "chat",
    element: <Chat />
  },
  {
    path: "update-profile",
    element: <UpdateProfile />
  }
]);



ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
  <AuthProvider>
    <RouterProvider router={router} />
  </AuthProvider>
  </React.StrictMode>,
)
