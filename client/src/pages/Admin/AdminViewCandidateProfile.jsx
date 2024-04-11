import {
  ProfileWrapper,
  Photo,
  Name,
  Details,
  DetailItem,
  Profession,
} from "../../assets/wrappers/CandidateProfile";
import profileImag from "../../assets/images/profile-avatar.png";
import passportImag from "../../assets/images/passprotSample.jpeg";

import Wrapper from "../../assets/wrappers/DashboardFormPage";
 
import day from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
import { toast } from "react-toastify";
import customFetch from "../../utils/customFetch";
import { Link, redirect, useLoaderData, useNavigate } from "react-router-dom";
import Heading from "../../ui/Heading";
day.extend(advancedFormat);

export const loader = async ({ params }) => {
  try {
    const { data } = await customFetch.get(
      `/admin/viewCandidate/${params.userId}`
    );
    return { data };
  } catch (error) {
    toast.error(error?.response?.data?.message);
    redirect("dashboard/admin/candidates");
    return error;
  }
};

const AdminViewCandidateProfile = () => {
  const { data, externalBadge } = useLoaderData();
   const navigate = useNavigate();
  const date = day(data.data?.DOBirth).format("MMM Do, YYYY");

  const handleBackClick = () => {
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
          to={`../candidate/edit/${data?.data._id}`}
        >
          Edit
        </Link>
        <Link className="btn closBtnExaminer" onClick={handleBackClick}>
          Back
        </Link>
      </div>
      <ProfileWrapper>
        <Photo>
          <img
            src={data?.data?.candidateProfilePhoto ? `${data?.data?.candidateProfilePhoto}` : profileImag}
            alt="Profile"
          />
          <div className="editImageIcon">
            <p className="editImageText">edit image</p>
          </div>
        </Photo>
        <Name>
          {data?.data?.firstName.toLocaleUpperCase()} {data?.data?.familyName.toLocaleUpperCase()}
        </Name>
        <Details>
          <DetailItem>
            <strong>Birth Date:</strong> {date}
          </DetailItem>
          <DetailItem>
            <strong>Country:</strong> {data?.data?.country}
          </DetailItem>
          <DetailItem>
            <strong>City:</strong> {data?.data?.city}
          </DetailItem>
          <DetailItem>
            <strong>Email:</strong> {data?.data?.email}
          </DetailItem>
          <DetailItem>
            <strong>Phone:</strong> {data?.data?.phoneNumber}
          </DetailItem>
          <DetailItem>
            <strong>Address:</strong> {data?.data?.address}
          </DetailItem>
        </Details>
        <Profession>
          <div>Profession:</div> {data?.data?.qualification}
        </Profession>
      </ProfileWrapper>

      <hr />
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
          <Heading as="h3">passport : {data?.data?.PassportNumber}</Heading>
          <img
            src={data?.data?.candidatePassportPhoto ? `${data?.data?.candidatePassportPhoto}` : passportImag}
            alt="passport"
            width={"100%"}
            height={300}
          />
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <Heading as="h3">Candidate profile photo</Heading>
          <img
            src={data?.data?.candidateProfilePhoto ? `${data?.data?.candidateProfilePhoto}` : profileImag}
            alt="passport"
            width={"100%"}
            height={300}
          />
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <Heading as="h3">Candidate verification photo</Heading>
          <img
            src={data?.data?.candidateVerificationPhoto ? `${data?.data?.candidateVerificationPhoto}` : profileImag}
            alt="examiner"
            width={"100%"}
            height={300}
          />
        </div>
      </div>
    </Wrapper>
  );
};

export default AdminViewCandidateProfile;
