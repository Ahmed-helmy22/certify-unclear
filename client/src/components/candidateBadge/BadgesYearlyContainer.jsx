import day from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
import WrapperBadgContainer from "../../assets/wrappers/BadgeContainer";
import BadgesOfCandidate from "./BadgesOfCandidate";
day.extend(advancedFormat);

const BadgesYearlyContainer = ({ badgesPerYear }) => {
  const { year } = badgesPerYear;

  return (
    <WrapperBadgContainer>
      <div>
        <h3 className="heading">{year} </h3>
      </div>
      <WrapperBadgContainer className="badges-container">
        <BadgesOfCandidate badgesPerYear={badgesPerYear} />
      </WrapperBadgContainer>
    </WrapperBadgContainer>
  );
};

export default BadgesYearlyContainer;
