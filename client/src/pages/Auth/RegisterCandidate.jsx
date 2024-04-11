import {
  Form,
  Link,
  redirect,
  useLoaderData,
  useNavigation,
} from "react-router-dom";
import customFetch from "../../utils/customFetch";
import { toast } from "react-toastify";
import image from "../../assets/images/host-banner.png";
import {
  MainWrapper,
  MainPage,
} from "../../assets/wrappers/RegistrationLoginPage";

import { FaUser } from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";
import { MdEmail } from "react-icons/md";
import { useState } from "react";
import ExternalLeeCountrySecond from "../../components/ExternalLeeCountrySecond";
import { FileUploader } from "../../components";

export const loader = async () => {
  try {
    const { data } = await customFetch.get("/externalBadge/allWebsites");
    return data;
  } catch (error) {
    toast.error(error?.response?.data?.message);
    return error;
  }
};

export const action = async ({ request }) => {
  const formData = await request.formData();

  const data = Object.fromEntries(formData);

   
  const candidateVerificationfile = formData.get("candidateVerificationPhoto");
  const candidatePassportfile = formData.get("candidatePassportPhoto");

   const errors = { msg: "" };
  if (data.firstName == "") {
    errors.msg = "First Name is required";
    toast.error(errors.msg);
    return errors;
  }
  if (data.familyName == "") {
    errors.msg = "Family Name is required";
    toast.error(errors.msg);
    return errors;
  }
  if (data.email == "") {
    errors.msg = "Email is required";
    toast.error(errors.msg);
    return errors;
  }
  let pattern = /^[a-zA-Z0-9\-]*$/;
  if (!pattern.test(data.familyName) || !pattern.test(data.firstName)) {
    errors.msg = "Shall not inlclude any speical character aA-zZ:0-9 only";
    toast.error(errors.msg);
    return errors;
  }
  if (!candidateVerificationfile && !candidatePassportfile) {
    errors.msg = "please attache the required documents";
    toast.error(errors.msg);
    return errors;
  }
  if (!data.email.includes(".com")) {
    errors.msg = "its not an emial please check again";
    toast.error(errors.msg);
    return errors;
  }
  if (data.password.length < 9) {
    errors.msg = "password shall be not length than 9 numbers";
    toast.error(errors.msg);
    return errors;
  }
  if (data.password !== data.confirmPassword) {
    errors.msg = "password and confirm passowrd are not matched";
    toast.error(errors.msg);
    return errors;
  }

  if (!data.userAgreement) {
    errors.msg = "check licence agreement";
    toast.error(errors.msg);
    return errors;
  }
   try {
    await customFetch.post("/candidate/signup", formData);
    toast.success("Registration successful");
    return redirect("/register/email-verification");
  } catch (error) {
    errors.msg = error?.response?.data?.message;
    toast.error(errors.msg);
    return error;
  }
};

const RegisterCandidate = () => {
  const [selectFields, setSelectFields] = useState([]);
  const [inputValues, setInputValues] = useState();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  const data = useLoaderData();
  const [checkAgreement, setCheckAgreement] = useState(false);
  const handleCheckUserAgrrement = () => {
    setCheckAgreement(!checkAgreement);
  };

  const itraWebsite = data?.externalWebsites.find(
    (website) => website.title === "IRATA"
  );
  const itraWebsiteId = itraWebsite.Id;

  const myCertWebsite = data?.externalWebsites.find(
    (website) => website.title === "MYCERT"
  );
  const myCertWebsiteId = myCertWebsite._id;
  const leeanitWebsite = data?.externalWebsites.find(
    (website) => website.title === "LEEA"
  );
  const leeanitWebsiteId = leeanitWebsite._id;

  const handleSelectChange = (e) => {
    const selectedValue = e.target.value;
    const valueExists = selectFields.find(
      (field) => field.selectedValue === selectedValue
    );
    if (!valueExists) {
      const newSelectedField = [
        ...selectFields,
        { id: selectFields.length + 1, selectedValue },
      ];
      setSelectFields(newSelectedField);
    }
  };

  const cancelSelectedField = (e) => {
    const selectedValue = e.target.id;
    const updatedSelectFields = selectFields.filter(
      (item) => item.selectedValue !== selectedValue
    );
    const updatedInputValues = { ...inputValues };
    delete updatedInputValues[selectedValue];
    setSelectFields(updatedSelectFields);
    setInputValues(updatedInputValues);
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
            <h4>CANDIDATE</h4>
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
            <div className="" style={{ display: "grid" }}>
              {selectFields.map((selectField, indexItem) => (
                <div key={indexItem} style={{ display: "flex" }}>
                  {selectField.selectedValue === "LEEA" && (
                    <div className="input-box3">
                      <input
                        type="text"
                        className="input-field"
                        name="leeWebsiteId"
                        defaultValue={leeanitWebsite?._id || ""}
                        hidden
                      />

                      <div className="input-field">
                        <ExternalLeeCountrySecond className="input-field" />
                      </div>

                      <input
                        type="text"
                        name="leeRegNumber"
                        className="input-field"
                        placeholder="LEEEA reg no"
                      />
                    </div>
                  )}
                  {selectField.selectedValue === "MYCERT" && (
                    <div className="input-box">
                      <input
                        type="text"
                        className="input-field"
                        name="mycertWebsiteId"
                        defaultValue={myCertWebsite?._id}
                        hidden
                      />
                      <input
                        type="text"
                        name="myCertRegNumber"
                        className="input-field"
                        placeholder="My Cert Reg No"
                      />
                    </div>
                  )}
                  {selectField.selectedValue === "IRATA" && (
                    <div className="input-box">
                      <input
                        type="text"
                        className="input-field"
                        name="itraWebsiteId"
                        defaultValue={itraWebsite?._id}
                        hidden
                      />
                      <input
                        type="text"
                        name="itraName"
                        className="input-field"
                        placeholder="Irata Reg name"
                      />
                      <input
                        type="text"
                        name="itraRegNumber"
                        className="input-field"
                        placeholder="Irata Reg Number"
                      />
                    </div>
                  )}
                  {selectField.selectedValue !== "IRATA" &&
                  selectField.selectedValue !== "MYCERT" &&
                  selectField.selectedValue !== "LEEA" &&
                  selectField.selectedValue !== "Awarded Certificate" ? (
                    <div className="input-box">
                      <input
                        type="text"
                        className="input-field"
                        name={selectField.selectedValue}
                        id={selectField.id}
                        disabled
                        value={selectField.selectedValue}
                      />
                    </div>
                  ) : (
                    <></>
                  )}
                  {selectField.selectedValue === "Awarded Certificate" && null}
                  {selectField.selectedValue === "Awarded Certificate" ? (
                    <></>
                  ) : (
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        paddingLeft: "1rem",
                      }}
                    >
                      <button
                        style={{
                          border: "1px",
                          borderRadius: 100,
                          width: 30,
                          height: 30,
                          cursor: "pointer",
                        }}
                        onClick={cancelSelectedField}
                        id={selectField.selectedValue}
                      >
                        X
                      </button>
                    </div>
                  )}
                </div>
              ))}

              <select
                name=""
                id=""
                className="form-select"
                onChange={handleSelectChange}
                defaultValue="Awarded Certificate"
              >
                <option value="Awarded Certificate" disabled>
                  Awarded Certificate
                </option>
                {data?.externalWebsites?.map((option, index) => (
                  <option key={index} value={option.id}>
                    {option.title}
                  </option>
                ))}
              </select>
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
                  showName="Passport scan"
                  uploadName="candidatePassportPhoto"
                />
                {fileName ? <p>Uploaded file: {fileName}</p> : null}
              </div>
            </div>

            <div className="input-box">
              <div className="input-field">
                <FileUploader
                  handleFile={handleFile2}
                  showName="Selfie Photo With Passport"
                  uploadName="candidateVerificationPhoto"
                />
                {fileName2 ? <p>Uploaded file: {fileName2}</p> : null}
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

export default RegisterCandidate;
