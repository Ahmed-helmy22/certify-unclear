import { createContext, useContext, useState } from "react";
import {
  Outlet,
  useLoaderData,
  redirect,
  useNavigate,
  useNavigation,
} from "react-router-dom";
import Wrapper from "../assets/wrappers/Dashboard";
import { BigSidebar, Navbar, SmallSidebar } from "../components";
import { checkDefaultThem } from "../App";
import customFetch from "../utils/customFetch";
import { toast } from "react-toastify";
import LoadingSpinner from './../components/LoadingSpinner';




export const loader = async () => {
  try {
    const { data } = await customFetch.get("/auth/current-user");
     if(data.user.role === 'admin'){
      await redirect('/dashbaord/admin/')
      return data;
    }else{
      return data;
    }
  } catch (error) {
    return redirect("/");
  }
};

const DashboardContext = createContext();

const DashboardLayout = () => {
  const { user } = useLoaderData();

  const navigate = useNavigate()

  const [showSidebar, setShowSidebar] = useState(false);
  const [isDarkTheme, setIsDarkTheme] = useState(checkDefaultThem());

  const navigation = useNavigation()
  const isLoading = navigation.state === 'loading'

  const toggleDarkTheme = () => {
    const newDarkTheme = !isDarkTheme;
    setIsDarkTheme(newDarkTheme);
    document.body.classList.toggle("dark-theme", newDarkTheme);
    localStorage.setItem("darkTheme", newDarkTheme);
  };

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };
  
  const logoutUser = async (userRole) => {   
     if (userRole === 'admin'){
      await customFetch.get(`/candidate/logout`);
    }else{
      await customFetch.get(`/${userRole}/logout`);
    }
    navigate("/");
    toast.success("logout");
  };

  return (
    <DashboardContext.Provider
      value={{
        user,
        showSidebar,
        isDarkTheme,
        setShowSidebar,
        toggleDarkTheme,
        toggleSidebar,
        logoutUser,
        // badgesData,
      }}
    >
      <Wrapper>
        <main className="dashboard">
          <SmallSidebar />
          <BigSidebar />

          <div>
            <Navbar />
            <div className="dashboard-page">
              {isLoading ? <LoadingSpinner/> :  <Outlet context={{ user }} />}
             
            </div>
          </div>
        </main>
      </Wrapper>
    </DashboardContext.Provider>
  );
};

export const useDashboardContext = () => useContext(DashboardContext);

export default DashboardLayout;
