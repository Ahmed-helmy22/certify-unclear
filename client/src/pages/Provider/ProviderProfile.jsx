import {
  Wrapper,
  SupportedImage,
} from "../../assets/wrappers/ProviderProfileWrapper";
import {
  ProfileWrapper,
  Photo,
  Name,
  Details,
  DetailItem,
  Profession,
} from "../../assets/wrappers/CandidateProfile";
import avatar from '../../assets/images/avaart-photo.jpg'

import Wrapper2 from "../../assets/wrappers/DashboardFormPage";
import { FaFacebookF, FaLinkedinIn, FaTwitter } from "react-icons/fa";
import { useDashboardContext } from "../DashboardLayout";
import { Link } from "react-router-dom";
import { RiImageEditLine } from "react-icons/ri";
import EditProviderProfileImageModal from "../../components/EditProviderProfileImageModal";
import { useState } from "react";

import day from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
day.extend(advancedFormat);


const ProviderProfile = () => {
  const { user } = useDashboardContext();
  const [isModalActive, setIsModalActive] = useState(false);
  const date = day(user?.providerAdminInfo?.DOBirth).format("MMM Do, YYYY");

  const modalWork = () => {
    setIsModalActive(!isModalActive);
  };
  return (
    <Wrapper>
      <header>
        <div className="main-icon">{`${user.OrganizationName}`.charAt(0)}</div>
        <div className="info">
          <h5>{user.OrganizationName}</h5>
          <p>OGS</p>
        </div>
      </header>
      <div className="content">
        <div className="content-center">
          <div className="profileImage">
            <img src={`${user.logo}`} />
            <div className="editImageIcon">
              <Link
                className="icon"
                to={`../academy/edit-profile-photo`}
                onClick={modalWork}
              >
                <RiImageEditLine size={30} color="var(--text-color)" />
              </Link>
              <p className="editImageText">edit image</p>
            </div>
          </div>
        </div>

        <div className="section">
          <p>
            {/* {user?.providerType}:{" "}
              <span>
                
                {user?.providerAdminInfo?.familyName}{" "}
              </span> */}
          </p>
          <p>
            Contact Person: {user?.providerAdminInfo?.firstName} {user?.providerAdminInfo?.familyName} <span> {user?.providerAdminInfo?.adminRole}</span>{" "}
          </p>
          <ul className="nav-link">
            <FaFacebookF /> <FaTwitter /> <FaLinkedinIn />
          </ul>

          <p>{user?.bio}</p>

          <div className="contactUs">
            <ul className="">
              <li>
                Tele : <span>{user?.phoneNumber}</span>
              </li>
              <li>
                Email : <span>{user?.email} </span>
              </li>
              <li>
                Country : <span>{user?.country}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <hr />
      <div>
        <p style={{ padding: "2rem", fontSize: "1.4rem" }}>
          Accountable admin :
        </p>
      </div>

      <Wrapper2>
        <ProfileWrapper>
          <Photo>
            <img
              src={
                user.providerAdminInfo
                  ? `${user?.providerAdminInfo?.adminProfilePhoto}`
                  : avatar
              }
              alt="Profile"
            />
            <div className="editImageIcon">
              {/* <Link
                className="icon"
                // to={`../examiner/edit-profile-photo`}
                // onClick={modalWork}
              >
                <RiImageEditLine size={30} color="var(--text-color)" />
              </Link> */}
              <p className="editImageText">edit image</p>
            </div>
          </Photo>
          <Name>
            {user?.providerAdminInfo?.firstName} {user?.providerAdminInfo?.middleName} {user?.providerAdminInfo?.familyName}
          </Name>
          <Details>
            <DetailItem>
              <strong>Birth Date:</strong> {date}
            </DetailItem>
            <DetailItem>
              <strong>Country:</strong> {user?.providerAdminInfo?.adminCountry}
            </DetailItem>
            <DetailItem>
              <strong>City:</strong> {user?.providerAdminInfo?.adminCity}
            </DetailItem>
             
            <DetailItem>
              <strong>Phone:</strong> {user?.providerAdminInfo?.adminPhoneNumber}
            </DetailItem>
            <DetailItem>
              <strong>Address:</strong> {user?.providerAdminInfo?.adminAddress}
            </DetailItem>
          </Details>
           
          {/* {isModalActive ? (
            <EditExaminerProfileImageModal
              key={user._id}
              setIsModalActive={setIsModalActive}
              isModalActive={isModalActive}
              modalWork={modalWork}
            />
          ) : (
            ""
          )} */}
        </ProfileWrapper>
      </Wrapper2>

      {isModalActive ? (
        <EditProviderProfileImageModal
          key={user._id}
          setIsModalActive={setIsModalActive}
          isModalActive={isModalActive}
          modalWork={modalWork}
        />
      ) : (
        ""
      )}
    </Wrapper>
  );
};

export default ProviderProfile;
