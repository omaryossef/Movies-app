import React from "react";
import "./App.css";
import { SidebarWithBurgerMenu } from "./components/SidebarWithBurgerMenu";
import { RouterProvider } from "react-router-dom";
import router from "./routers/router.jsx";
function App() {
  return (
    <div>
      <RouterProvider router={router}></RouterProvider>
      {/* <SidebarWithBurgerMenu /> */}
    </div>
  );
}

export default App;
