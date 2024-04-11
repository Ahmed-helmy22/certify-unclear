import { FormRow, FormRowSelect } from "../../components";
import Wrapper from "../../assets/wrappers/UpdateInformationWrapper";
import { Form, Link, redirect, useNavigation } from "react-router-dom";
import { toast } from "react-toastify";
import { useDashboardContext } from "../DashboardLayout";
import customFetch from "../../utils/customFetch";
import Country from "../../components/Country";
import {
  MainWrapper,
  MainPage,
} from "../../assets/wrappers/UpdateInformationPage";
import {
  ACADEMY_PROVIDER_TYPE,
  CERTIFY_AUTHORITY_TYPE,
} from "../../utils/constants";
import { useState } from "react";
import { FaUser } from "react-icons/fa";
import CountrySecond from "../../components/CountrySecond";
 
export const action = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  const errors = { msg: "" };
  let pattern = /^[a-zA-Z0-9\s]+$/;

  if (
    data.examinerType !== "GOVERNMENT" ||
    data.examinerType !== "NONPROFIT ORG" ||
    data.examinerType !== "PRIVATE ACADEMY"
  ) {
    errors.msg = "Please select an account type !!!!!!!  ";
    toast.error(errors.msg);
    return errors;
  }
  if (data.familyName && !pattern.test(data.familyName)) {
    errors.msg =
      "Family Name shall be not inlclude any speical character aA-zZ:0-9 only";
    toast.error(errors.msg);
    return errors;
  }
  if (data.middleName && !pattern.test(data.middleName)) {
    errors.msg =
      "Middle Name shall be not inlclude any speical character aA-zZ:0-9 only";
    toast.error(errors.msg);
    return errors;
  }
  if (data.firstName && !pattern.test(data.firstName)) {
    errors.msg =
      "Frist Name shall be not inlclude any speical character aA-zZ:0-9 only";
    toast.error(errors.msg);
    return errors;
  }
  if (!data.profession.include() === "ANST" && data.asntRegNumber) {
    errors.msg = "Regsieration number is required for ANST only !!!";
    toast.error(errors.msg);
    return errors;
  }
  if (data.asntRegNumber && !pattern.test(data.asntRegNumber)) {
    errors.msg =
      "ASNT Reg shall be not inlclude any speical character aA-zZ:0-9 only";
    toast.error(errors.msg);
    return errors;
  }

  if (data.country && !pattern.test(data.country)) {
    errors.msg =
      "Country shall be not inlclude any speical character aA-zZ:0-9 only";
    toast.error(errors.msg);
    return errors;
  }
  if (data.city && !pattern.test(data.city)) {
    errors.msg =
      "City shall be not inlclude any speical character aA-zZ:0-9 only";
    toast.error(errors.msg);
    return errors;
  }

  if (data.address && !pattern.test(data.address)) {
    errors.msg =
      "Address shall be not inlclude any speical character aA-zZ:0-9 only";
    toast.error(errors.msg);
    return errors;
  }

  let numberPattern =
    /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;

  if (!numberPattern.test(data.phoneNumber)) {
    errors.msg = "Invalid phone number";
    toast.error(errors.msg);
    return errors;
  }
  if (!data.gender) {
    errors.msg = "choose your gender , please !!!";
    toast.error(errors.msg);
    return errors;
  }
  try {
    await customFetch.post("/examiner/updateMyProfile", data);
    toast.success("updated profile successful");
    return redirect("/dashboard/examiner");
  } catch (error) {
    errors.msg = error?.response?.data?.message;
    toast.error(errors.msg);
    return error;
  }
};
const ExaminerUpdateInformation = () => {
  const { user } = useDashboardContext();

  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  const [selectedOption, setSelectedOption] = useState("");
  const handleSelectChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedOption(selectedValue);

    // Do something with the selected value
    console.log("Selected Value:", selectedValue);
  };
  return (
    // <Wrapper>
    //   <h2>update information</h2>
    //   <Form method="post" encType="multipart/form-data">
    //     <div className="row-formRow">
    //       <WrapperSelect>
    //         <FormRowSelect
    //           labelText="Please Choose the account Type"
    //           name="examinerType"
    //           list={[...Object.values(ACADEMY_PROVIDER_TYPE)]}
    //           className="dropListAcademy"
    //           onChange={handleSelectChange}
    //           classNameLabel="labelStyle"
    //         />
    //       </WrapperSelect>
    //       <FormRow
    //         type="text"
    //         name="firstName"
    //         labelText="firstname"
    //         defaultValue="ahmed"
    //         withLabel={true}
    //       />
    //       <FormRow
    //         type="text"
    //         name="middleName"
    //         labelText="middleName"
    //         defaultValue="aly"
    //         withLabel={true}
    //       />
    //       <FormRow
    //         type="text"
    //         name="familyName"
    //         labelText="family Name"
    //         defaultValue="nassar"
    //         withLabel={true}
    //       />
    //       <div style={{ width: "100%" }}>
    //         <WrapperSelect style={{ width: "100%" }}>
    //           <FormRowSelect
    //             labelText="Profession"
    //             name="profession"
    //             list={[...Object.values(CERTIFY_AUTHORITY_TYPE)]}
    //             classNameLabel="labelStyle"
    //             onChange={handleSelectChange}
    //             option={<option disabled defaultValue="Profession">Profession</option>}
    //           />
    //         </WrapperSelect>
    //         <input
    //               type="text"
    //               name="profession"
    //               id="profession"
    //               value={selectedOption}
    //               hidden
    //             />
    //         {selectedOption.includes("ASNT") ? (
    //           <div className="input-box">
    //             <FormRow
    //               className="input-field"
    //               type="text"
    //               labelText="ASNT Reg Number"
    //               name="asntRegNumber"
    //               placeholder="ASNT ID"
    //             />
    //           </div>
    //         ) : (
    //           <div className="input-box">
    //             <FormRow
    //               className="input-field"
    //               type="text"
    //               name="otherRegNumber"
    //               disabled
    //             />
    //           </div>
    //         )}
    //       </div>
    //     </div>
    //     <div>
    //       <Country name="country" defaultValue={user.country} />

    //       <FormRow
    //         name="address"
    //         type="text"
    //         labelText="address"
    //         withLabel={true}
    //         defaultValue={user.address}
    //       />
    //       <FormRow
    //         name="city"
    //         type="text"
    //         labelText="city"
    //         withLabel={true}
    //         defaultValue={user.city}
    //       />
    //       <FormRow
    //         type="date"
    //         name="DOBirth"
    //         labelText="Date Of birth"
    //         withLabel={true}
    //       />
    //       <FormRow
    //         name="phoneNumber"
    //         type="text"
    //         labelText="Phone no"
    //         withLabel={true}
    //         defaultValue={user.phoneNumber}
    //       />
    //     </div>
    //     <div>
    //       <FormRow
    //         name="POBox"
    //         type="text"
    //         labelText="PO.Box"
    //         withLabel={true}
    //         defaultValue={user.POBox}
    //       />

    //       <div className="row-formRow">
    //         <div
    //           className="genderInput"
    //           style={{ display: "flex", gap: "2rem" }}
    //         >
    //           <span>Gender</span>
    //           <div>
    //             <FormRow
    //               type="radio"
    //               key="male"
    //               name="gender"
    //               labelText="male"
    //               defaultValue="male"
    //               withLabel
    //             />
    //           </div>
    //           <div>
    //             <FormRow
    //               type="radio"
    //               key="female"
    //               name="gender"
    //               labelText="female"
    //               defaultValue="female"
    //               withLabel
    //             />
    //           </div>
    //         </div>
    //       </div>

    //       <button type="submit" className="btn ">
    //         Submit
    //       </button>
    //     </div>
    //   </Form>
    // </Wrapper>

    <MainPage>
      <MainWrapper>
        <div className="wrapperForm">
          <div>
            <h5>Update Information</h5>
          </div>

          <Form method="post" className="form" encType="multipart/form-data">
            <div className="input-box">
              <div className="input-field">
                <input
                  type="text"
                  name="firstName"
                  placeholder="First Name"
                 />

                <FaUser className="icon" />
              </div>
              <div className="input-field">
                <input
                  type="text"
                  name="middleName"
                  placeholder="Middle Name"
                 />
                <FaUser className="icon" />
              </div>
            </div>
            <div className="input-box">
              <div className="input-field">
                <input
                  type="text"
                  name="familyName"
                  placeholder="Family Name"
                 />
                <FaUser className="icon" />
              </div>
            </div>
            <div className="input-box">
              <div className="input-field">
                <select
                  name="providerType"
                  value={selectedOption}
                  onChange={handleSelectChange}
                >
                  <option disabled>Account Type</option>
                  {Object.entries(ACADEMY_PROVIDER_TYPE)?.map(
                    ([key, value], index) => (
                      <option key={index} value={value}>
                        {value}
                      </option>
                    )
                  )}
                </select>
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
                  <option disabled defaultValue="Profession">
                    Profession
                  </option>

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

              {selectedOption.includes("ASNT") ? (
                <div className="input-box">
                  <input
                    className="input-field"
                    type="text"
                    name="asntRegNumber"
                    placeholder="ASNT ID"
                  />
                </div>
              ) : (
                <div className="input-box">
                  <input
                    className="input-field"
                    type="text"
                    name="otherRegNumber"
                    disabled
                  />
                </div>
              )}
            </div>
            <div className="input-box">
              <div className="input-field">
                <input
                  type="text"
                  name="phoneNumber"
                  placeholder="Phone Number"
                 />
              </div>
              <div className="input-field">
                <input
                  type="text"
                  name="address"
                  placeholder="Address"
                 />
              </div>
            </div>
            <div className="input-box">
              <div className="input-field">
                <CountrySecond />
                <FaUser className="icon" />
              </div>
              <div className="input-field">
                <input
                  type="text"
                  name="address"
                  placeholder="Address"
                 />
              </div>
            </div>
            <div className="input-box" >
              <div className="gender-input" >
                <span>Male</span>
                <div className="input-field" style={{backgroundColor: 'transparent'}}>
                  <input
                    type="radio"
                    placeholder="gender"
                    name="gender"
                    className="gender"
                    value="male"
                  /> 
                </div>
                <span>Female</span>
                <div className="input-field"  style={{backgroundColor: 'transparent'}}>
                  <input
                    type="radio"
                    placeholder="gender"
                    name="gender"
                    className="gender"
                    value="female"
                  />
                </div>
              </div>
            </div>

            <div className="form-btn">
              <button type="submit" className="btn" disabled={isSubmitting}>
                {isSubmitting ? "submitting" : "submit"}
              </button>
            </div>
          </Form>
        </div>{" "}
      </MainWrapper>
    </MainPage>
  );
};

export default ExaminerUpdateInformation;
