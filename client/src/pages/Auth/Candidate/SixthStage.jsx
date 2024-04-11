const SixthStage = ({
  checkAgreement,
  handleCheckUserAgrrement,
  handleInputChange,
}) => {
  return (
    <div>
      <div className="input-box-agreement">
        <input
          type="checkbox"
          name="userAgreement"
          label="checkLicence"
          onChange={handleCheckUserAgrrement}
          value={checkAgreement ? true : false}
          checked={checkAgreement}
        />
        <label>
          By Checking this Box, you agree to the terms of our
          <span className="licenceAgreement">
            End-User-License Agreement (EULA)
          </span>
        </label>
      </div>
    </div>
  );
};

export default SixthStage;
