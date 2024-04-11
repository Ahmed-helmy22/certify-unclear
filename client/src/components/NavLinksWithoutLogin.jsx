 import { NavLink } from "react-router-dom";
import links from "../utils/links";
 import { useDashboardWithoutContext } from "../pages/DashboardLayoutWithoutLogin";

const NavLinksWithoutLogin = ({ isBigSidebar }) => {
  const { toggleSidebar, showSidebar } = useDashboardWithoutContext();
 

  return (
    <div className="nav-links" key={'nav-links1'}>
      {links.map((link) => {
        const { text, path, icon, mainPath, role, className } = link;
       
        if (mainPath !== 'not a user') return;
      
        return (
          <NavLink
            to={path}
            key={text}// Ensure a unique string key for regular links
            className={className}
            onClick={isBigSidebar ? null : toggleSidebar}
            end
          >
            <span className="icon">{icon}</span>
            {text}
          </NavLink>
        );
      })}
    </div>
  );
};

export default NavLinksWithoutLogin;
