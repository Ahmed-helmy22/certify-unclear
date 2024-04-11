import { Link } from "react-router-dom";
import {
  ProfileWrapper,
  Photo,
  Name,
  Details,
  DetailItem,
  Profession,
} from "../../assets/wrappers/CandidateProfile";
import { useDashboardContext } from "../DashboardLayout";
import Wrapper from "../../assets/wrappers/DashboardFormPage";
import day from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
day.extend(advancedFormat);

import profileImage from '../../assets/images/profile-avatar.png'
import { RiImageEditLine } from "react-icons/ri";
import { useState } from "react";
import EditCandidateProfileImageModal from "../../components/EditCandidateProfileImageModal";
 
const CandidateProfile = () => {
  const [isModalActive, setIsModalActive] = useState(false);
  const { user } = useDashboardContext();
   const birthdate = day(user?.DOBirth).format("MMM Do, YYYY");

  const profileData = {
    photoUrl: user?.candidateProfilePhoto || profileImage,
    name: user?.firstName + " " + user?.familyName,
    birthDate: birthdate,
    country: user?.country,
    city: user?.city,
    email: user?.email,
    phone: user?.phoneNumber,
    address: user?.address,
  };
  const modalWork = () => {
    setIsModalActive(!isModalActive);
  };
  return (
    <Wrapper>
      <ProfileWrapper>
        <Photo>
          <img src={`${profileData?.photoUrl}`} alt="Profile" />
          <div className="editImageIcon">
            <Link
              className="icon"
              to={`../candidate/edit-profile-photo`}
              onClick={modalWork}
            >
              <RiImageEditLine size={30} color="var(--text-color)"/>
            </Link>
            <p className="editImageText">edit image</p>
          </div>
        </Photo>
        <Name>{profileData?.name}</Name>
        <Details>
          <DetailItem>
            <strong>Birth Date:</strong> {profileData?.birthDate}
          </DetailItem>
          <DetailItem>
            <strong>Country:</strong> {profileData?.country}
          </DetailItem>
          <DetailItem>
            <strong>City:</strong> {profileData?.city}
          </DetailItem>
          <DetailItem>
            <strong>Email:</strong> {profileData?.email}
          </DetailItem>
          <DetailItem>
            <strong>Phone:</strong> {profileData?.phone}
          </DetailItem>
          <DetailItem>
            <strong>Address:</strong> {profileData?.address}
          </DetailItem>
        </Details>
        <Profession>
          <div>Qualifications:</div> {user?.qualification}
        </Profession>
        {isModalActive ? (
          <EditCandidateProfileImageModal
            key={user._id}
            setIsModalActive={setIsModalActive}
            isModalActive={isModalActive}
            modalWork={modalWork}
          />
        ) : (
          ""
        )}
      </ProfileWrapper>
    </Wrapper>
  );
};

export default CandidateProfile;
