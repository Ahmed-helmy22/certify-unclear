import { createContext, useContext, useState } from "react";
import { Outlet, useLoaderData } from "react-router-dom";
import Wrapper from "../assets/wrappers/Dashboard";
import { BigSidebarWithoutLogin, NavbarWithotuLogin, SmallSidebarWithoutLogin } from "../components";
import {  checkDefaultThem  } from "../App";
import customFetch from "../utils/customFetch";
import { toast } from "react-toastify";
   
export const loader = async ({ params }) => {
    try {
    const { data } = await customFetch.get(
      `/candidate/getCandidateProfile/${params.candidateId}`
    );
      return data;
  } catch (error) {
    toast.error(error.response?.data?.message);
    return error;
  }
};

const DashboardWithoutLoginContext = createContext();

const DashboardLayoutWithoutLogin = () => {
  const  result = useLoaderData()
   
  const [showSidebar, setShowSidebar] = useState(false);
  const [isDarkTheme , setIsDarkTheme] = useState(checkDefaultThem());

  const toggleDarkTheme = () => {
    const newDarkTheme = !isDarkTheme ;
    setIsDarkTheme(newDarkTheme);
    document.body.classList.toggle("dark-theme", newDarkTheme);
    localStorage.setItem("darkTheme", newDarkTheme);
  };

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

   

  return (
    <DashboardWithoutLoginContext.Provider
      value={{
        showSidebar,
        isDarkTheme ,
        setShowSidebar,
        toggleDarkTheme,
        toggleSidebar,
        result
      }}
    >
      <Wrapper>
        <main className="dashboard">
          <SmallSidebarWithoutLogin />
          <BigSidebarWithoutLogin />
        
          <div>
            <NavbarWithotuLogin />
            <div className="dashboard-page">
               <Outlet />
            </div>
          </div>
        </main>
      </Wrapper>
    </DashboardWithoutLoginContext.Provider>
  );
};

export const useDashboardWithoutContext = () => useContext(DashboardWithoutLoginContext);

export default DashboardLayoutWithoutLogin;
