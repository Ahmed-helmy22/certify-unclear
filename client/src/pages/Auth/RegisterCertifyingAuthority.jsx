import { Form, Link, redirect, useNavigation } from "react-router-dom";
import customFetch from "../../utils/customFetch";
import { toast } from "react-toastify";
import image from "../../assets/images/host-banner.png";
import { CERTIFY_AUTHORITY_TYPE } from "../../utils/constants";
import {
  MainWrapper,
  MainPage,
} from "../../assets/wrappers/RegistrationLoginPage";

import { FaUser } from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";
import { MdEmail } from "react-icons/md";
import { useState } from "react";
import { FileUploader } from "../../components";

export const action = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  let pattern = /^[a-zA-Z0-9_\-\s]*$/;

  const errors = { msg: "" };
  if (data?.userAgreement === "") {
    errors.msg = "Please read licence agreement and approve 👍";
    toast.error(errors.msg);
    return errors;
  }
  if (data?.firstName === "" || data?.familyName === "") {
    errors.msg = "First Name and/or Family Name are required";
    toast.error(errors.msg);
    return errors;
  }
  if (data?.firstName.length < 2 || data?.familyName.length < 2) {
    errors.msg =
      "First Name and/or Family Name Shall contains more than 2 character";
    toast.error(errors.msg);
    return errors;
  }
  if (
    !pattern.test(data?.firstName) ||
    !pattern.test(data?.familyName)
  ) {
    errors.msg = "Name Shall not inlclude any speical character aA-zZ:0-9 only";
    toast.error(errors.msg);
    return errors;
  }
  if (data?.phoneNumber === "") {
    errors.msg = "phone Number is required";
    toast.error(errors.msg);
    return errors;
  }
  if (!pattern.test(data?.phoneNumber)) {
    errors.msg =
      "Phone number Shall not inlclude any speical character aA-zZ:0-9 only";
    toast.error(errors.msg);
    return errors;
  }
  if (data?.phoneNumber > 5 && data?.phoneNumber < 30) {
    errors.msg = "phone Number shall be 5 : 30 numbers only";
    toast.error(errors.msg);
    return errors;
  }
  if (data?.email == "") {
    errors.msg = "Email is required";
    toast.error(errors.msg);
    return errors;
  }
  if (!data?.email.includes(".com")) {
    errors.msg = "its not an email please check again";
    toast.error(errors.msg);
    return errors;
  }
  if (data?.password?.length < 9) {
    errors.msg = "Password shall be not less than 9 characters / numbers!!!";
    toast.error(errors.msg);
    return errors;
  }
  if (data?.password !== data?.confirmPassword) {
    errors.msg = "Password and confirm password shall be matched!!";
    toast.error(errors.msg);
    return errors;
  }
  try {
    await customFetch.post("/examiner/signup", formData);
    toast.success("Registration successful");
    return redirect("/register/email-verification");
  } catch (error) {
    errors.msg = error?.response?.data?.message;
    toast.error(errors.msg);
    return error;
  }
};

const RegisterCertifyingAuthority = () => {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  const [selectedOption, setSelectedOption] = useState("");
  const [checkAgreement, setCheckAgreement] = useState(false);
  const handleCheckUserAgrrement = () => {
    setCheckAgreement(!checkAgreement);
  };

  const handleSelectChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedOption(selectedValue);

    // Do something with the selected value
    console.log("Selected Value:", selectedValue);
  };
  const [fileName, setFileName] = useState("");
  const handleFile = (file) => {
    setFileName(file.name);
  };
  const [fileName2, setFileName2] = useState("");
  const handleFile2 = (file) => {
    setFileName2(file.name);
  };
  return (
    <MainPage>
      <MainWrapper>
        <div className="bgImag">
          <img src={image} alt="" />
        </div>

        <div className="wrapperForm">
          <div>
            <h4>CERTIFYING AUTHORITY</h4>
          </div>
          <div className="header">
            <p>
              Already a member ?
              <Link to="/login" className="member-btn">
                Login
              </Link>
            </p>
          </div>
          <hr className="hrLine" />

          <Form method="post" className="form" encType="multipart/form-data">
            <div className="input-box">
              <div className="input-field">
                <input
                  type="text"
                  name="firstName"
                  placeholder="First Name"
                  required
                />

                <FaUser className="icon" />
              </div>

              <div className="input-field">
                <input
                  type="text"
                  name="familyName"
                  placeholder="Family Name"
                  required
                />
                <FaUser className="icon" />
              </div>
            </div>

            <div className="input-box">
              <div className="input-field">
                <select
                  name=""
                  id=""
                  defaultValue="Profession"
                  onChange={handleSelectChange}
                >
                  <option disabled defaultValue="Profession">Profession</option>

                  {Object.entries(CERTIFY_AUTHORITY_TYPE)?.map(
                    ([key, value], index) => (
                      <option key={index} value={value}>
                        {value}
                      </option>
                    )
                  )}
                </select>
                <input
                  type="text"
                  name="profession"
                  id="profession"
                  value={selectedOption}
                  hidden
                />
              </div>
                
              {selectedOption.includes('ASNT')   ? <div className="input-box">
                <input
                  className="input-field"
                  type="text"
                  name="asntRegNumber"
                  placeholder="ASNT ID"
                />
              </div> : <div className="input-box">
                <input
                  className="input-field"
                  type="text"
                  name="otherRegNumber"
                  disabled
                />
              </div>}
               
            </div>
            <div className="input-box">
              <div className="input-field">
                <input
                  type="text"
                  name="phoneNumber"
                  placeholder="Phone Number"
                  required
                />
              </div>
              <div className="input-field">
                <FileUploader
                  handleFile={handleFile}
                  showName= {fileName ? <p>Uploaded file: {fileName}</p> : "Passport scan"}
                  uploadName="examinerPassportPhoto"
                />
               
              </div>
            </div>

            <div className="input-box">
              <div className="input-field">
                <FileUploader
                  handleFile={handleFile2}
                  showName= {fileName2 ? <p>Uploaded file: {fileName2}</p> : "Selfie Photo With Passport"}
                  uploadName="examinerVerificationPhoto"
                />
               
              </div>
            </div>

            <div className="input-box">
              <div className="input-field">
                <input type="email" placeholder="email" required name="email" />
                <MdEmail className="icon" />
              </div>
            </div>

            <div className="input-box">
              <div className="input-field">
                <input
                  type="password"
                  placeholder="password"
                  required
                  name="password"
                />
                <RiLockPasswordFill className="icon" />
              </div>
              <div className="input-field">
                <input
                  type="password"
                  placeholder="confirm password"
                  required
                  name="confirmPassword"
                />
                <RiLockPasswordFill className="icon" />
              </div>
            </div>
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
                <Link className="licenceAgreement">
                  end-user-license agreement
                </Link>
              </label>
            </div>
            <div className="form-btn">
              <button type="submit" className="btn" disabled={isSubmitting}>
                {isSubmitting ? "submitting" : "submit"}
              </button>
            </div>
          </Form>
        </div>
      </MainWrapper>
    </MainPage>
  );
};

export default RegisterCertifyingAuthority;
