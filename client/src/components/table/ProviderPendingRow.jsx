import { TableRow, Name, Title } from "../../assets/wrappers/TableWrapper";

import day from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
import { useState } from "react";
day.extend(advancedFormat);

function ProviderPendingRow({ pendingBadge }) {
  console.log(pendingBadge);
  const {
    candidateFamilyName,
    candidateFirstName,
    candidateCountry,
    candidateId,
    dueDate,
    examinerFirstName,
    examinerId,
    examinerLastName,
    grade,
    issueDate,
    _id,
  } = pendingBadge;
  const duedate = day(dueDate).format("MMM Do, YYYY");
  const issuedate = day(issueDate).format("MMM Do, YYYY");
  const [isHovered, setIsHovered] = useState(false);

  const [isIdHovered, setIdHovered] = useState(false);
  const [isCandidateIdHovered, setCandidateIdHovered] = useState(false);
  const [isExaminerIdHovered, setExaminerIdHovered] = useState(false);
  return (
    <TableRow role="row" style={{ "--num-columns":7 }}>
      <Title
        onMouseEnter={() => setIdHovered(true)}
        onMouseLeave={() => setIdHovered(false)}
      >
        {isIdHovered ? _id : _id.substring(0, 6)}
      </Title>
      <Name>
        {candidateFirstName} {candidateFamilyName}
      </Name>
      <Title
        onMouseEnter={() => setCandidateIdHovered(true)}
        onMouseLeave={() => setCandidateIdHovered(false)}
      >
        {isCandidateIdHovered ? candidateId : candidateId.substring(0, 6)}
      </Title>
       <Name>
        {examinerFirstName} {examinerLastName}
      </Name>
      
      <Title>{issuedate}</Title>
      <Title>{duedate}</Title>
      <Title>{grade}</Title>
    </TableRow>
  );
}

export default ProviderPendingRow;
