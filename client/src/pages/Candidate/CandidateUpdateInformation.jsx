import Wrapper from "../../assets/wrappers/DashboardFormPage";
import { Form, Link, redirect, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FormRow } from "../../components";
import { useDashboardContext } from "../DashboardLayout";
import customFetch from "../../utils/customFetch";
import Country from "../../components/Country";

export const action = async ({ request }) => {
  const formData = await request.formData();

  const data = Object.fromEntries(formData);
  console.log(!data.DOBirth);
  const errors = { msg: "" };
 
  let pattern = /^[a-zA-Z0-9\s]+$/;
  if (data.familyName  && !pattern.test(data.familyName)) {
    errors.msg = "Family Name shall be not inlclude any speical character aA-zZ:0-9 only";
    toast.error(errors.msg);
    return errors;
  }
  if (data.middleName  && !pattern.test(data.middleName)) {
    errors.msg = "Middle Name shall be not inlclude any speical character aA-zZ:0-9 only";
    toast.error(errors.msg);
    return errors;
  }
  if (data.firstName  && !pattern.test(data.firstName)) {
    errors.msg = "Frist Name shall be not inlclude any speical character aA-zZ:0-9 only";
    toast.error(errors.msg);
    return errors;
  }
  if (data.occupation  && !pattern.test(data.occupation)) {
    errors.msg = "Occupation shall be not inlclude any speical character aA-zZ:0-9 only";
    toast.error(errors.msg);
    return errors;
  }
  if (data.country  && !pattern.test(data.country)) {
    errors.msg = "Country shall be not inlclude any speical character aA-zZ:0-9 only";
    toast.error(errors.msg);
    return errors;
  }
  if (data.city  && !pattern.test(data.city)) {
    errors.msg = "City shall be not inlclude any speical character aA-zZ:0-9 only";
    toast.error(errors.msg);
    return errors;
  }
  if (data.qualification  && !pattern.test(data.qualification)) {
    errors.msg = "Qualification shall be not inlclude any speical character aA-zZ:0-9 only";
    toast.error(errors.msg);
    return errors;
  }
  if (data.address  && !pattern.test(data.address)) {
    errors.msg = "Address shall be not inlclude any speical character aA-zZ:0-9 only";
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
    await customFetch.post("/candidate/updateMyProfile", data);
    toast.success("updated profile successful");
    return redirect("/dashboard/candidate");
  } catch (error) {
    errors.msg = error?.response?.data?.message;
    toast.error(errors.msg);
    return error;
  }
};

const CandidateUpdateInformation = () => {
  const { user } = useDashboardContext();
  const navigate = useNavigate();
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
      <h2>Update information</h2>
      <Form method="post" encType="multipart/form-data">
        <div className="form-center">
          <FormRow
            name="firstName"
            type="text"
            labelText="firstName"
            defaultValue={user.firstName}
          />
          <FormRow
            name="middleName"
            type="text"
            labelText="middleName"
            defaultValue={user.middleName}
          />
          <FormRow
            name="familyName"
            type="text"
            labelText="familyName"
            defaultValue={user.familyName}
          />
          <FormRow
            name="DOBirth"
            type="date"
            labelText="DOBirth"
            defaultValue={user.DOBirth}
          />

          <FormRow
            name="occupation"
            type="text"
            labelText="occupation"
            defaultValue={user.occupation}
          />
          <FormRow
            name="qualification"
            type="text"
            labelText="qualification"
            defaultValue={user.qualification}
          />

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
            name="phoneNumber"
            type="text"
            labelText="Phone no"
            withLabel={true}
            defaultValue={user.phoneNumber}
          />
          <FormRow
            name="POBox"
            type="text"
            labelText="POBox"
            withLabel={true}
            defaultValue={user.POBox}
          />
       
      
          <FormRow
            name="PassportNumber"
            type="text"
            labelText="PassportNumber"
            withLabel={true}
            defaultValue={user.PassportNumber}
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

export default CandidateUpdateInformation;
