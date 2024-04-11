import { Link } from "react-router-dom";
import styled from "styled-components";
 
const LogoNavStyle = styled.nav`
  width: var(--fluid-width);
  max-width: var(--max-width);
  margin: 0 auto;
  height: 50px;
  display: flex;
  align-items: center;
  display: grid;
  align-items: center;
  a {
    font-size: 2rem;
    font-weight: bolder;
    color: var(--text-color);
  }
`;

const Logo = ({user , isBigSidebar}) => {
  console.log(isBigSidebar);
 
  return (
    <LogoNavStyle>
      {!user ? (
        <Link to="/">
          <p>Certificate</p>
        </Link>
      ) : ( 
        <Link to={`../dashboard/${user.role}`}>
          <p>Certificate</p>
        </Link>
      )}
    </LogoNavStyle>
  );
};

export default Logo;
