import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';
import './index.css'
import App from './App.jsx'
import SignIn from './components/SignIn.jsx'
import SignUp from './components/SignUp.jsx'
import AddStudent from './components/AddStudent.jsx';
import StudentList from './components/StudentList.jsx';
import Setting from './components/Setting.jsx';

//Auth wrapper Componet
const AuthWrapper = ({children}) => {
  const token = localStorage.getItem('token');
  return token ? <>{children}</> : <Navigate to="/signin" />;
};

const router = createBrowserRouter([
  {
    path:"/signin",
    element:<SignIn/>
  },
  {
    path:"/signup",
    element:<SignUp/>
  },
  {
    path:"/app",
    element:<AuthWrapper><App/></AuthWrapper> ,
    children:[
      {
        path:"addStudent",
        element:<AddStudent/>
      },
      {
        path:"studentList",
        element:<StudentList/>
      },
      {
        path :"setting",
        element:<Setting/>
      },

    ]
  },
  {
    path:"*",
    element:<Navigate to="/signin"/>
  }

])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* <App /> */}
    <RouterProvider router={router} />
  </StrictMode>,
)
