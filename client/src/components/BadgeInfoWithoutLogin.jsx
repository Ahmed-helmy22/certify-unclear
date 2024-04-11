import Wrapper from "../assets/wrappers/BadgeInfo";

const BadgeInfoWithoutLogin = ({ badgePhoto, badgeStatus }) => {
  return (
    <Wrapper>
      <img
        src={`/badge/${badgePhoto}`}
        alt="badge photo"
        className="badge-photo"
      />
      <div className={`status ${badgeStatus}`}>{badgeStatus}</div>
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

export default BadgeInfoWithoutLogin;
