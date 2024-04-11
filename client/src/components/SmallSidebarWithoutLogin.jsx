 import Wrapper from "../assets/wrappers/SmallSidebar";
import { FaTimes } from "react-icons/fa";
import Logo from "./Logo";
 import { useDashboardWithoutContext } from "../pages/DashboardLayoutWithoutLogin";
import NavLinksWithoutLogin from "./NavLinksWithoutLogin";

const SmallSidebarWithoutLogin = () => {
  const { showSidebar, toggleSidebar } = useDashboardWithoutContext();

  return (
    <Wrapper>
      <div
        className={
          showSidebar ? `sidebar-container show-sidebar` : `sidebar-container`
        }
      >
        <div className="content">
          <button type="button" className="close-btn" onClick={toggleSidebar}>
            <FaTimes />
          </button>
          <header>
            <Logo />
          </header>
          <NavLinksWithoutLogin/>
        </div>
      </div>
    </Wrapper>
  );
};

export default SmallSidebarWithoutLogin;
