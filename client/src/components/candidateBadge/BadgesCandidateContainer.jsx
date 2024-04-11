import WrapperBadgContainer from "../../assets/wrappers/BadgeContainer";
import { useAllCandidateBadgesContext } from "./AllBadgesOfCandidate";
 import BadgesYearlyContainer from "./BadgesYearlyContainer";

const BadgesCandidateContainer = () => {
  const { candidatData } = useAllCandidateBadgesContext();
    if (!candidatData?.data) {
    return (
      <WrapperBadgContainer>
        <h2>No Badges to display....</h2>
      </WrapperBadgContainer>
    );
  }
 
  return (
    <WrapperBadgContainer>
      {candidatData.data.map((badgesPerYear, index) => (
        <BadgesYearlyContainer badgesPerYear={badgesPerYear} key={index} />
      ))}
    </WrapperBadgContainer>
  );
};

export default BadgesCandidateContainer;
