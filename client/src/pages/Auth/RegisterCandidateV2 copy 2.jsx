import {
  Form,
  Link,
  redirect,
  useLoaderData,
  useNavigation,
} from "react-router-dom";
import { useEffect, useState } from "react";
import Wrapper from "../../assets/wrappers/RegisterAndLoginPage";
import Wrapperv2 from "../../assets/wrappers/RegisterAndLoginPageV2";
import bgImage6 from "../../assets/images/undraw_updated_resume_re_7r9j.svg";
import customFetch from "../../utils/customFetch";
import { toast } from "react-toastify";
import Loading from "../Loading";
import {
  FaHome,
  FaPassport,
  FaPhoneAlt,
  FaRegAddressCard,
  FaUser,
} from "react-icons/fa";
import { SlCalender } from "react-icons/sl";
import { GiEgyptianProfile } from "react-icons/gi";
import { CiInboxIn } from "react-icons/ci";
import CountrySecond from "../../components/CountrySecond";
import { MdEmail, MdOutlineTitle } from "react-icons/md";
import ExternalLeeCountrySecond from "../../components/ExternalLeeCountrySecond";
import { RiLockPasswordFill } from "react-icons/ri";

export const loader = async () => {
  try {
    const { data } = await customFetch.get("/externalBadge/allWebsites");
    return { data };
  } catch (error) {
    toast.error(error?.response?.data?.message);
    return error;
  }
};
export const action = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
   try {
    await customFetch.post("/candidate/signup", data);
    toast.success("Registration successful");
    return redirect("/register/email-verification");
  } catch (error) {
    toast.error(error?.response?.data?.message);
    return error;
  }
};

const RegisterCandidateV2 = () => {
  const { data } = useLoaderData();
  const [page, setPage] = useState(0);
  const [selectFields, setSelectFields] = useState([]);
  const [inputValues, setInputValues] = useState();

  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  const isLoading = navigation.state === "loading";
  const [fieldInputData, setFeldInputData] = useState({
    firstName: "",
    middleName: "",
    familyName: "",
    DOBirth: "",
    gender: "",
    phoneNumber: "",
    city: "",
    POBox: "",
    address: "",
    qualification: "",
    occupation: "",
    PassportNumber: "",
    userAgreement: "",

    leeanit: "",
    leeCompany: "",
    leeRegNumber: "",

    myCert: "",
    myCertReg: "",

    irata: "",
    irataReg: "",

    email: "",
    confrimationEmail: "",

    password: "",
    confrimpassword: "",

    candidateProfilePhoto: null,
    candidatePassportPhoto: null,
    candidateVerificationPhoto: null,
    // ... (other form fields)
  });

  const [checkAgreement, setCheckAgreement] = useState(false);

  const [selectedGender, setSelectedGender] = useState(fieldInputData.gender);

  const handleInputChange = (e) => {
    e.preventDefault();
     const { name, value, type } = e.target;

    if (type === "file") {
      setFeldInputData((prevfieldInputData) => ({
        ...prevfieldInputData,
        [name]: e.target.files[0], // Update to handle files correctly
      }));
    } else {
      setFeldInputData((prevfieldInputData) => ({
        ...prevfieldInputData,
        [name]: value,
      }));
    }

    if (name === "gender") {
      setSelectedGender(value);
    }
  };
  const handleCheckUserAgrrement = () => {
    fieldInputData.userAgreement = checkAgreement;
    setCheckAgreement(!checkAgreement);
  };

  useEffect(() => {
    // Set the selected gender when navigating back to the page
    setFeldInputData((prevfieldInputData) => ({
      ...prevfieldInputData,
      gender: selectedGender,
    }));
  }, [selectedGender]);

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
  const btnNextPage = (e) => {
    e.preventDefault();
    if (page < FormPageTitle.length - 1) {
      setPage((currPage) => currPage + 1);
    } else {
      setPage(FormPageTitle.length - 1);
    }
  };

  const btnPrevPage = (e) => {
    e.preventDefault();
    if (page > 0) {
      setPage((currPage) => currPage - 1);
    } else {
      setPage(0);
    }
  };
  const FormPageTitle = [
    "page-1",
    "page-2",
    "page-3",
    "page-4",
    "page-5",
    "page-6",
  ];
  if (isLoading) {
    return <Loading />;
  }

  return (
    <Wrapperv2>
      <div className="bgImag">
        <img src={bgImage6} alt="" />
      </div>
      <Wrapper>
        <div className="wrapper">
          <Form method="post" className="form" encType="multipart/form-data">
            <h3 style={{ textAlign: "center" }}>Candidate Registration</h3>
            <hr />
            {FormPageTitle[page] === "page-1" && (
              <>
                <div className="input-box">
                  <div className="input-field">
                    <input
                      type="text"
                      name="firstName"
                      placeholder="first name"
                      value={fieldInputData.firstName}
                      onChange={handleInputChange}
                      required
                    />
                    <FaUser className="icon" />
                  </div>
                  <div className="input-field">
                    <input
                      type="text"
                      name="middleName"
                      placeholder="middle name"
                      value={fieldInputData.middleName}
                      onChange={handleInputChange}
                      required
                    />
                    <FaUser className="icon" />
                  </div>
                  <div className="input-field">
                    <input
                      type="text"
                      name="familyName"
                      placeholder="family name"
                      value={fieldInputData.familyName}
                      onChange={handleInputChange}
                      required
                    />
                    <FaUser className="icon" />
                  </div>
                  <div className="input-field">
                    <input
                      type="date"
                      name="DOBirth"
                      placeholder="Date of birth"
                      value={fieldInputData.DOBirth}
                      onChange={handleInputChange}
                      required
                    />
                    <SlCalender className="icon" />
                  </div>
                </div>

                <div className="input-box">
                  <div className="gender-input">
                    <span>Male</span>
                    <div className="input-field">
                      <input
                        type="radio"
                        placeholder="gender"
                        name="gender"
                        className="gender"
                        value="male"
                        checked={selectedGender === "male"}
                        onChange={handleInputChange}
                      />{" "}
                    </div>
                    <span>Female</span>
                    <div className="input-field">
                      <input
                        type="radio"
                        placeholder="gender"
                        name="gender"
                        className="gender"
                        value="female"
                        checked={selectedGender === "female"}
                        onChange={handleInputChange}
                      />{" "}
                    </div>
                  </div>
                  <div className="input-field">
                    <label
                      htmlFor="candidateProfilePhoto"
                      className="label-image"
                    >
                      Profile Image
                    </label>
                    <input
                      type="file"
                      name="candidateProfilePhoto"
                      accept="image/*"
                      placeholder="Profile image"
                      required
                      className="file-image"
                      onChange={handleInputChange}
                    />
                    <GiEgyptianProfile className="icon" />
                    {fieldInputData.candidateProfilePhoto && (
                      <img
                        src={URL.createObjectURL(
                          fieldInputData.candidateProfilePhoto
                        )}
                        alt="Profile Preview"
                        style={{
                          width: "50px",
                          height: "50px",
                          objectFit: "cover",
                        }}
                      />
                    )}
                  </div>
                </div>
              </>
            )}

            {FormPageTitle[page] === "page-2" && (
              <>
                <div className="input-box">
                  <div className="input-field">
                    <input
                      type="number"
                      name="phoneNumber"
                      placeholder="phone number"
                      required
                      value={fieldInputData.phoneNumber}
                      onChange={handleInputChange}
                    />
                    <FaPhoneAlt className="icon" />
                  </div>
                  <div className="input-field">
                    <CountrySecond
                      value={fieldInputData.country}
                      onChange={handleInputChange}
                    />
                    <FaHome className="icon" />
                  </div>
                </div>

                <div className="input-box">
                  <div className="input-field">
                    <input
                      type="text"
                      name="city"
                      placeholder="city"
                      required
                      value={fieldInputData.city}
                      onChange={handleInputChange}
                    />
                    <FaHome className="icon" />
                  </div>
                  <div className="input-field">
                    <input
                      type="text"
                      name="POBox"
                      placeholder="po box"
                      required
                      value={fieldInputData.POBox}
                      onChange={handleInputChange}
                    />
                    <CiInboxIn className="icon" />
                  </div>
                </div>
                <div className="input-box" style={{ width: "100%" }}>
                  <div className="input-field" style={{ width: "100%" }}>
                    <input
                      type="text"
                      placeholder="address"
                      style={{ width: "100%" }}
                      value={fieldInputData.address}
                      onChange={handleInputChange}
                    />
                    <FaRegAddressCard className="icon" />
                  </div>
                </div>
              </>
            )}

            {FormPageTitle[page] === "page-3" && (
              <>
                <div className="input-box" style={{ width: "100%" }}>
                  <div className="input-field" style={{ width: "100%" }}>
                    <input
                      type="text"
                      name="qualification"
                      placeholder="qualification"
                      required
                      style={{ width: "100%" }}
                      value={fieldInputData.qualification}
                      onChange={handleInputChange}
                    />
                    <MdOutlineTitle className="icon" />
                  </div>
                </div>
                <div className="input-box">
                  <div className="input-field">
                    <input
                      type="text"
                      name="occupation"
                      placeholder="occupation"
                      required
                      value={fieldInputData.occupation}
                      onChange={handleInputChange}
                    />
                    <MdOutlineTitle className="icon" />
                  </div>
                  <div className="input-field">
                    <input
                      type="text"
                      name="PassportNumber"
                      placeholder="passport no."
                      required
                      value={fieldInputData.PassportNumber}
                      onChange={handleInputChange}
                    />
                    <FaPassport className="icon" />
                  </div>

                  <div className="input-field">
                    <label
                      htmlFor="fcandidatePassportPhoto"
                      className="label-image"
                    >
                      Passport Image
                    </label>
                    <input
                      type="file"
                      accept="image/*"
                      placeholder="passport"
                      required
                      name="candidatePassportPhoto"
                      onChange={handleInputChange}
                    />
                    {fieldInputData.candidatePassportPhoto && (
                      <img
                        src={URL.createObjectURL(
                          fieldInputData.candidatePassportPhoto
                        )}
                        alt="Profile Preview"
                        style={{
                          width: "50px",
                          height: "50px",
                          objectFit: "cover",
                        }}
                      />
                    )}
                    <FaPassport className="icon" />
                  </div>
                  <div className="input-field">
                    <label
                      htmlFor="candidateVerificationPhoto"
                      className="label-image"
                    >
                      Verification Image
                    </label>
                    <input
                      type="file"
                      name="candidateVerificationPhoto"
                      accept="image/*"
                      placeholder="passport"
                      required
                      onChange={handleInputChange}
                    />
                    <FaPassport className="icon" />
                    {fieldInputData.candidateVerificationPhoto && (
                      <img
                        src={URL.createObjectURL(
                          fieldInputData.candidateVerificationPhoto
                        )}
                        alt="Profile Preview"
                        style={{
                          width: "50px",
                          height: "50px",
                          objectFit: "cover",
                        }}
                      />
                    )}
                  </div>
                </div>
              </>
            )}

            {FormPageTitle[page] === "page-4" && (
              <>
                <div className="" style={{ display: "grid" }}>
                  {selectFields.map((selectField, indexItem) => (
                    <div key={indexItem} style={{ display: "flex" }}>
                      {selectField.selectedValue === "leeanit" && (
                        <div className="input-box3">
                          <input
                            type="text"
                            className="input-field"
                            defaultValue="leeanit"
                            name="leeanit"
                            id={selectField.id}
                            disabled
                            value={fieldInputData.leeanit}
                            onChange={handleInputChange}
                          />

                          <div className="input-field">
                            <ExternalLeeCountrySecond
                              className="input-field"
                              value={fieldInputData.PassportNumber}
                              onChange={handleInputChange}
                            />
                          </div>

                          <input
                            type="text"
                            name="leeRegNumber"
                            className="input-field"
                            placeholder="LEEEA reg no"
                            value={fieldInputData.leeRegNumber}
                            onChange={handleInputChange}
                          />
                        </div>
                      )}
                      {selectField.selectedValue === "myCert" && (
                        <div className="input-box">
                          <input
                            type="text"
                            className="input-field"
                            defaultValue="myCert"
                            name="myCert"
                            id={selectField.id}
                            disabled
                            value={fieldInputData.myCert}
                            onChange={handleInputChange}
                          />
                          <input
                            type="text"
                            name="myCertReg"
                            className="input-field"
                            placeholder="my Cert"
                            value={fieldInputData.myCertReg}
                            onChange={handleInputChange}
                          />
                        </div>
                      )}
                      {selectField.selectedValue === "ITRA" && (
                        <div className="input-box">
                          <input
                            type="text"
                            className="input-field"
                            defaultValue="irata"
                            name="irata"
                            id={selectField.id}
                            disabled
                            value={fieldInputData.irata}
                            onChange={handleInputChange}
                          />
                          <input
                            type="text"
                            name="irataReg"
                            className="input-field"
                            placeholder="irata"
                            value={fieldInputData.irataReg}
                            onChange={handleInputChange}
                          />
                        </div>
                      )}
                      {selectField.selectedValue !== "ITRA" &&
                      selectField.selectedValue !== "myCert" &&
                      selectField.selectedValue !== "leeanit" ? (
                        <div className="input-box">
                          <input
                            type="text"
                            className="input-field"
                            defaultValue={selectField.selectedValue}
                            name={selectField.selectedValue}
                            id={selectField.id}
                            disabled
                            value={fieldInputData.selectField.selectedValue}
                            onChange={handleInputChange}
                          />
                          <input
                            type="text"
                            name={selectField.selectedValue}
                            className="input-field"
                            value={fieldInputData.selectField.selectedValue}
                            onChange={handleInputChange}
                          />
                        </div>
                      ) : (
                        ""
                      )}
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
                    </div>
                  ))}

                  <select
                    name=""
                    id=""
                    className="form-select"
                    onChange={handleSelectChange}
                  >
                    <option defaultValue="">Select an option</option>
                    {data.externalWebsites.map((option, index) => (
                      <option key={index} value={option.id}>
                        {option.title}
                      </option>
                    ))}
                  </select>
                </div>
              </>
            )}

            {FormPageTitle[page] === "page-5" && (
              <>
                <div className="input-box">
                  <div className="input-field">
                    <input
                      type="email"
                      placeholder="email"
                      required
                      name="email"
                      value={fieldInputData.email}
                      onChange={handleInputChange}
                    />
                    <MdEmail className="icon" />
                  </div>
                  <div className="input-field">
                    <input
                      type="email"
                      placeholder="confrim email"
                      name="confirmationEmail"
                      required
                      value={fieldInputData.confirmationEmail}
                      onChange={handleInputChange}
                    />
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
                      value={fieldInputData.password}
                      onChange={handleInputChange}
                    />
                    <RiLockPasswordFill className="icon" />
                  </div>
                  <div className="input-field">
                    <input
                      type="password"
                      placeholder="confrim password"
                      required
                      name="confrimpassword"
                      value={fieldInputData.confrimpassword}
                      onChange={handleInputChange}
                    />
                    <RiLockPasswordFill className="icon" />
                  </div>
                </div>
              </>
            )}

            {FormPageTitle[page] === "page-6" && (
              <div>
                <div className="input-box-agreement">
                  <input
                    type="checkbox"
                    name="userAgreement"
                    label="checkLicence Password"
                    onChange={handleCheckUserAgrrement}
                    value={fieldInputData.userAgreement ? true : false}
                    checked={checkAgreement}
                  />
                  <label>
                    By Checking this Box, you agree to the terms of our{" "}
                    <span className="licenceAgreement">
                      End-User-License Agreement (EULA)
                    </span>
                  </label>
                </div>
              </div>
            )}

            <div className="action-btn">
              {checkAgreement && (
                <>
                  <button className="btn" type="submit" disabled={isSubmitting}>
                    {isSubmitting ? "submitting" : "submit"}
                  </button>
                </>
              )}

              <div className="page-btn">
                <button className="btn" onClick={btnPrevPage}>
                  Prev
                </button>

                <button className="btn" onClick={btnNextPage}>
                  next
                </button>
              </div>
            </div>

            <p>
              Already a member ?
              <Link to="/login" className="member-btn">
                Login
              </Link>
            </p>
          </Form>
        </div>
      </Wrapper>

      <></>
    </Wrapperv2>
  );
};

export default RegisterCandidateV2;
