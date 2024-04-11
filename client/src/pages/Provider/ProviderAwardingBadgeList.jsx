import { useCandidateDataToAWardingContext } from "./ProviderAwardingBadgeAdd";
 import WrapperBadgContainer from "../../assets/wrappers/BadgeContainer";
import AllBadgesForProviderToAwardBadge from "../../components/CandidateBadgesForProviderToAwardBadge/AllBadgesForProviderToAwardBadge";
  
const ProviderAwardingBadgeList = () => {
  const { data } = useCandidateDataToAWardingContext();
  
  console.log(data);
   if (data.length === 0 || !data) {
    return (
      <WrapperBadgContainer>
        <h2>No Badges to display....</h2>
      </WrapperBadgContainer>
    );
  }

   return (
    <>
      {data?.map((badgesPerYear, index) => (
          
         <AllBadgesForProviderToAwardBadge badgesPerYear={badgesPerYear} key={index}/>
      ))}
    </>
  );
};

export default ProviderAwardingBadgeList;
