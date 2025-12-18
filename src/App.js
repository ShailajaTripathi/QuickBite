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
import Header from "./components/Header.jsx";
import Body from "./components/Body.jsx";
//import About from "./components/About.jsx";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router";
import Contact from "./components/Contact.jsx";
import ErrorComponent from "./components/ErrorComponent.jsx";
import RestaurantMenu from "./components/RestaurantMenu.jsx";
import "../index.css";
import UserContext from "./utils/UserContext/UserContext.js";

const About = lazy(() => import("./components/About.jsx"));
const AppLayout = () => {
  const [userName, setUserName] = useState("");
  useEffect(() => {
    const data = {
      name: "Shailaja",
    };
    setUserName(data?.name);
  }, []);
  return (
    <UserContext.Provider value={{ loggedInUser: userName,setUserName }}>
      <div className="app">
        <Header />
        <Outlet />
      </div>
    </UserContext.Provider>
  );
};

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      { path: "/", element: <Body /> },
      {
        path: "/about", // children to app route
        // this is  lazy loading or chunking or dynamic bundling or etc etc (all names on notes )
        element: (
          <Suspense fallback={<h1>Loading....</h1>}>
            <About />,
          </Suspense>
        ),
      },
      {
        path: "/contact",
        element: <Contact />,
      },
      {
        path: "/restaurants/:resId",
        element: <RestaurantMenu />,
      },
    ], // creating children to parent route
    errorElement: <ErrorComponent />,
  },
]);
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={appRouter} />);
