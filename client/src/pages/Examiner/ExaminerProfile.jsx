import { useState } from "react";
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

 import { useDashboardContext } from "../DashboardLayout";
import day from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
import { Link } from "react-router-dom";
import { RiImageEditLine } from "react-icons/ri";
import EditExaminerProfileImageModal from "../../components/EditExaminerProfileImageModal";
day.extend(advancedFormat);

const ExaminerProfile = () => {
  const { user } = useDashboardContext();
  const [isModalActive, setIsModalActive] = useState(false);
   const date = day(user.DOBirth).format("MMM Do, YYYY");

   const modalWork = () => {
    setIsModalActive(!isModalActive);
  };
  return (
    <Wrapper>
      <ProfileWrapper>
        <Photo>
          <img src={user.examinerProfilePhoto ? `${user.examinerProfilePhoto}` : avatar} alt="Profile" />
          <div className="editImageIcon">
          <Link
            className="icon"
            to={`../examiner/edit-profile-photo`}
            onClick={modalWork}
          >
            <RiImageEditLine size={30} color="var(--text-color)"/>
          </Link>
          <p className="editImageText">edit image</p>
        </div>
        </Photo>
        <Name>
          {user.firstName} {user.familyName}
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
            <strong>Phone:</strong> {user?.phoneNumber}
          </DetailItem>
          <DetailItem>
            <strong>Address:</strong> {user?.address}
          </DetailItem>
        </Details>
        <Profession>
          <div>Profession:</div> {user?.profession}
        </Profession>
        {isModalActive ? (
        <EditExaminerProfileImageModal
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

export default ExaminerProfile;
