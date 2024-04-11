import { useNavigation } from "react-router-dom";
import { useDashboardContext } from "../../pages/DashboardLayout";
import day from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
import CandidateBadgeInternalExternal from "../CandidateBadgeInternalExternal";
day.extend(advancedFormat);

const BadgesOfCandidate = ({ badgesPerYear }) => {
  const { user } = useDashboardContext();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  const { badges } = badgesPerYear;

  const date = day(badgesPerYear?.createdAt).format("MMM Do, YYYY");
  return (
    <>
      {badges?.map((badge, index) => (
        <CandidateBadgeInternalExternal badge={badge} key={index} />
      ))}
    </>
  );
};

export default BadgesOfCandidate;
