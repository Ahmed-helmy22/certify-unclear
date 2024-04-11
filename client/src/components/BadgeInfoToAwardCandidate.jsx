import Wrapper from "../assets/wrappers/BadgeInfo";

const BadgeInfoToAwardCandidate = ({ badgePhoto, badgeStatus }) => {
  return (
    <Wrapper>
      <img
        src={`/badge/${badgePhoto}`}
        alt="badge photo"
        className="badge-photo"
      />

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

export default BadgeInfoToAwardCandidate;
