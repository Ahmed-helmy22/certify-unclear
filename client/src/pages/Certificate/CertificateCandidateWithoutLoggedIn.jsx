import styled from "styled-components";
import customFetch from "../../utils/customFetch";
import { toast } from "react-toastify";
import { useLoaderData } from "react-router-dom";
import day from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
import Wrapper from "../../assets/wrappers/BadgeContainer";
day.extend(advancedFormat);

const StyleCrtificate = styled.div`
  background: var(--background-secondary-color);
  border-radius: var(--border-radius);
  padding: 2rem ;
  text-align: center;
  border: 2px solid var(--text-color); /* Add border styling here */
  outline: 10px double ;
  
  .header {
    display: flex;
    justify-content: space-around;
    font-family: 'Courier New', Courier, monospace;
    img {
      width: 150px;
      height: 150px;
    }
  }
  .content{
    display: flex;
    flex-direction: column;
    gap: 2rem;
    font-family: 'Courier New', Courier, monospace;
    .contentDate{
      display: flex;
      justify-content: space-between;
    }
    .sector{
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 2rem;
    }
.providerName{
  font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
}
.candidateName{
  font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
}
  }
`;

export const loader = async ({ params }) => {
  try {
    const { data } = await customFetch.get(
      `/candidate/getsingleCandidateBadge/${params.candidateBadgeId}`
    );
    return data;
  } catch (error) {
    toast.error(error.response?.data?.message);
    return error;
  }
};
const CertificateCandidateWithoutLoggedIn = () => {
  const { result } = useLoaderData();
  // Destructure the needed data
  const {
    _id,
    badgeId,
    createdAt,
    dueDate,
    status,
    note,
    grade,
    examinerId,
    candidateId,
    providerId,
  } = result;

  const badgePhoto = badgeId.badgePhoto;
  const department = badgeId.department;
  const title = badgeId.title;
  const examinerName = `${examinerId.firstName} ${examinerId.familyName}`;
  const candidateName = `${candidateId.firstName} ${candidateId.middleName} ${candidateId.familyName}`;
  const candidateEmail = candidateId.email;
  const candidateProfilePhoto = candidateId.candidateProfilePhoto;

  const providerType = providerId.providerType;
  const providerlogo = providerId.logo;

  // Create a PDF document with the data
  // const validUntill = dueDate - createdAt
  const issueDate = day(createdAt).format("MMM Do, YYYY");
  const validity = day(dueDate).format("MMM Do, YYYY");

  return (
    <Wrapper>
      <StyleCrtificate className="container">
        <div className="header">
          <div>
          <img
            src={`/provider/${providerlogo}`}
            alt={candidateId.providerType}
          />
          <p>Academy</p>
          </div>
         <div>
         <img
            src={`/candidate/${candidateProfilePhoto}`}
            alt={candidateId.firstName}
          />
          <p>Candidate</p>
         </div>
         
        </div>
        <div className="content">
          <h3 className="providerName">{providerType}</h3>
          <h5>Internal Certificate No. : {_id}</h5>
          <h5>This To Certify That</h5>
          <h2 className="candidateName">{candidateName.toUpperCase()}</h2>
          <h5 >Has Been Granted Award</h5>
          <div className="sector">
          <h5>{title} </h5>
         
          <h5>Division : {department}</h5>
          </div>
          
          <h4>Grade : {grade}</h4>

          <div className="contentDate">
              <p>Issue Date : {issueDate}</p>
              <p>Valid untill : {validity}</p>
          </div>
        </div>
      </StyleCrtificate>
    </Wrapper>
  );
};

export default CertificateCandidateWithoutLoggedIn;
