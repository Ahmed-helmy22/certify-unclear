import { useState } from "react";
import { NavLink } from "react-router-dom";
import links from "../utils/links";
import { useDashboardContext } from "../pages/DashboardLayout";

const NavLinks = ({ isBigSidebar }) => {
  const { toggleSidebar, user, showSidebar } = useDashboardContext();
  const [isSearchSideBar, setIsSearchSideBar] = useState(false);


  return (
    <div className="nav-links" key={'nav-links1'}>
      {links.map((link) => {
        const { text, path, icon, mainPath, role, className } = link;
       
        if (role !== user.role) return;
        if (text === "award badge") {
          return (
            <>
              <NavLink to={path} key={`award-badge-${text}`} className={className} end>
                <span className="icon">{icon}</span>
                {text}
              </NavLink>

              {isSearchSideBar ? (
                <div className="searchSideBar"  key={`search-${text}`}>
                  <div>
                    <label htmlFor="">Search user</label>
                    <input type="text" />
                  </div>
                </div>
              ) : null}
            </>
          );
        }
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

export default NavLinks;
