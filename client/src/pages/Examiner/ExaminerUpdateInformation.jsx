import { FormRow, FormRowSelect } from "../../components";
 import Wrapper from "../../assets/wrappers/DashboardFormPage";
import { Form, Link, redirect, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDashboardContext } from "../DashboardLayout";
import customFetch from "../../utils/customFetch";
import Country from "../../components/Country";
import {
  ACADEMY_PROVIDER_TYPE,
  CERTIFY_AUTHORITY_TYPE,
} from "../../utils/constants";
import WrapperSelect from "../../assets/wrappers/checkBoxWrapper";
import { useState } from "react";
import day from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
day.extend(advancedFormat);


export const action = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  const errors = { msg: "" };
   let pattern = /^[a-zA-Z0-9\s]+$/;

  // if ( data.examinerType !== "GOVERNMENT" || data.examinerType !== "NONPROFIT ORG" || data.examinerType !== "PRIVATE ACADEMY"
  // ) {
  //   errors.msg = "Please select an account type !!!!!!!  ";
  //   toast.error(errors.msg);
  //   return errors;
  // }
   if (data?.familyName && !pattern.test(data.familyName)) {
    errors.msg =
      "Family Name shall be not inlclude any speical character aA-zZ:0-9 only";
    toast.error(errors.msg);
    return errors;
  }
  if (data?.middleName && !pattern.test(data.middleName)) {
    errors.msg =
      "Middle Name shall be not inlclude any speical character aA-zZ:0-9 only";
    toast.error(errors.msg);
    return errors;
  }
  if (data?.firstName && !pattern.test(data.firstName)) {
    errors.msg =
      "Frist Name shall be not inlclude any speical character aA-zZ:0-9 only";
    toast.error(errors.msg);
    return errors;
  }
  if (!data?.profession.includes("ANST") && data.asntRegNumber) {
    errors.msg = "Regsieration number is required for ANST only !!!";
    toast.error(errors.msg);
    return errors;
  }
  if (data?.asntRegNumber && !pattern.test(data.asntRegNumber)) {
    errors.msg =
      "ASNT Reg shall be not inlclude any speical character aA-zZ:0-9 only";
    toast.error(errors.msg);
    return errors;
  }

  if (data?.country && !pattern.test(data.country)) {
    errors.msg =
      "Country shall be not inlclude any speical character aA-zZ:0-9 only";
    toast.error(errors.msg);
    return errors;
  }
  if (data?.city && !pattern.test(data.city)) {
    errors.msg =
      "City shall be not inlclude any speical character aA-zZ:0-9 only";
    toast.error(errors.msg);
    return errors;
  }

  if (data?.address && !pattern.test(data.address)) {
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
  if (!data.DOBirth  ) {
    errors.msg = "Date of Birth is required";
    toast.error(errors.msg);
    return errors;
  }
  let dobRegex = /^\d{4}-\d{2}-\d{2}$/;
  if (data.DOBirth && !dobRegex.test(data.DOBirth)) {
    errors.msg = "Date of Birth is invalid date";
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

  const [selectedOption, setSelectedOption] = useState("");

  const handleSelectChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedOption(selectedValue);
  };
  const navigate = useNavigate();
  const birthDate = day(user?.providerAdminInfo?.DOBirth).format("MM/DD/YYYY");
  const handleBackClick = () => {
    navigate(-1);
  };
  return (
    <Wrapper>
      <div
        className="closeExaminerbtn"
        style={{ display: "flex", gap: "2rem", justifyContent: "end" }}
      >
         
        <Link className="btn closBtnExaminer" onClick={handleBackClick}>
          Back
        </Link>
      </div>
      <h2>update information</h2>
      <Form method="post" encType="multipart/form-data">
        <div className="form-center">
          <WrapperSelect>
            <FormRowSelect
              labelText="Please Choose the account Type"
              name="examinerType"
              list={[...Object.values(ACADEMY_PROVIDER_TYPE)]}
              className="dropListAcademy"
              // onChange={handleSelectChangeProviderType}
              classNameLabel="labelStyle"
            />
          </WrapperSelect>
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

          
         

            <WrapperSelect style={{ width: "100%" }}>
              <FormRowSelect
                labelText="Profession"
                name="profession"
                list={[...Object.values(CERTIFY_AUTHORITY_TYPE)]}
                classNameLabel="labelStyle"
                onChange={handleSelectChange}
                option={
                  <option disabled defaultValue="Profession">
                    Profession
                  </option>
                }
              />
            </WrapperSelect>
            <input
              type="text"
              name="profession"
              id="profession"
              value={selectedOption}
              hidden
            />
            {selectedOption.includes("ASNT") ? (
              <div className="input-box">
                <FormRow
                  className="input-field"
                  type="text"
                  labelText="ASNT Reg Number"
                  name="asntRegNumber"
                  placeholder="ASNT ID"
                />
              </div>
            ) : (
              <div className="input-box">
                <FormRow
                  className="input-field"
                  type="text"
                  name="otherRegNumber"
                  disabled
                />
              </div>
            )}
          
          <Country name="country" defaultValue={user.country} />

          <FormRow
            name="address"
            type="text"
            labelText="address"
            withLabel={true}
            defaultValue={user.address}
          />
          <FormRow
            name="city"
            type="text"
            labelText="city"
            withLabel={true}
            defaultValue={user.city}
          />
          <FormRow
            type="date"
            name="DOBirth"
            labelText="Date Of birth"
            withLabel={true}
            defaultValue={user.DOBirth}
          />
          <FormRow
            name="phoneNumber"
            type="text"
            labelText="Phone no"
            withLabel={true}
            defaultValue={user.phoneNumber}
          />
        
        
          <FormRow
            name="POBox"
            type="text"
            labelText="PO.Box"
            withLabel={true}
            defaultValue={user.POBox}
          />

          <div className="row-formRow">
            <div
              className="genderInput"
              style={{ display: "flex", gap: "2rem" }}
            >
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

          <button type="submit" className="btn ">
            Submit
          </button>
        </div>
      </Form>
    </Wrapper>
  );
};

export default ExaminerUpdateInformation;
