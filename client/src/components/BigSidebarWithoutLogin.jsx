import Wrapper from "../assets/wrappers/BigSidebar";
import { useDashboardWithoutContext } from "../pages/DashboardLayoutWithoutLogin";
import Logo from "./Logo";
import NavLinksWithoutLogin from "./NavLinksWithoutLogin";

const BigSidebarWithoutLogin = () => {
  const { showSidebar } = useDashboardWithoutContext();

  return (
    <Wrapper>
      <div
        className={
          !showSidebar ? "sidebar-container show-sidebar" : "sidebar-container"
        }
      >
        <div className="content">
          <header>
            <Logo />
          </header>

          <NavLinksWithoutLogin isBigSidebar />
        </div>
      </div>
    </Wrapper>
  );
};

export default BigSidebarWithoutLogin;
