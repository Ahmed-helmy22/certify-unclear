import WrapperBadgContainer from "../../assets/wrappers/BadgeContainer";
import BadgesOfCandidateForProviderToAwardBadge from "./BadgesOfCandidateForProviderToAwardBadge";

const AllBadgesForProviderToAwardBadge = ({badgesPerYear}) => {
  const { year } = badgesPerYear;
  return (
    <WrapperBadgContainer>
    <div>
      <h3 className="heading">{year} </h3>
    </div>
    <div className="badges-container">
      <BadgesOfCandidateForProviderToAwardBadge badgesPerYear={badgesPerYear}/>
     </div>
  </WrapperBadgContainer>
  )
}

export default AllBadgesForProviderToAwardBadge