import BadgeInfo from "./../../components/BadgeInfo";

import day from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
day.extend(advancedFormat);

const CandidateOneBadgeForProvider = ({ badges }) => {
  const issuedate = day(badges.issueDate).format("MMM Do, YYYY");
  const duedate = day(badges.dueDate).format("MMM Do, YYYY");

  return (
    <div>
      <hr />
      <div className="badges">
        <div className="badges-center">
          <BadgeInfo badgePhoto={badges.photo} />
        </div>
        <div className="badges-info">
          <h5>{badges.title}</h5>
          <p>{badges.department}</p>
        </div>
        <div>
          <p>Issued :{issuedate}</p>
          <p>Due date: {duedate}</p>

        </div>
      </div>
    </div>
  );
};

export default CandidateOneBadgeForProvider;
