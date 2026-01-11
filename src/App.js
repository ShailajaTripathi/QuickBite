/**
 * <div id="parent">
 * <div id="child">
 * <h1>I'm h1 tag </h1>
 * <h2>I'm h2 tag </h2>
 * </div>
 * <div id ="child2">
 * <h1>I'm h1 tag</h1>
 * <h2>I'm h2 tag</h2>
 * </div>
 * </div>
 */
/*import React from 'react';
import ReactDOM from 'react-dom/client';

const parent = React.createElement("div"  , {id:"parent"},[
    React.createElement("div",{id:"child"},[
        React.createElement("h1",{},"I'm an h1 tag"),
        React.createElement("h2",{},"I'm an h2 tag"),
    ]),
    React.createElement("div",{id:"child2"},[
        React.createElement("h1",{},"I'm an h1 tag"),
        React.createElement("h2",{},"I'm an h2 tag"),
       ])
]);

//JSX
console.log(parent);
const root = ReactDom.createElement(document.getElementById("root"));
root.render(parent); 
*/

//
import React, { useState, lazy, Suspense, useEffect } from "react";
import ReactDOM from "react-dom/client";
//import "../index.css";
import ProtectedRoute from "./components/common/ProtedRoute.jsx";
import Header from "./components/common/Header.jsx";
import Home from "./pages/Home.jsx";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import Contact from "./pages/Contact.jsx";
import Cart from "./pages/Cart.jsx";
import ErrorComponent from "./components/common/ErrorComponent.jsx";
import RestaurantMenu from "./components/menu/RestaurantMenu.jsx";
import "../index.css";
import { Provider } from "react-redux";
import store from "./store/store";
import Auth from "./pages/Auth.jsx";
import { AuthProvider } from "./context/AuthContext.js";


const About = lazy(() => import("./pages/About.jsx")); //dynamic import of about component with lazy loading so that about component will loaded only when /about route visited

//“MainFrame is a layout component used as a parent route in React Router to keep common UI like header constant and render page-specific content using Outlet.”
const MainFrame = () => {
  //this is layout component for header and outlet layout is created layout means common part of all pages in app
  // useEffect(() => {
  //   const data = {
  //     name: "Shailaja",
  //   };
  //   setUserName(data?.name); // setting username from data
  // }, []);

  return (
    // wrapping entire app in context and redux providers

      <Provider store={store}>
        <AuthProvider>
         
            <div className="app">
              {/* <RouterProvider router={appRouter} /> */}
              <Header />
              <Outlet />
              {/* "Outlet is used in layout routes to render child route components dynamically." outlet is used to render children components of layout components */}
            </div>
        </AuthProvider>
      </Provider>
  );
}; //creating layout component for header and outlet

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <MainFrame />, //layout component as parent route
    children: [
      { path: "/", element: <Home /> },
      {
        path: "/about", // children to app route
        // this is  lazy loading or chunking or dynamic bundling or etc etc (all names on notes )
        //suspense is used to wrap lazy loaded components. fallback is used to show something till the component is loading
        element: (
          <Suspense fallback={<h1>Loading....</h1>}>
            <About />
          </Suspense>
        ),
      },
      {
        path: "/contact",
        element: <Contact />,
      },
      {
        path: "/cart",
        element:  <ProtectedRoute>
      <Cart />
    </ProtectedRoute>,
      },
      {
        path: "/auth",
        element: <Auth />,
      },

      {
        path: "/restaurants/:resId",
        element: <RestaurantMenu />,
      },
    ], // creating children to parent route
    errorElement: <ErrorComponent />, //when route is not found this component will be shown with error message.
  },
]);
const root = ReactDOM.createRoot(document.getElementById("root")); //creating root using reactdom 18 way,this is the first step of rendering react app by getting root element from index.html
root.render(<RouterProvider router={appRouter} />); //providing entire app to routerprovider
// this means “Hey React, use these rules to control what UI to show based on URL.”
