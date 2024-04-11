import {
  TableRow,
  Name,
  Title,
  Published,
} from "../../assets/wrappers/TableWrapper";

import day from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
day.extend(advancedFormat);

const ExaminerPublishedBadgeHolderRow = ({ examinerPublishedBadgeHolder }) => {
  const {
    badgeTitle,
    candidateFamilyName,
    candidateFirstName,
    grade,
    issueDate,
    dueDate,
    providerOrganizationName,
    status,
    _id,
  } = examinerPublishedBadgeHolder;
  //  dueDate grade  status _id

  const duedate = day(dueDate).format("MMM Do, YYYY");
  const issuedate = day(issueDate).format("MMM Do, YYYY");
  return (
    <TableRow role="row" style={{ "--num-columns": 7 }}>
      <Name>
        {candidateFirstName} {candidateFamilyName}
      </Name>
      <Title>{badgeTitle}</Title>
      <Name>{providerOrganizationName}</Name>

      <Title>{issuedate}</Title>
      <Title>{duedate}</Title>
      <Title>{grade}</Title>
      <Published>{status}</Published>
    </TableRow>
  );
};

export default ExaminerPublishedBadgeHolderRow;
