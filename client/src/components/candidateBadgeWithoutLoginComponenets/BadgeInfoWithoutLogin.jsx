import Wrapper from "../../assets/wrappers/BadgeInfo";

const BadgeInfoWithoutLogin = ({ badgePhoto, badge }) => {
  if (badge?.source === "external") {
    return (
      <Wrapper>
        <img src={badgePhoto} alt="badge photo" className="badge-photo" />
        {/* {user.role === 'not a user' ? <><div className={`status ${badgeStatus}`}>{badgeStatus}</div></> : " "} */}
        {/* <hr style={ {backgroundColor: `${ badgeStatus === 'declined' ? 'red' : badgeStatus === 'pending'? 'yellow' : 'green'}`}}/> */}
      </Wrapper>
    );
  } else {
    return (
      <Wrapper>
        <img src={badgePhoto} alt="badge photo" className="badge-photo" />
        {/* {user.role === 'not a user' ? <><div className={`status ${badgeStatus}`}>{badgeStatus}</div></> : " "} */}
        {/* <hr style={ {backgroundColor: `${ badgeStatus === 'declined' ? 'red' : badgeStatus === 'pending'? 'yellow' : 'green'}`}}/> */}
      </Wrapper>
    );
  }
};

export default BadgeInfoWithoutLogin;
