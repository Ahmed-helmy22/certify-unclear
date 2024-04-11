import React from "react";
import CandidateBadgeForProviderToAward from "./CandidateBadgeForProviderToAward";
import day from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
day.extend(advancedFormat);

 
const BadgesOfCandidateForProviderToAwardBadge = ({ badgesPerYear }) => {
  const { badges } = badgesPerYear;
  const date = day(badgesPerYear?.createdAt).format("MMM Do, YYYY");
   
  return (
    <>
      {badges?.map((badge, index) => (
        <CandidateBadgeForProviderToAward badge={badge} key={index} />
      ))}
      
    </>
  );
};

export default BadgesOfCandidateForProviderToAwardBadge;
