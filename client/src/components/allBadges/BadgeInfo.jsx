import Wrapper from "../../assets/wrappers/BadgeInfo";
 
const BadgeInfo = ({ badgePhoto , badge }) => {
  

  return (
    <Wrapper>
        <img
          src={`${badgePhoto}`}
          alt="badge photo"
          className="badge-photo"
        />
        {/* {user.role === 'not a user' ? <><div className={`status ${badgeStatus}`}>{badgeStatus}</div></> : " "} */}
        {/* <hr style={ {backgroundColor: `${ badgeStatus === 'declined' ? 'red' : badgeStatus === 'pending'? 'yellow' : 'green'}`}}/> */}
         <hr style={ {backgroundColor: "green" }}/>

      </Wrapper>
    );

};

export default BadgeInfo;
