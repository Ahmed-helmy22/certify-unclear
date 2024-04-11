import Wrapper from "../assets/wrappers/BadgeContainer";
import Badge from "./Badge";
import { useAllBadgesContext } from "./AllBadges";
 

const BadgesProviderContainer = () => {
  const { data ,response} = useAllBadgesContext();

 if (response?.status === 404) return (
    <Wrapper>
      <h2>No Badges to display....</h2>
    </Wrapper>
  );

    return (
      <Wrapper>
        <h5>Badges{data?.data?.length > 1 && 's'} found</h5>
         {data?.data.map((badgeYear) => {
             return <Badge key={badgeYear._id}  {...badgeYear}/>
         })}
      </Wrapper>
    );
  
};

export default BadgesProviderContainer;
