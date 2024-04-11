import {
  Form,
  Link,
  redirect,
   useLoaderData,
  useNavigation,
} from "react-router-dom";
import { useState } from "react";
import Wrapper from "../../assets/wrappers/RegisterAndLoginPage";
import Wrapperv2 from "../../assets/wrappers/RegisterAndLoginPageV2";
import bgImage6 from '../../assets/images/undraw_updated_resume_re_7r9j.svg'

import FormRow from "../../components/FormRow";
import WrapperSelect from "../../assets/wrappers/checkBoxWrapper";
import customFetch from "../../utils/customFetch";
import { toast } from "react-toastify";
import Country from "../../components/Country";
import CountryCallingCode from "./../../components/CountryCallingCode";

import Heading from "./../../ui/Heading";
import FormRowSelectLeanitExternal from "../../components/FormRowSelectLeanitExternal";
import Loading from "../Loading";

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

  try {
    await customFetch.post("/candidate/signup", formData);
    toast.success("Registration successful");
    return redirect("/register/email-verification");
  } catch (error) {
     toast.error(error?.response?.data?.message);
    return error;
  }
};

const RegisterCandidateV2 = () => {
  const { data } = useLoaderData();
 

  const itraWebsite = data?.externalWebsites.find(
    (website) => website.title === "ITRA"
  );
  const myCertWebsite = data?.externalWebsites.find(
    (website) => website.title === "myCert"
  );
  const leeanitWebsite = data?.externalWebsites.find(
    (website) => website.title === "leeanit"
  );

  const [selectFields, setSelectFields] = useState([{ id: 1 }]);
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  const isLoading = navigation.state === "loading";


  const [checkAgreement, setCheckAgreement] = useState(false);
  const handleCheckUserAgrrement = () => {
    setCheckAgreement(!checkAgreement);
  };

  // iseleeWebsiteId itraWebsiteId mycertWebsiteId
  const [isleeWebsiteSelected, setIsleeWebsiteSelected] = useState(false);
  const [isItraWebsiteSelected, setIsItraWebsiteSelected] = useState(false);
  const [isMycertWebsiteSelected, setIsMycertWebsiteSelected] = useState(false);

  const checkIsLeeSelected = () => {
    setIsleeWebsiteSelected(!isleeWebsiteSelected);
  };

  const checkIsItrSelected = () => {
    setIsItraWebsiteSelected(!isItraWebsiteSelected);
  };

  const checkIsMycertSelected = () => {
    setIsMycertWebsiteSelected(!isMycertWebsiteSelected);
  };

  const handleAddSelect = (e) => {
    e.preventDefault();
    const newSelectFields = [...selectFields, { id: selectFields.length + 1 }];
    setSelectFields(newSelectFields);
  };

  if (isLoading) {
    return <Loading />;
  }
  
  return (
    <Wrapperv2>
      <div>
        <img src={bgImage6} alt="" />
      </div>
      <Wrapper>
      <Form method="post" className="form" encType="multipart/form-data">
        <h3 style={{ textAlign: "center" }}>Candidate Registration</h3>
        <hr />
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
          <FormRow
            type="text"
            name="familyName"
            labelText="family Name"
            defaultValue="nassar"
            withLabel={true}
          />
        </div>

        <div className="row-formRow">
          <FormRow
            type="date"
            name="DOBirth"
            labelText="Date Of birth"
            withLabel={true}
          />
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
          </div>
        </div>
        <div className="row-formRow">
          <div className="phoneCodeRow">
            <CountryCallingCode name="phoneCode" />
            <FormRow
              type="text"
              name="phoneNumber"
              labelText="phone Number"
              withLabel
              defaultValue="0123213123"
            />
          </div>
          <FormRow
            type="text"
            name="occupation"
            labelText="occupation"
            defaultValue="chemist"
            withLabel={true}
          />
        </div>

        {/*  */}
        <Heading as="h3">Choose external certificate</Heading>

        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <div
            style={{
              display: "flex",
              gap: "1rem",
              justifyItems: "start",
              alignItems: "center",
              alignContent: "center",
            }}
          >
            <label htmlFor="leeWebsite">leeWebsite</label>
            <input
              type="checkbox"
              name="leeWebsite"
              label="leeWebsite"
              onChange={checkIsLeeSelected}
              value={isleeWebsiteSelected ? true : false}
              checked={isleeWebsiteSelected}
            />
          </div>
          {/* leeWebsiteId , leeCompany , leeRegNumber */}

          {isleeWebsiteSelected && (
            <>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1.2fr 1fr 1fr",
                  gap: "1rem",
                }}
              >
                <FormRowSelectLeanitExternal labelText="Choose your company" />
                <FormRow
                  type="text"
                  name="leeWebsiteId"
                  labelText="leeWebsite Id"
                  defaultValue={leeanitWebsite._id}
                  withLabel={true}
                />
                <FormRow
                  type="text"
                  name="leeRegNumber"
                  labelText="lee Regi Number"
                  defaultValue="19230"
                  withLabel={true}
                />
              </div>{" "}
            </>
          )}
        </div>

        {/* , itraWebsiteId ,itraRegNumber , itraName */}
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <div
            style={{
              display: "flex",
              gap: "1rem",
              justifyItems: "start",
              alignItems: "center",
              alignContent: "center",
            }}
          >
            <label htmlFor="leeWebsite">itra Website</label>
            <input
              type="checkbox"
              name="itraWebsite"
              label="itraWebsite"
              onChange={checkIsItrSelected}
              value={isItraWebsiteSelected ? true : false}
              checked={isItraWebsiteSelected}
            />
          </div>
          {/* itraWebsiteId ,itraRegNumber , itraName */}

          {isItraWebsiteSelected && (
            <>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1.2fr 1fr 1fr",
                  gap: "1rem",
                }}
              >
                <FormRow
                  type="text"
                  name="itraWebsiteId"
                  labelText="itra Website Id"
                  defaultValue={itraWebsite._id}
                  withLabel={true}
                />
                <FormRow
                  type="text"
                  name="itraRegNumber"
                  labelText="itra RegNumber"
                  defaultValue="46999"
                  withLabel={true}
                />
                <FormRow
                  type="text"
                  name="itraName"
                  labelText="itra Name"
                  defaultValue="zaky"
                  withLabel={true}
                />
              </div>{" "}
            </>
          )}
        </div>
        {/*  mycertWebsiteId, myCertRegNumber */}

        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <div
            style={{
              display: "flex",
              gap: "1rem",
              justifyItems: "start",
              alignItems: "center",
              alignContent: "center",
            }}
          >
            <label htmlFor="mycertWebsite">myCert Website</label>
            <input
              type="checkbox"
              name="mycertWebsite"
              label="mycertWebsite"
              onChange={checkIsMycertSelected}
              value={isMycertWebsiteSelected ? true : false}
              checked={isMycertWebsiteSelected}
            />
          </div>
          {isMycertWebsiteSelected && (
            <>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1.2fr 1fr 1fr",
                  gap: "1rem",
                }}
              >
                <FormRow
                  type="text"
                  name="mycertWebsiteId"
                  labelText="my cert WebsiteId"
                  defaultValue={myCertWebsite._id}
                  withLabel={true}
                />
                <FormRow
                  type="text"
                  name="myCertRegNumber"
                  labelText="myCert Reg Number"
                  withLabel={true}
                />
              </div>{" "}
            </>
          )}
        </div>
        {selectFields.map((selectField) => (
          <WrapperSelect
            key={selectField.id}
            style={{
              display: "grid",
              gridTemplateColumns: "2fr 1fr 1fr",
              gap: "2rem",
            }}
          >
            <select name={`cars${selectField.id}`} id={`cars${selectField.id}`}>
              <option value="volvo">Volvo</option>
              <option value="saab">Saab</option>
              <option value="mercedes">Mercedes</option>
              <option value="audi">Audi</option>
            </select>
            <FormRow
              type="text"
              name={`registrationNumber${selectField.id}`}
              labelText="Reg No."
              withLabel={true}
            />
          </WrapperSelect>
        ))}
        <button className="btn" onClick={handleAddSelect}>
          Add
        </button>
        {/* ------------------------------- */}

        <hr />
        <>
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

        <hr />

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

        <button type="submit" className="btn btn-block" disabled={isSubmitting}>
          {isSubmitting ? "submitting" : "submit"}
        </button>

        <p>
          Already a member ?
          <Link to="/login" className="member-btn">
            Login
          </Link>
        </p>
      </Form>
      </Wrapper>
   

      <>
      
      </>
    </Wrapperv2>
  );
};

export default RegisterCandidateV2;
