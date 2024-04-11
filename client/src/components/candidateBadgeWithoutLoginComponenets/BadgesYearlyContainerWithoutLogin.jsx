import React from "react";
import WrapperBadgContainer from "../../assets/wrappers/BadgeContainer";
import BadgesOfCandidateWithoutLogin from "./BadgesOfCandidateWithoutLogin";
import day from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
day.extend(advancedFormat);


const BadgesYearlyContainerWithoutLogin = ({badgesPerYear}) => {
  const { year } = badgesPerYear;
   
  return (
    <WrapperBadgContainer>
      <div>
        <h3 className="heading">{year} </h3>
      </div>
      <div className="badges-container">
        {<BadgesOfCandidateWithoutLogin badgesPerYear={badgesPerYear} />}
      </div>
    </WrapperBadgContainer>
  );
};

export default BadgesYearlyContainerWithoutLogin;
