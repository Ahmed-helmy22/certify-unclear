import Wrapper from "../assets/wrappers/Navbar";
import { FaAlignLeft } from "react-icons/fa";
  import { useDashboardWithoutContext } from "../pages/DashboardLayoutWithoutLogin";
import ThemeToggleWithoutLogin from "./ThemeToggleWithoutLogin";

const NavbarWithotuLogin = () => {
  const { toggleSidebar , isDarkTheme  } = useDashboardWithoutContext();
   
  return (
    <Wrapper>
      <div className="nav-center">
        <button type="button" className="toggle-btn" onClick={toggleSidebar}>
          <FaAlignLeft />
        </button>
        <div>
          <h4 className="logo-text">dashboard</h4>
        </div>
        <div className="btn-container">
          <ThemeToggleWithoutLogin isDarkTheme ={isDarkTheme }/>
         </div>
        
      </div>
    </Wrapper>
  );
};

export default NavbarWithotuLogin;
