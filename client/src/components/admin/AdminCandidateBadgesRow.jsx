import {
  Name,
  TableRow,
  Title,
  Published,
  Declined,
  Pending,
 } from "../../assets/wrappers/TableWrapper";

import day from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
import { Link } from "react-router-dom";
day.extend(advancedFormat);

const AdminCandidateBadgesRow = ({ candidateBadge }) => {
  const due = day(candidateBadge.issueDate).format("MMM Do, YYYY");
   return (
    <TableRow role="row" style={{ "--num-columns": 9 }}>
      <Title>{candidateBadge.badgeTitle}</Title>
      <Title>
        {candidateBadge.candidateFirstName} {candidateBadge.candidateFamilyName}
      </Title>
      <Title>{due}</Title>
      <Title>{candidateBadge.providerOrganizationName}</Title>
      <Title>
        {candidateBadge.examinerFirstName} {candidateBadge.examinerFamilyName}
      </Title>
      <Title>{candidateBadge.grade}</Title>
      <Title>{candidateBadge.note}</Title>
      {candidateBadge.status === "published" ? (
        <Published>{candidateBadge.status}</Published>
      ) : candidateBadge.status === "pending" ? (
        <Pending>{candidateBadge.status}</Pending>
      ) : (
        <Declined>{candidateBadge.status}</Declined>
      )}
      <>
        {candidateBadge.status === "published" && (
          <Link
            className="btn adminAction"
            to={`../candidate-badges/view/${candidateBadge._id}`}
          >
            view
          </Link>
        )}
      </>
    </TableRow>
  );
};

export default AdminCandidateBadgesRow;
