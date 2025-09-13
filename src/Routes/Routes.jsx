import React from 'react';
import {
  createBrowserRouter,
} from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../Pages/Home/Home/Home";

import Menu from "../Pages/Menu/Menu/Menu";
import Order from "../Pages/Order/Order/Order";
import Login from "../Pages/Login/Login";
import Register from "../Pages/Register/Register";
import Register2 from "../Pages/Register/Register2";
import PrivateRoute from "./PrivateRoute";
import Dashboard from "../Layout/Dashboard";
import Cart from "../Pages/Dashboard/Cart/Cart";
import AllUsers from "../Pages/Dashboard/Admin/AllUsers/AllUsers";
import AddItem from "../Pages/Dashboard/Admin/AddItem/AddItem";
import AdminRoute from "./AdminRoute";
import ManageItem from '../Pages/Dashboard/Admin/ManageItem/ManageItem';
import UpdateItem from '../Pages/Dashboard/Admin/UpdateItem/UpdateItem';
import Payment from '../Pages/Dashboard/Payment/Payment';
import PaymentHistrory from '../Pages/Dashboard/PaymentHistrory/PaymentHistrory';
import UserHome from '../Pages/Dashboard/UserHome/UserHome';
import AdminHome from '../Pages/Dashboard/Admin/AdminHome/AdminHome';
import Invoice from '../Pages/Dashboard/Invoice/Invoice';
import EmployeeDetails from '../Pages/Dashboard/Admin/EmployeeDetails/EmployeeDetails';
import AddEmployee from '../Pages/Dashboard/Admin/AddEmployee/AddEmployee';
import UpdateEmpDetails from '../Pages/Dashboard/Admin/UpdateEmployeeDetails/UpdateEmpDetails';

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    children: [
      {
        path: "/",
        element: <Home></Home>
      },

      {
        path: '/menu',
        element: <PrivateRoute><Menu></Menu></PrivateRoute>
      },
      {
        path: "/order",
        element: <Order></Order>
      },
      {
        path: "/order/:category",
        element: <Order></Order>
      },
      {
        path: '/login',
        element: <Login></Login>
      },
      {
        path: '/register',
        element: <Register2></Register2>
      },
      // {
      //   path:'/register',
      //   element:<Register></Register>
      // },

    ]
  },
  {
    path: 'dashboard',
    element: <PrivateRoute><Dashboard></Dashboard></PrivateRoute>,
    children: [
      // normal user route

      {
        path: 'cart',
        element: <Cart></Cart>
      },
      {
        path: 'userHome',
        element: <UserHome></UserHome>
      },
      {
        path: 'payment',
        element: <Payment></Payment>
      },
      {
        path: 'paymentHistory',
        element: <PaymentHistrory></PaymentHistrory>
      },

      // admin route
      {
        path: 'adminHome',
        element: <AdminRoute><AdminHome></AdminHome></AdminRoute>
      },
      {
        path: 'users',
        // element: <AllUsers></AllUsers>
        element: <AdminRoute><AllUsers></AllUsers></AdminRoute>
      },
      {
        path: 'manageItems',
        element: <AdminRoute><ManageItem></ManageItem></AdminRoute>
      },
      {
        path: 'addItems',
        element: <AdminRoute><AddItem></AddItem></AdminRoute>
      },
      {
        path: 'updateItem/:id',
        element: <AdminRoute><UpdateItem></UpdateItem></AdminRoute>,
        loader: ({ params }) => fetch(`https://restaurant-management-system-server-nine.vercel.app/menu/${params.id}`)
      },
      {
        path: 'employeeDetails',
        element: <AdminRoute><EmployeeDetails></EmployeeDetails></AdminRoute>
      },
      {
        path: 'updateDetail/:id',
        element:<AdminRoute><UpdateEmpDetails></UpdateEmpDetails></AdminRoute>,
        loader:({params})=> fetch(`https://restaurant-management-system-server-nine.vercel.app/addEmployee/${params.id}`)
      },
      {
        path: 'addEmployee',
        element: <AdminRoute><AddEmployee></AddEmployee></AdminRoute>
      },
    ]
  },
  {
    path: "/invoice",
    element: <Invoice></Invoice>
  }

]);