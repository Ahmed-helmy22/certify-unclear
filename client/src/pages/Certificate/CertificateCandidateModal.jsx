import styled from "styled-components";
import { Link } from "react-router-dom";
import day from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
import Wrapper from "../../assets/wrappers/BadgeContainer";

day.extend(advancedFormat);

const ModalDecline = styled.div`
  background-color: var(--popupBackground);
  width: 100%;
  height: 100dvh;
  z-index: 999;
  right: 0;
  left: 0;
  top: 0;
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  justify-items: center;
`;

const ModelContent = styled.div`
  width: 100%;
  height: 100vh;
  position: fixed;
  left: 0%;
  right: 0%;
  top: 0%;
  bottom: 0%;
  z-index: 2;
  background-color: var(--background-color);
  border-radius: 1rem;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const StyleCrtificate = styled.div`
  background: var(--background-secondary-color);
  border-radius: var(--border-radius);
  padding: 2rem;
  text-align: center;
  border: 2px solid var(--text-color); /* Add border styling here */
  outline: 10px double;

  .header {
    display: flex;
    justify-content: space-around;
    font-family: "Courier New", Courier, monospace;
    img {
      width: 150px;
      height: 150px;
    }
  }
  .content {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    font-family: "Courier New", Courier, monospace;
    .contentDate {
      display: flex;
      justify-content: space-between;
    }
    .sector {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 2rem;
    }
    .providerName {
      font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;
    }
    .candidateName {
      font-family: "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS",
        sans-serif;
    }
  }
`;

const BtnActionModal = styled.div`
  display: flex;
  gap: 4rem;
  justify-content: center;
`;

const CertificateCandidateModal = ({
  modalWork,
  setIsModalActive,
  isModalActive,
}) => {
  return (
    <ModalDecline>
      <ModelContent>
        <Wrapper>
          <StyleCrtificate className="container">
            <div className="header">
              <div>
                <img
                  src="{`/provider/${providerlogo}`}"
                  alt="{candidateId.providerType}"
                />
                <p>Academy</p>
              </div>
              <div>
                <img
                  src="{`/candidate/${candidateProfilePhoto}`}"
                  alt="{candidateId.firstName}"
                />
                <p>Candidate</p>
              </div>
            </div>
            <div className="content">
              <h3 className="providerName">providerType</h3>
              <h5>Internal Certificate No. : _id</h5>
              <h5>This To Certify That</h5>
              <h2 className="candidateName">candidateName</h2>
              <h5>Has Been Granted Award</h5>
              <div className="sector">
                <h5> title </h5>

                <h5>Division : department </h5>
              </div>

              <h4>Grade : grade </h4>

              <div className="contentDate">
                <p>Issue Date : issueDate </p>
                <p>Valid untill : validity </p>
              </div>
            </div>
          </StyleCrtificate>
        </Wrapper>

        <BtnActionModal>
          <Link
            type="button"
            className="btn "
            style={{ padding: "1rem", width: "200px", fontSize: "2rem" }}
            // to="/dashboard/academy/all-badges"
            onClick={() => modalWork(setIsModalActive(!isModalActive))}
          >
            Close
          </Link>
        </BtnActionModal>
      </ModelContent>
    </ModalDecline>
  );
};

export default CertificateCandidateModal;
