import {
  MainWrapper,
  MainPage,
} from "../../assets/wrappers/RegistrationLoginPage";
import { Logo } from "../../components";
import { Link } from "react-router-dom";
import image from "../../assets/images/host-banner.png";

const MainRegister = () => {
  return (
    <MainPage>
      {/* <Logo /> */}
      <MainWrapper>
        <div className="bgImag">
          <img src={image} alt="" />
        </div>

        <div className="wrapperForm">
          <div>
            <h4>Registration</h4>
          </div>

          <div className="header">
            <p>
              Already a member ?
              <Link to="/login" className="member-btn">
                Login
              </Link>
            </p>
          </div>
          <hr />

          <div className="form">
            <h5>Register as a :-</h5>
            <div className="btn-mainRegister">
              <Link to="candidate" className="btn-container">
                <p>Candidate</p>
              </Link>

              <Link to="academy" className="btn-container">
                <p>Badge Issuer</p>
              </Link>

              <Link to="examiner" className="btn-container">
                <p>Certifying Examiner</p>
              </Link>
            </div>
          </div>
        </div>
      </MainWrapper>
    </MainPage>
  );
};

export default MainRegister;
