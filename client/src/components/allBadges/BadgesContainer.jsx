import Badge from "./Badge";
import { useAllBadgesContext } from "./AllBadges";
import Wrapper from "../../assets/wrappers/Badge";

const BadgesContainer = () => {
  const { data } = useAllBadgesContext();

  if (!data) {
    return (
      <div className="container">
        <h2>No Data to display....</h2>
      </div>
    );
  }

  return (
    <Wrapper>
      {data?.data?.map((badgeYear) => {
        return <Badge key={badgeYear._id} {...badgeYear} />;
      })}
    </Wrapper>
  );
};

export default BadgesContainer;
