import { Link, useNavigation } from "react-router-dom";
import { useState } from "react";
import BadgeInfo from "../BadgeInfo";

import day from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
day.extend(advancedFormat);

const BadgesOfCandidateWithoutLogin = ({ badgesPerYear }) => {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  const [isModalActive, setIsModalActive] = useState(false);

  const modalWork = () => {
    setIsModalActive(!isModalActive);
  };
  const date = day(badgesPerYear?.createdAt).format("MMM Do, YYYY");

  return (
    <div className="content">
      <div className="badges">
        <div className="badges-center">
          <BadgeInfo
            badgePhoto={badgesPerYear?.badge?.badgePhoto}
            badgeStatus={badgesPerYear?.status}
          />
        </div>
        <div className="badges-info">
          <h5>{badgesPerYear?.badge?.title}</h5>
          <p>{badgesPerYear?.badge?.department}</p>
          <h5>{badgesPerYear?.grade}</h5>
        </div>
        <div>
          <p>{date}</p>
        </div>
        <footer
          className="actions"
          style={{
            display: "flex",
            justifyContent: "space-evenly",
            paddingTop: ".5rem",
          }}
        >
          <>
            {badgesPerYear?.status === "published" ? (
              <Link
                to={`../view-certificate/${badgesPerYear._id}`}
                className="btn edit-btn"
              >
                View
              </Link>
            ) : (
              ""
            )}
          </>
        </footer>
      </div>
    </div>
  );
};

export default BadgesOfCandidateWithoutLogin;
