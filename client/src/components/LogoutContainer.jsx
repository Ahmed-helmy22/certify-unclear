import { useState } from "react";
import { useDashboardContext } from "../pages/DashboardLayout";
import { FaCaretDown } from "react-icons/fa";
import Wrapper from "../assets/wrappers/LogoutContainer";

const LogoutContainer = () => {
  const [showLogout, setShowLogout] = useState(false);
  const { user, logoutUser } = useDashboardContext();
  if(user.role === 'provider'){
    return (
      <>
        <Wrapper>
          <button
            type="button"
            className="btn logout-btn"
            onClick={() => setShowLogout(!showLogout)}
          >
            {user?.firstName ?
              user?.firstName + " " + user?.familyName : user.OrganizationName}
            <FaCaretDown />
          </button>
  
          <div className={showLogout ? "dropdown show-dropdown" : "dropdown"}>
            <button
              type="button"
              className="dropdown-btn"
              onClick={() => logoutUser(user.role)}
            >
              logout
            </button>
          </div>
        </Wrapper>
      </>
    );
  }

  if(user.role === 'examiner' || user.role === 'candidate' ||   user.role === 'admin'){
    return (
      <>
        <Wrapper>
          <button
            type="button"
            className="btn logout-btn"
            onClick={() => setShowLogout(!showLogout)}
          >
            {user?.firstName + " " + user?.familyName }
            <FaCaretDown />
          </button>
  
          <div className={showLogout ? "dropdown show-dropdown" : "dropdown"}>
            <button
              type="button"
              className="dropdown-btn"
              onClick={() => logoutUser(user.role)}
            >
              logout
            </button>
          </div>
        </Wrapper>
      </>
    );
  }
 
};

export default LogoutContainer;
