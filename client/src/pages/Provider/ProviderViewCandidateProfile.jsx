import {
  ProfileWrapper,
  Photo,
  Name,
  Details,
  DetailItem,
  Profession,
} from "../../assets/wrappers/CandidateProfile";
import Wrapper from "../../assets/wrappers/DashboardFormPage";

import day from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
import customFetch from "../../utils/customFetch";
import { toast } from "react-toastify";
import { Link, redirect, useLoaderData, useNavigate } from "react-router-dom";
day.extend(advancedFormat);

export const loader = async ({ params }) => {
  const errors = { msg: "" };
  try {
    const { data } = await customFetch.get(
      `/candidate/getCandidateProfile/${params.candidateId}`
    );
    return data;
  } catch (error) {
     
    errors.msg = "This Candidate Account is Pending !!!!";
    toast.error(errors.msg);
    return redirect("/dashboard/academy/holder-badges");
  }
};

const ProviderViewCandidateProfile = () => {
  const { candidate } = useLoaderData();
  const navigate = useNavigate();
  const date = day(candidate?.DOBirth).format("MMM Do, YYYY");

  const handleBackClick = () => {
    // Navigate back to the previous page
    navigate(-1);
  };
  if (!candidate) {
    return <h2>No Profile to display....</h2>;
  }
  return (
    <>
      <Wrapper>
        <div className="closeExaminerbtn">
          <Link className="btn closBtnExaminer" onClick={handleBackClick}>
            Back
          </Link>
        </div>
        <ProfileWrapper>
          <Photo>
            <img src={`${candidate?.candidateProfilePhoto}`} alt="Profile" />
          </Photo>
          <Name>
            {candidate?.firstName} {candidate?.familyName}
          </Name>

          <Details>
            <DetailItem>
              <strong>Birth Date:</strong> {date}
            </DetailItem>
            <DetailItem>
              <strong>Country:</strong> {candidate?.country}
            </DetailItem>
            <DetailItem>
              <strong>City:</strong> {candidate?.city}
            </DetailItem>
            <DetailItem>
              <strong>Email:</strong> {candidate?.email}
            </DetailItem>
            <DetailItem>
              <strong>Phone:</strong> {candidate?.phoneNumber}
            </DetailItem>
            <DetailItem>
              <strong>Address:</strong> {candidate?.address}
            </DetailItem>
          </Details>
          <Profession>
            <div>Profession:</div> {candidate?.qualification}
          </Profession>
        </ProfileWrapper>
      </Wrapper>
    </>
  );
};

export default ProviderViewCandidateProfile;
