import { useAllBadgesWithoutLoginContext } from "./AllBadgesWithoutLogin";
import WrapperBadgContainer from "../../assets/wrappers/BadgeContainer";
import BadgesYearlyContainerWithoutLogin from "./BadgesYearlyContainerWithoutLogin";

const BadgesContainerWithoutLogin = () => {
  const { candidatData } = useAllBadgesWithoutLoginContext();
 
   if (!candidatData?.data ) {
    return (
      <WrapperBadgContainer>
        <h2>No Badges to display....</h2>
      </WrapperBadgContainer>
    );
  }
  
  return (
    <>
      {candidatData.data.map((badgesPerYear, index) => (
        <BadgesYearlyContainerWithoutLogin badgesPerYear={badgesPerYear} key={index} />
      ))}
    </>
  );
};

export default BadgesContainerWithoutLogin;
