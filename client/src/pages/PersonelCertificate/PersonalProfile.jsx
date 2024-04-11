import {
  ProfileWrapper,
  Photo,
  Name,
  Details,
  DetailItem,
  Profession,
} from "../../assets/wrappers/CandidateProfile";
import { useDashboardContext } from "../DashboardLayout";
import day from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
day.extend(advancedFormat);

const ExaminerProfile = () => {
  const { user } = useDashboardContext();
  const date = day(user.DOBirth).format("MMM Do, YYYY");

  return (
    <>
      <ProfileWrapper>
        <Photo>
          <img src={`/examiner/${user.examinerProfilePhoto}`} alt="Profile" />
        </Photo>
        <Name>
          {user.firstName} {user.familyName}
        </Name>
        <Details>
          <DetailItem>
            <strong>Birth Date:</strong> {date}
          </DetailItem>
          <DetailItem>
            <strong>Country:</strong> {user.country}
          </DetailItem>
          <DetailItem>
            <strong>City:</strong> {user.city}
          </DetailItem>
          <DetailItem>
            <strong>Email:</strong> {user.email}
          </DetailItem>
          <DetailItem>
            <strong>Phone:</strong> {user.phone}
          </DetailItem>
          <DetailItem>
            <strong>Address:</strong> {user.address}
          </DetailItem>
        </Details>
        <Profession>
          <div>Profession:</div> {user.profession}
        </Profession>
      </ProfileWrapper>
    </>
  );
};

export default ExaminerProfile;
