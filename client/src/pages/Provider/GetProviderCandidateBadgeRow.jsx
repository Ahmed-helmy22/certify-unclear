import {
  Name,
  TableRow,
  Title,
  Action,
  Img,
  HiddenId,
} from "../../assets/wrappers/TableWrapper";

 import day from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
 day.extend(advancedFormat);

const GetProviderCandidateBadgeRow = ({ badge }) => {
  const {
    status,
    badgephoto,
    bageTitle,
    candidateId,
    candidateFamilyName,
    candidateFirstName,
    dueDate,
    examinerFirstName,
    examinerId,
    examinerLastName,
    grade,
    issueDate,
     _id,
  } = badge;

  const issue = day(issueDate).format("MMM Do, YYYY");
  const due = day(dueDate).format("MMM Do, YYYY");

  return (
    <TableRow role="row" style={{ "--num-columns": 10 }}>
      <HiddenId>{_id}</HiddenId>
      <Img
        src={`/badge/${badgephoto}`}
        alt="badges"
        style={{ width: 50, height: "50px", borderRadius: "50%" }}
      />
      <Title>{bageTitle}</Title>
      <Name>
        {candidateFirstName} {candidateFamilyName}
      </Name>
      
      <Title>{issue}</Title>
      <Title>{due}</Title>
      <Title>{grade}</Title>
      <Name>
        {examinerFirstName} {examinerLastName}
      </Name>
      <HiddenId>{examinerId}</HiddenId>
      <Action>{status}</Action>
    </TableRow>
  );
};

export default GetProviderCandidateBadgeRow;
