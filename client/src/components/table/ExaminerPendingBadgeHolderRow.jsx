import { useState } from "react";
import {
  TableRow,
  Name,
  Title,
  Published,
  ExaminerPendingTableBtn,
} from "../../assets/wrappers/TableWrapper";

import day from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
import { Link, useNavigate } from "react-router-dom";
import { ModalDecline } from "..";
import EditModelForExaminerToViewBadgCandidate from "../EditModelForExaminerToViewBadgCandidate";
import ApproveModelPendingBadgesForExaminer from "../ApproveModelPendingBadgesForExaminer";
day.extend(advancedFormat);

const ExaminerPendingBadgeHolderRow = ({ examinerPendingBadgeHolder }) => {
  const navigate = useNavigate();

  const {
    badgeTitle,
    candidateFamilyName,
    candidateFirstName,
    grade,
    issueDate,providerOrganizationName,
    status,
    _id,
  } = examinerPendingBadgeHolder;
  //  dueDate grade  status _id
  const issuedate = day(issueDate).format("MMM Do, YYYY");

  const [isModalActive, setIsModalActive] = useState(false);
  const [isEditModalActive, setIsEditModalActive] = useState(false);
  const [isApproveModalActive, setIsApproveModalActive] = useState(false);

  const modalWork = () => {
    setIsModalActive(!isModalActive);
  };

  const editModalWork = () => {
    setIsEditModalActive(!isEditModalActive);
  };

  const approveModalWork = () => {
    setIsApproveModalActive(!isApproveModalActive);
  };

  const handleViewClick = () => {
    // Navigate to the view URL and pass the badge ID
    navigate(`/dashboard/examiner/pending-badges/${_id}`);
  };
  return (
    <TableRow role="row" style={{ "--num-columns": 7 }} >
      <Name>
        {candidateFirstName} {candidateFamilyName}
      </Name>
      <Name>{providerOrganizationName}</Name>
      <Name>{badgeTitle}</Name>
      <Title>{issuedate}</Title>
      <Title>{grade}</Title>
      <Published>{status}</Published>
      <ExaminerPendingTableBtn> 
        <div
          className="examinerAction"
          style={{ display: "flex", gap: ".4rem" , flexWrap : 'wrap'}}
        >
          <Link
            type="submit"
            className="btn approve-btn"
            to={`/dashboard/examiner/pending-badges/${_id}`}
          >
            view
          </Link>

          <button
            type="button"
            className="btn approve-btn"
            onClick={approveModalWork}
          >
            Approve
          </button>

          <button type="button" className="btn decline-btn" onClick={modalWork}>
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
        {isEditModalActive ? (
          <EditModelForExaminerToViewBadgCandidate
            id={_id}
            setIsEditModalActive={setIsEditModalActive}
            isEditModalActive={isEditModalActive}
            editModalWork={editModalWork}
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
      </ExaminerPendingTableBtn>
    </TableRow>
  );
};

export default ExaminerPendingBadgeHolderRow;
