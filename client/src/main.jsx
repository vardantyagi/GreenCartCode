import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {BrowserRouter} from 'react-router-dom';
import { AppContextProvider } from './context/AppContext.jsx';
import { createBrowserRouter, Route, RouterProvider, Routes } from 'react-router-dom'
import Home from './pages/Home.jsx';


// const allRoutes = createBrowserRouter([
//   {
//     path:'/',
//     element:<Home/>
//   },
// ])

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
  {/* <RouterProvider router={allRoutes} > */}
    <AppContextProvider>
      <App />
    </AppContextProvider>
  </BrowserRouter>
  // </RouterProvider>
)
