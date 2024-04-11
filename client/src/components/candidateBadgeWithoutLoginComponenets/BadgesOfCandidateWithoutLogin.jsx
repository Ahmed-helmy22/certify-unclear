import CandidateBadgeInternalExternalWithoutLogin from './CandidateBadgeInternalExternalWithoutLogin';
import day from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
day.extend(advancedFormat);



const BadgesOfCandidateWithoutLogin = ({badgesPerYear}) => {
  const { badges } = badgesPerYear;
  const date = day(badgesPerYear?.createdAt).format("MMM Do, YYYY");
   
  return (
    <>
      {badges?.map((badge, index) => (
        <CandidateBadgeInternalExternalWithoutLogin badge={badge} key={index} />
      ))}
    </>
  );
}

export default BadgesOfCandidateWithoutLogin