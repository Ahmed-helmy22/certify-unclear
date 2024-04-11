import React from 'react'
import BadgeInfoWithoutLogin from '../candidateBadgeWithoutLoginComponenets/BadgeInfoWithoutLogin';

import day from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
day.extend(advancedFormat);

const CandidateBadgeForProviderToAward = ({ badge }) => {
    const dueDate = day(badge?.dueDate).format("MMM Do, YYYY");
    const issueDate = day(badge?.issueDate).format("MMM Do, YYYY");
     
    return (
        <div className="content">
          <div className="badges">
            <div className="badges-center">
              <BadgeInfoWithoutLogin badgePhoto={badge?.photo} badge={badge} />
            </div>
            <div className="badges-info">
              <h5 style={{wordBreak: 'breakAll' , fontSize: '1.2rem'}}>{badge?.title}</h5>
              <p>{badge?.badgeDepartment}</p>
               {/* <h5>{badge?.source}</h5> */}
              {/* <h5>{issueDate}</h5> */}
            </div>
            <div>
              <p>{dueDate}</p>
            </div>
            <footer
              className="actions"
              style={{
                display: "flex",
                justifyContent: "space-evenly",
                paddingTop: ".5rem",
              }}
            >
               
            </footer>
          </div>
        </div>
         
      );
}

export default CandidateBadgeForProviderToAward