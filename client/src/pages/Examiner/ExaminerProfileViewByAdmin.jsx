import {
  ProfileWrapper,
  Photo,
  Name,
  Details,
  DetailItem,
  Profession,
} from "../../assets/wrappers/CandidateProfile";
import Wrapper from "../../assets/wrappers/DashboardFormPage";
import passportImag from '../../assets/images/passprotSample.jpeg';
import profileImage from '../../assets/images/profile-avatar.png'
import day from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
import { Link, redirect, useLoaderData, useNavigate } from "react-router-dom";
import customFetch from "../../utils/customFetch";
import { toast } from "react-toastify";
import Heading from "../../ui/Heading";
 
day.extend(advancedFormat);

export const loader = async ({ params }) => {
  try {
    const { data } = await customFetch.get(
      `/admin/viewExaminer/${params.userId}`
    );

    return data;
  } catch (error) {
    toast.error(error?.response?.data?.message);
    redirect("dashboard/admin/examiner");
    return error;
  }
};

const ExaminerProfileViewByAdmin = () => {
  const { data } = useLoaderData();
  const navigate = useNavigate();
  const date = day(data.DOBirth).format("MMM Do, YYYY");

  const handleBackClick = () => {
    // Navigate back to the previous page
    navigate(-1);
  };
  return (
    <Wrapper>
      <div
        className="closeExaminerbtn"
        style={{ display: "flex", gap: "2rem", justifyContent: "end" }}
      >
        <Link
          className="btn closBtnExaminer"
          to={`../examiner/edit/${data._id}`}
        >
          Edit
        </Link>
        <Link className="btn closBtnExaminer" onClick={handleBackClick}>
          Back
        </Link>
      </div>
      <ProfileWrapper>
        <Photo>
          <img src={data.examinerProfilePhoto ? `${data.examinerProfilePhoto}` : profileImage} alt="Profile" />
          <div className="editImageIcon"></div>
        </Photo>

        <Name>
          {data.firstName} {data.familyName}
        </Name>
        <Details>
          <DetailItem>
            <strong>Birth Date:</strong> {date}
          </DetailItem>
          <DetailItem>
            <strong>Country:</strong> {data?.country}
          </DetailItem>
          <DetailItem>
            <strong>City:</strong> {data?.city}
          </DetailItem>
          <DetailItem>
            <strong>Email:</strong> {data?.email}
          </DetailItem>
          <DetailItem>
            <strong>Phone:</strong> {data?.phoneNumber}
          </DetailItem>
          <DetailItem>
            <strong>Address:</strong> {data?.address}
          </DetailItem>
        </Details>
        <Profession>
          <div>Profession:</div> {data?.profession}
        </Profession>
      </ProfileWrapper>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr",
          gap: "2rem",
          paddingTop: "2rem",
          textAlign: "center",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <Heading as="h3">passport : {data.PassportNumber}</Heading>
          <img
            src={data.examinerPassportPhoto ? `${data.examinerPassportPhoto}` : passportImag}
            alt="passport"
            width={"100%"}
            height={300}
          />
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <Heading as="h3">Examiner profile photo</Heading>
          <img
            src={data?.examinerProfilePhoto ? `${data?.examinerProfilePhoto}` : profileImage}
            alt="passport"
            width={"100%"}
            height={300}
          />
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <Heading as="h3">Examiner verification photo</Heading>
          <img
            src={data?.examinerVerificationPhoto ? `${data?.examinerVerificationPhoto}` : profileImage}
            alt="examiner"
            width={"100%"}
            height={300}
          />
        </div>
      </div>
    </Wrapper>
  );
};

export default ExaminerProfileViewByAdmin;
