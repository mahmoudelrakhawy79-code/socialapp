import { useState } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './Components/Layout/Layout'
import Login from './Auth/Login/Login'
import Register from './Auth/Register/Register'
import Profile from './Components/Profile/Profile'
import Home from './Components/Home/Home'
import Notfound from './Components/Notfound/Notfound'
import { CreateContextprovider } from './context/countercontext'
import { AuthContextprovider } from './context/authcontect'
import Protectauth from './protectAuth/protectauth'
import ProtectRoute from './protectRoute/protectRoute'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import Postdetails from './postdetails/postdetails'
import { ToastContainer, toast } from 'react-toastify';
import Changepassword from './changepassword/changepassword'
const queryclient = new QueryClient();
function App() {
  let route = createBrowserRouter([
    {
      path: '', element: <Layout />, children: [
        { index: true, element: <ProtectRoute><Login /></ProtectRoute> },
        { path: 'register', element: <ProtectRoute><Register /></ProtectRoute> },
        { path: 'profile', element: <Protectauth><Profile /></Protectauth> },
        { path: 'home', element: < Protectauth><Home /> </Protectauth> },
        { path: 'Changepassword', element: < Protectauth><Changepassword /> </Protectauth> },
        { path: 'postdetails/:id', element: < Protectauth><Postdetails /> </Protectauth> },
        { path: '*', element: <Notfound /> },
      ]
    }
  ])
  return (
    <>
      <QueryClientProvider client={queryclient}>
        <AuthContextprovider>
          <CreateContextprovider>

            <RouterProvider router={route} />
            <ToastContainer />
          </CreateContextprovider>
        </AuthContextprovider>
        <ReactQueryDevtools />

      </QueryClientProvider>
    </>
  )
}

export default App
