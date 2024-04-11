import {
  Form,
  Link,
  redirect,
  useLoaderData,
  useNavigation,
} from "react-router-dom";
import { useState } from "react";
import Wrapper from "../../assets/wrappers/RegisterAndLoginPage";
import FormRow from "../../components/FormRow";
import customFetch from "../../utils/customFetch";
import { toast } from "react-toastify";
import Country from "../../components/Country";
import CountryCallingCode from "../../components/CountryCallingCode";
import Loading from "../Loading";
import ExternalLeeCountrySecond from "../../components/ExternalLeeCountrySecond";

export const loader = async () => {
  try {
    const { data } = await customFetch.get("/externalBadge/allWebsites");
    return { data };
  } catch (error) {
    toast.error(error.response?.data?.message);
    return error;
  }
};
export const action = async ({ request }) => {
  const formData = await request.formData();

  try {
    await customFetch.post("/candidate/signup", formData);
    toast.success("Registration successful");
    return redirect("/register/email-verification");
  } catch (error) {
    toast.error(error?.response?.data?.message);
    return error;
  }
};

const RegisterCandidateV3 = () => {
  const { data } = useLoaderData();
  const [page, setPage] = useState(0);
  const [selectFields, setSelectFields] = useState([]);
  const [inputValues, setInputValues] = useState();

  const [availableOptions, setAvailableOptions] = useState(
    data.externalWebsites
  );

  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  const isLoading = navigation.state === "loading";

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

  const [checkAgreement, setCheckAgreement] = useState(false);
  const handleCheckUserAgrrement = () => {
    setCheckAgreement(!checkAgreement);
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
    "personal",
    "country & contact",
    "profile",
    "external badges",
    "complete registration",
    "final",
  ];
  if (isLoading) {
    return <Loading />;
  }

  return (
    <Wrapper>
      <Form method="post" className="form" encType="multipart/form-data">
        <h5 style={{ textAlign: "center" }}>Candidate Registration</h5>

        {FormPageTitle[page] === "personal" && (
          <>
            <div className="row-formRow">
              <FormRow
                type="text"
                name="firstName"
                labelText="firstname"
                defaultValue="ahmed"
                withLabel={true}
              />
              <FormRow
                type="text"
                name="middleName"
                labelText="middleName"
                defaultValue="aly"
                withLabel={true}
              />
            </div>
            <div className="row-formRow">
              <FormRow
                type="text"
                name="familyName"
                labelText="family Name"
                defaultValue="nassar"
                withLabel={true}
              />
              <FormRow
                type="date"
                name="DOBirth"
                labelText="Date Of birth"
                withLabel={true}
              />
            </div>

            <div className="row-formRow">
              <div className="genderInput">
                <span>Gender</span>
                <div>
                  <FormRow
                    type="radio"
                    key="male"
                    name="gender"
                    labelText="male"
                    defaultValue="male"
                    withLabel
                  />
                </div>
                <div>
                  <FormRow
                    type="radio"
                    key="female"
                    name="gender"
                    labelText="female"
                    defaultValue="female"
                    withLabel
                  />
                </div>
              </div>
              <FormRow
                type="text"
                name="phoneNumber"
                labelText="phone Number"
                withLabel
                defaultValue="0123213123"
              />
            </div>
          </>
        )}

        {FormPageTitle[page] === "country & contact" && (
          <>
            <div className="row-formRow">
              <div className="phoneCodeRow">
                <CountryCallingCode name="phoneCode" />
              </div>
              <FormRow
                type="text"
                name="occupation"
                labelText="occupation"
                defaultValue="chemist"
                withLabel={true}
              />
            </div>
            <div className="row-formRow">
              <Country name="country" defaultValue="Egypt" />
              <FormRow
                type="text"
                name="address"
                labelText="address"
                defaultValue="maadi"
                withLabel={true}
              />
              <FormRow
                type="text"
                name="city"
                labelText="city"
                defaultValue="cairo"
                withLabel={true}
              />
            </div>
          </>
        )}

        {FormPageTitle[page] === "profile" && (
          <>
            <div className="row-formRow">
              <FormRow
                type="text"
                name="POBox"
                labelText="P.O Box"
                defaultValue="ccandidate POBox"
                withLabel={true}
              />

              <FormRow
                type="text"
                name="PassportNumber"
                labelText="passport number"
                defaultValue="PassportNumber"
                withLabel={true}
              />
            </div>

            <div className="row-formRow">
              <FormRow
                type="file"
                name="candidateProfilePhoto"
                accept="image/*"
                labelText="profile Photo"
                withLabel={true}
              />

              <FormRow
                type="file"
                name="candidatePassportPhoto"
                accept="image/*"
                labelText="Passport Photo"
                withLabel={true}
              />
            </div>

            <div className="row-formRow">
              <FormRow
                type="file"
                name="candidateVerificationPhoto"
                accept="image/*"
                labelText="Verification Photo"
                withLabel={true}
              />
              <div>
                <label htmlFor="qualification">Qualifications :</label>
                <textarea
                  id="qualification"
                  className=""
                  name="qualification"
                  rows={5}
                  style={{ padding: "1rem", borderRadius: "5px" }}
                  defaultValue="My name is Ahmed Nassar and I have a background in the oil and gas industry. However, my passion lies in web development and I have been working to gain skills in this field. I am proficient in several technologies such as HTML, CSS, JavaScript, Bootstrap, Tailwind, ReactJS, NodeJS, MongoDB, Mongoose, APIs, and EJS.
I am highly motivated to continue learning and advancing my career in web development. To achieve this, I plan to create personal projects and contribute to open-source projects to gain experience and showcase my skills. I also intend to expand my skill set by learning new technologies and frameworks, taking online courses, attending workshops or meetups, and networking with other developers in the industry."
                ></textarea>
              </div>
            </div>
          </>
        )}

        {FormPageTitle[page] === "external badges" && (
          <>
            <label htmlFor="" className="form-label">
              Select external badge
            </label>
            <div className="input-box">
              {selectFields.map((selectField, indexItem) => (
                <div
                  key={indexItem}
                  style={{
                    display: "flex",
                    justifyItems: "center",
                    alignContent: "center",
                    gap: "1rem",
                  }}
                >
                  <input
                    type="text"
                    className="input-field"
                    defaultValue={selectField.selectedValue}
                    // name={selectField.id}
                    name="leeWebsiteId"
                    id={selectField.id}
                    hidden
                  />
                  {/* <label htmlFor="">{selectField.selectedValue}</label> */}
                  {selectField.selectedValue === "leeanit" && (
                    <>
                      <div className="input-box">
                        <input
                          type="text"
                          className="input-field"
                          defaultValue="leeanit"
                          name="leeanit"
                          id={selectField.id}
                          disabled
                        />

                        <div className="input-field">
                          <ExternalLeeCountrySecond />
                        </div>

                        <input
                          type="text"
                          name="leeRegNumber"
                          className="input-field"
                        />
                      </div>
                    </>
                  )}
                  {selectField.selectedValue === "myCert" && (
                    <div>
                      <input
                        type="text"
                        className="input-field"
                        defaultValue="myCert"
                        name="myCert"
                        id={selectField.id}
                        disabled
                      />
                      <input
                        type="text"
                        name="myCert"
                        className="input-field"
                      />
                    </div>
                  )}
                  {selectField.selectedValue === "ITRA" && (
                    <div>
                      <input
                        type="text"
                        className="input-field"
                        defaultValue="irata"
                        name="irata"
                        id={selectField.id}
                        disabled
                      />
                      <input type="text" name="irata" className="input-field" />
                    </div>
                  )}
                  {selectField.selectedValue !== "ITRA" &&
                  selectField.selectedValue !== "myCert" &&
                  selectField.selectedValue !== "leeanit" ? (
                    <div>
                      <input
                        type="text"
                        className="input-field"
                        defaultValue={selectField.selectedValue}
                        name={selectField.selectedValue}
                        id={selectField.id}
                        disabled
                      />
                      <input
                        type="text"
                        name={selectField.selectedValue}
                        className="input-field"
                      />
                    </div>
                  ) : (
                    ""
                  )}

                  <button
                    style={{
                      border: "1px",
                      borderRadius: 100,
                      width: 40,
                      height: 40,
                      cursor: "pointer",
                    }}
                    onClick={cancelSelectedField}
                    id={selectField.selectedValue}
                  >
                    X
                  </button>
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

        {FormPageTitle[page] === "complete registration" && (
          <>
            <div className="row-formRow">
              <FormRow
                type="email"
                name="email"
                labelText="Email Address"
                defaultValue="ahmed.nassar855@gmail.com"
                withLabel={true}
              />
              <FormRow
                type="email"
                name="confirmEmail"
                labelText="Confirm Email Address"
                defaultValue="ahmed.nassar855@gmail.com"
                withLabel={true}
              />
            </div>
            <div className="row-formRow">
              <FormRow
                type="password"
                name="password"
                labelText="Password"
                defaultValue="1234567891"
                withLabel={true}
              />
              <FormRow
                type="password"
                name="confirmPassword"
                labelText="Confirm Password"
                defaultValue="1234567891"
                withLabel={true}
              />
            </div>

            <button
              type="submit"
              className="btn btn-block"
              disabled={isSubmitting}
            >
              {isSubmitting ? "submitting" : "submit"}
            </button>
          </>
        )}

        {FormPageTitle[page] === "final" && (
          <>
            <div className="row-checkLicense">
              <input
                type="checkbox"
                name="userAgreement"
                label="checkLicence Password"
                onChange={handleCheckUserAgrrement}
                value={checkAgreement ? true : false}
                checked={checkAgreement}
              />
              <p>
                By Checking this Box, you agree to the terms of our{" "}
                <span className="licenceAgreement">
                  End-User-License Agreement (EULA)
                </span>
              </p>
            </div>
          </>
        )}

        <div className="page-btn">
          <p>
            Already a member ?
            <Link to="/login" className="member-btn">
              Login
            </Link>
          </p>
          <button className="btn" onClick={btnPrevPage}>
            Prev
          </button>

          <button className="btn" onClick={btnNextPage}>
            next
          </button>
        </div>
      </Form>

      <></>
    </Wrapper>
  );
};

export default RegisterCandidateV3;
