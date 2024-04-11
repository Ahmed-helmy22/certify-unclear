import {
  TableRow,
  Name,
  Title,
  Published,
} from "../../assets/wrappers/TableWrapper";
import day from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
day.extend(advancedFormat);

const ExaminerInstituteListRow = ({ examinerInstitute }) => {
  const {
    badgeTitle,
    candidateFamilyName,
    candidateFirstName,
    grade,
    issueDate,
    status,
    _id,
  } = examinerInstitute;
  //  dueDate grade  status _id
  const issuedate = day(issueDate).format("MMM Do, YYYY");

  return (
    <TableRow role="row" style={{ "--num-columns": 7 }}>
      <Name>
        {candidateFirstName} {candidateFamilyName}
      </Name>
      <Name>{badgeTitle}</Name>
      <Title>{_id}</Title>

      <Title>{issuedate}</Title>
      <Title>{grade}</Title>
      <Published>{status}</Published>
    </TableRow>
  );
};

export default ExaminerInstituteListRow;
