import {
  ProfileWrapper,
  Photo,
  Name,
  Details,
  DetailItem,
} from "./../../assets/wrappers/Profile";

 import customFetch from "../../utils/customFetch";
import { toast } from "react-toastify";
import { useLoaderData } from "react-router-dom";

import day from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
day.extend(advancedFormat);

 export const loader = async ({ params }) => {
   try {
    const { data } = await customFetch.get(
      `/candidate/getCandidateProfile/${params.candidateId}`
    );
    toast.success("Get candidate data successfully");
     return data;
  } catch (error) {
    toast.error(error?.response?.data?.message);
    return error;
  }
};

const ProviderAwardingBadgeProfile = () => {
  const { candidate  } = useLoaderData();
   const birthDate = day(candidate.DOBirth).format("MMM Do, YYYY");
  if (!candidate) {
    return (
      <ProfileWrapper>
        <h2>No Profile to display....</h2>
      </ProfileWrapper>
    );
  }
  return (
    <>
      <ProfileWrapper>
        <Photo>
          <img
            src={`${candidate.candidateProfilePhoto}`}
            alt="Profile"
          />
        </Photo>
        <Name>
          {candidate.firstName.toUpperCase()}{" "}
          {candidate.familyName.toUpperCase()}
        </Name>
        <Details>
          <DetailItem>
            <strong>Birth Date:</strong> {birthDate}
          </DetailItem>
          <DetailItem>
            <strong>Country:</strong> {candidate.country}
          </DetailItem>
          <DetailItem>
            <strong>City:</strong> {candidate.city}
          </DetailItem>
          <DetailItem>
            <strong>Email:</strong> {candidate.email}
          </DetailItem>
          <DetailItem>
            <strong>Phone:</strong> {candidate.phoneNumber}
          </DetailItem>
          <DetailItem>
            <strong>Address:</strong> {candidate.address}
          </DetailItem>
        </Details>
      </ProfileWrapper>
    </>
  );
};

export default ProviderAwardingBadgeProfile;
