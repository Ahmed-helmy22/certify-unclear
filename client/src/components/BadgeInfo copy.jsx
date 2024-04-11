import Wrapper from "../assets/wrappers/BadgeInfo";
import { useDashboardContext } from "../pages/DashboardLayout";

const BadgeInfo = ({ badgePhoto, badgeStatus }) => {
  return (
    <Wrapper>
      <img
        src={`/badge/${badgePhoto}`}
        alt="badge photo"
        className="badge-photo"
      />
      {/* {user.role === 'not a user' ? <><div className={`status ${badgeStatus}`}>{badgeStatus}</div></> : " "} */}
      <hr
        style={{
          backgroundColor: `${
            badgeStatus === "declined"
              ? "red"
              : badgeStatus === "pending"
              ? "yellow"
              : "green"
          }`,
        }}
      />
    </Wrapper>
  );
};

export default BadgeInfo;
