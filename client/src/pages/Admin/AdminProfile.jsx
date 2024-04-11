import { Link } from "react-router-dom";
import {
  ProfileWrapper,
  Photo,
  Name,
  Details,
  DetailItem,
  Profession,
} from "../../assets/wrappers/CandidateProfile";
import avatar from '../../assets/images/avaart-photo.jpg'
import Wrapper from "../../assets/wrappers/DashboardFormPage";
import { useDashboardContext } from '../DashboardLayout';
import day from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
import { RiImageEditLine } from "react-icons/ri";
 import { useState } from "react";
import EditAdminProfileImageModal from "../../components/EditAdminProfileImageModal";
day.extend(advancedFormat);


const AdminProfile = () => {
  const { user } = useDashboardContext();
   const date = day(user.DOBirth).format("MMM Do, YYYY");
   const [isModalActive, setIsModalActive] = useState(false);

   const modalWork = () => {
    setIsModalActive(!isModalActive);
  };
  return (
    <Wrapper>
    <ProfileWrapper>
    <Photo>
          <img src={user?.candidateProfilePhoto ? `${user?.candidateProfilePhoto}` : avatar} alt="Profile" />
          <div className="editImageIcon">
          <Link
            className="icon"
            to={`../admin/edit-profile-photo`}
            onClick={modalWork}
          >
            <RiImageEditLine size={30} color="var(--text-color)"/>
          </Link>
          <p className="editImageText">edit image</p>
        </div>
        </Photo>
    
      <Name>
        {user?.firstName} {user?.familyName}
      </Name>
      <Details>
        <DetailItem>
          <strong>Birth Date:</strong> {date}
        </DetailItem>
        <DetailItem>
          <strong>Country:</strong> {user?.country}
        </DetailItem>
        <DetailItem>
          <strong>City:</strong> {user?.city}
        </DetailItem>
        <DetailItem>
          <strong>Email:</strong> {user?.email}
        </DetailItem>
        <DetailItem>
          <strong>Phone:</strong> {user?.phone}
        </DetailItem>
        <DetailItem>
          <strong>Address:</strong> {user?.address}
        </DetailItem>
      </Details>
      <Profession>
        <div>Profession:</div> {user?.profession}
      </Profession>
    </ProfileWrapper>
    {isModalActive ? (
        <EditAdminProfileImageModal
          key={user._id}
          setIsModalActive={setIsModalActive}
          isModalActive={isModalActive}
          modalWork={modalWork}
        />
      ) : (
        ""
      )}
  </Wrapper>
  )
}

export default AdminProfile