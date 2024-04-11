import styled from "styled-components";
import customFetch from "../../utils/customFetch";
import { toast } from "react-toastify";
import { Link, redirect, useLoaderData } from "react-router-dom";

import day from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
import Wrapper from "../../assets/wrappers/BadgeContainer";
import ApproveModelPendingBadgesForExaminer from "../../components/ApproveModelPendingBadgesForExaminer";
import { ModalDecline } from "../../components";
import { useState } from "react";
day.extend(advancedFormat);

const StyleCrtificate = styled.div`
  background: var(--background-secondary-color);
  border-radius: var(--border-radius);
  padding: 2rem;
  text-align: center;
  border: 2px solid var(--text-color); /* Add border styling here */
  outline: 10px double;
  margin-bottom: 1rem;
  
 
  .header {
    display: flex;
    justify-content: space-around;
    font-family: "Courier New", Courier, monospace;
    img {
      width: 150px;
      height: 150px;
    }
  }
  .content {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    font-family: "Courier New", Courier, monospace;
    .contentDate {
      display: flex;
      justify-content: space-between;
    }
    .sector {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 2rem;
    }
    .providerName {
      font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;
    }
    .candidateName {
      font-family: "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS",
        sans-serif;
    }
    
  }
  .examinerAction {
      display: flex;
      justify-content: center;
      
      align-items: center;
      gap: 2rem;
      
      button{
        padding: 1rem;
        font-size: 1.5rem;
      }
      .decline-btn{
        background-color: var(--red-dark);
        
        :hover{
          background-color: var(--red-light);
          color: var(--grey-800);
        }
      }
    }
`;

export const loader = async ({ params }) => {
   try {
    const { data } = await customFetch.get(
      `/examiner/viewCandidateBadge/${params.id}`
    );
    return data;
  } catch (error) {
    toast.error(error.response?.data?.message);
    redirect("/dashboard/examiner/pending-badges");
    return error;
  }
};

const ExaminerToViewThePendingBadge = () => {
  const { data } = useLoaderData();
   const [isModalActive, setIsModalActive] = useState(false);
  const [isApproveModalActive, setIsApproveModalActive] = useState(false);
  console.log(data);
  // Destructure the needed data
  const {
    _id,
    badgeId,
    createdAt,
    issueDate,
    dueDate,
    status,
    note,
    grade,
    examinerId,
    candidateId,
    providerId,
  } = data;

  const badgePhoto = badgeId.badgePhoto;
  const department = badgeId.department;
  const title = badgeId.title;

  // const examinerName = `${examinerId.firstName} ${examinerId.familyName}`;
  const candidateName = `${candidateId.firstName}  ${candidateId.familyName}`;
  const candidateProfilePhoto = candidateId.candidateProfilePhoto;
   //  const providerType = providerId.providerType;
  // const providerlogo = providerId.logo;

  // Create a PDF document with the data
  // const validUntill = dueDate - createdAt
  const issuedate = day(issueDate).format("MMM Do, YYYY");
  const validity = day(dueDate).format("MMM Do, YYYY");

  const modalWork = () => {
    setIsModalActive(!isModalActive);
  };

   const approveModalWork = () => {
    setIsApproveModalActive(!isApproveModalActive);
  };
   

  return (
    <Wrapper>
      <div className="closeExaminerbtn">
        <Link type="submit" className="btn closBtnExaminer" to={'../pending-badges'}>Close</Link>
      </div>
      <StyleCrtificate className="container">
        <div className="header">
          <div>
            <img
              src={`${candidateId.providerlogo}`}
              alt={candidateId.providerType}
            />
            <p>Academy</p>
          </div>
          <div>
          <img
              src={`${badgeId.badgePhoto}`}
              alt={badgeId.title}
            />
            <p>Badge</p>
            </div>
          <div>
          <img
              src={`${candidateProfilePhoto}`}
              alt={candidateId.firstName}
            />
            <p>Candidate</p>
            
          </div>
        </div>
        <div className="content">
          {/* <h3 className="providerName">{providerType}</h3> */}
          
          <h5>Internal Certificate No. : {_id}</h5>
          <h5>This To Certify That</h5>
          <h2 className="candidateName">{candidateName.toUpperCase()}</h2>
          <h5>Has Been Granted Award</h5>
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
        <div className="examinerAction">
          <button className="btn  approve-btn"  onClick={approveModalWork}>
            Approve
          </button>
          <button className="btn  decline-btn"  onClick={modalWork}>
            Decline
          </button>
        </div>
        {isModalActive ? (
          <ModalDecline
            id={_id}
            setIsModalActive={setIsModalActive}
            isModalActive={isModalActive}
            modalWork={modalWork}
          />
        ) : (
          ""
        )}
        

        {isApproveModalActive ? (
          <ApproveModelPendingBadgesForExaminer
            id={_id}
            setIsApproveModalActive={setIsApproveModalActive}
            isApproveModalActive={isApproveModalActive}
            approveModalWork={approveModalWork}
          />
        ) : (
          ""
        )}
      </StyleCrtificate>
    </Wrapper>
  );
};

export default ExaminerToViewThePendingBadge;
