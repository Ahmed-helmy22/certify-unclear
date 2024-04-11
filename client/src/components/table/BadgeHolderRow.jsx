import {
  TableRow,
  Name,
  Title,
  Pending,
  Published,
  SmallActionSize,
  HiddenId,
} from "../../assets/wrappers/TableWrapper";

import day from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
import { Link } from "react-router-dom";
import { useState } from "react";
day.extend(advancedFormat);

function BadgeHolderRow({ badgeHolder }) {
  const [isIdHovered, setIdHovered] = useState(false);

  const date = day(badgeHolder.candidateDateOfBirth).format("MMM Do, YYYY");
  return (
    <TableRow role="row" style={{ "--num-columns": 6 }}>
      <Name>
        {badgeHolder?.firstName} {badgeHolder?.familyName}
      </Name>
      <HiddenId
        onMouseEnter={() => setIdHovered(true)}
        onMouseLeave={() => setIdHovered(false)}
      >
        {isIdHovered
          ? badgeHolder.candidateId
          : badgeHolder.candidateId.substring(0, 6)}
      </HiddenId>

      <Title>{date}</Title>
      <Pending>{badgeHolder.pendingCount}</Pending>
      <Published>{badgeHolder.publishedCount}</Published>
      <SmallActionSize>
        <Link to={`../view-badges/${badgeHolder.candidateId}`} className="btn">
          badge
        </Link>

        <Link to={`../view-profile/${badgeHolder.candidateId}`} className="btn">
          profile
        </Link>
      </SmallActionSize>
    </TableRow>
  );
}

export default BadgeHolderRow;
