import {
  ProfileWrapper,
  Photo,
  Name,
  Details,
  DetailItem,
  Profession,
} from "../../assets/wrappers/CandidateProfile";
import Wrapper from "../../assets/wrappers/DashboardFormPage";
import imageProfile from '../../assets/images/profile-avatar.png' 
import { useDashboardWithoutContext } from "../DashboardLayoutWithoutLogin";
import day from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
day.extend(advancedFormat);

const PersonelCertificateProfileWithoutLogin = () => {
  const { result } = useDashboardWithoutContext();
  const {
    firstName,
    qualification,
    email,
    DOBirth,
    address,
    phoneNumber,
    candidateProfilePhoto,
    city,
    country,
    familyName,
  } = result?.candidate;

  const date = day(DOBirth).format("MMM Do, YYYY");
  return (
    <Wrapper>
      <ProfileWrapper>
        <Photo>
          <img src={candidateProfilePhoto ? `${candidateProfilePhoto}` : imageProfile} alt="Profile" />
        </Photo>
        <Name>
          {firstName} {familyName}
        </Name>

        <Details>
          <DetailItem>
            <strong>Birth Date:</strong> {date}
          </DetailItem>
          <DetailItem>
            <strong>Country:</strong> {country}
          </DetailItem>
          <DetailItem>
            <strong>City:</strong> {city}
          </DetailItem>
          <DetailItem>
            <strong>Email:</strong> {email}
          </DetailItem>
          <DetailItem>
            <strong>Phone:</strong> {phoneNumber}
          </DetailItem>
          <DetailItem>
            <strong>Address:</strong> {address}
          </DetailItem>
        </Details>
        <Profession>
          <div>Profession:</div> {qualification}
        </Profession>
      </ProfileWrapper>
    </Wrapper>
  );
};

export default PersonelCertificateProfileWithoutLogin;
