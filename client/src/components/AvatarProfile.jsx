import styled from "styled-components";
import { useDashboardContext } from "../pages/DashboardLayout";
import avatar from '../assets/images/avaart-photo.jpg'
const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  img {
    width: 90px;
    height: 90px;
    border-radius: 50%;
    transition: box-shadow 0.3s ease;
    margin-left: 1rem;
    :hover {
      box-shadow: var(--box-shadow);
    }
  }
`;

const AvatarProfile = () => {
  const { user } = useDashboardContext();
  if (user.role === "provider") {
    return (
      <Wrapper>
        <img
          src={user?.providerAdminInfo?.adminProfilePhoto ? `${user?.providerAdminInfo?.adminProfilePhoto}` : avatar}
          alt={user?.firstName}
        />
      </Wrapper>
    );
  }
  if (user.role === "candidate") {
    return (
      <Wrapper>
        <img src={user?.candidateProfilePhoto ? `${user?.candidateProfilePhoto}`: avatar} alt={user?.firstName} />
      </Wrapper>
    );
  }
  if (user.role === "examiner") {
    return (
      <Wrapper>
        <img src={user?.examinerProfilePhoto ? `${user?.examinerProfilePhoto}` : avatar} alt={user?.firstName} />
      </Wrapper>
    );
  }
};

export default AvatarProfile;
