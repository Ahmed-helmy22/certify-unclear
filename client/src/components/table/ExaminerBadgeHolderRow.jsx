import {
  TableRow,
  Name,
  Title,
  Declined,
  Pending,
  Published,
  SmallActionSize,
  HiddenId,
} from "../../assets/wrappers/TableWrapper";
import day from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
day.extend(advancedFormat);

import { Link } from "react-router-dom";

const ExaminerBadgeHolderRow = ({ examinerBadgeHolder }) => {
  console.log(examinerBadgeHolder , 'ssssssssssssssssss');
  const {
    badgeTitle,
    candidateFamilyName,
    candidateFirstName,providerOrganizationName,
    dueDate,
    candidateId,
    grade,
    issueDate,
    status,
    _id,
  } = examinerBadgeHolder;

  //  dueDate grade  status _id
  const duedate = day(dueDate).format("MMM Do, YYYY");
  const issuedate = day(issueDate).format("MMM Do, YYYY");
  return (
    <TableRow role="row" style={{ "--num-columns":8 }}>
      <Name>{badgeTitle}</Name>
      <Title>{providerOrganizationName}</Title>
      <Name>
        
        {candidateFirstName} {candidateFamilyName}
      </Name>
      <Title>{issuedate}</Title>
      <Title>{duedate}</Title>
      <Title>{grade}</Title>
      {status === "published" ? (
        <Published>{status}</Published>
      ) : status === "pending" ? (
        <Pending>{status}</Pending>
      ) : (
        <Declined>{status}</Declined>
      )}
      <SmallActionSize>
        {status === "published" ? (
          <Link to={`../view-certificate/${_id}`} className="btn">
            badge
          </Link>
        ) : (
          ""
        )}

        <Link to={`../view-profile/${candidateId}`} className="btn">
          profile
        </Link>
      </SmallActionSize>
    </TableRow>
  );
};

export default ExaminerBadgeHolderRow;
