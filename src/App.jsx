// App.jsx
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AuthProvider } from "./components/AuthContext/authContext";

// pages
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import Home from './pages/Home';
import Blogs from "./pages/Blogs";
import AboutUs from "./pages/AboutUs";

// components
import Layout from './components/Layout';

const router = createBrowserRouter([
  {
    path: 'signup',
    element: <SignUp />
  },
  {
    path: 'login',
    element: <Login />
  },
  {
    path: '/',
    element: <Home />
  },
  {
    element: <Layout />,
    children: [
      { path: 'blogs', element: <Blogs /> },
      { path: 'about', element: <AboutUs /> }
    ]
  }
]);

export default function App() {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}
