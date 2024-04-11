import customFetch from "../../utils/customFetch";
import { toast } from "react-toastify";
import {
  Form,
  Link,
  redirect,
  useLoaderData,
  useNavigate,
  useNavigation,
} from "react-router-dom";
import Wrapper from "../../assets/wrappers/DashboardFormPage";
import { FormRow, FormRowSelect } from "../../components";
import Country from "../../components/Country";
import {
  ACADEMY_PROVIDER_TYPE,
  CERTIFY_AUTHORITY_TYPE,
} from "../../utils/constants";
import WrapperSelect from "../../assets/wrappers/checkBoxWrapper";
import { useState } from "react";
import profilePohoto from '../../assets/images/profile-avatar.png'

export const loader = async ({ params }) => {
  try {
    const { data } = await customFetch.get(
      `/admin/viewExaminer/${params.userId}`
    );
    redirect("/dashboard/admin/examiner");
    return data;
  } catch (error) {
    toast.error(error?.response?.data?.message);
    return redirect("/dashboard/admin/examiner");
  }
};

export const action = async ({ request, params }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  const file = formData.get("examinerProfilePhoto");


  const errors = { msg: "" };
   let pattern = /^[a-zA-Z0-9\s]+$/;
  let numberPattern =  /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
  let dobRegex = /^\d{4}-\d{2}-\d{2}$/;
   
  if (file.size > 50000) {
    errors.msg = "Photo size shall be less than 5.0 MB";
    toast.error(errors.msg);
    return errors;
  }
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

  
  if (data.phoneNumber && !numberPattern.test(data.phoneNumber)) {
    errors.msg = "Invalid phone number";
    toast.error(errors.msg);
    return errors;
  }
  if (!data.DOBirth  ) {
    errors.msg = "Date of Birth is required";
    toast.error(errors.msg);
    return errors;
  }
  if (data.DOBirth && !dobRegex.test(data.DOBirth)) {
    errors.msg = "Date of Birth is invalid date";
    toast.error(errors.msg);
    return errors;
  }
  try {
    await customFetch.patch(`/admin/editExaminer/${params.userId}`, formData);
    toast.success("Approvign Authority info. edit successfully");
    return redirect("/dashboard/admin/examiner/");
  } catch (error) {
    errors.msg = error?.response?.data?.message;
    toast.error(errors.msg);
    return error;
  }
};

const AdminExaminerEdit = () => {
  const { data } = useLoaderData();
  const navigation = useNavigation();
  const navigate = useNavigate();
  const [selectedOption, setSelectedOption] = useState("");

  const isSubmitting = navigation.state === "submitting";
  const handleBackClick = () => {
    navigate(-1);
  };

  const handleBackClickTwo = () => {
    navigate(-2);
  };

  const handleSelectChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedOption(selectedValue);
  };
  return (
    <Wrapper>
      <div style={{ display: "flex", justifyContent: "end", gap: "2rem" }}>
        <Link className="btn closBtnExaminer" onClick={handleBackClick}>
          Back
        </Link>
        <Link className="btn closBtnExaminer" onClick={handleBackClickTwo}>
          Close
        </Link>
      </div>
      <h4 className="form-title">Edit Aprrove Authortiy information</h4>
      <img
        src={data?.examinerProfilePhoto ? `${data?.examinerProfilePhoto}` : profilePohoto}
        alt=""
        style={{ width: 150, height: 150 }}
      />
      <Form method="post" className="form" encType="multipart/form-data">
        <div className="form-center">
          <FormRow
            type="file"
            name="examinerProfilePhoto"
            accept="image"
            labelText="Photo accept image"
            placeholder="image"
            withLabel={true}
          />
          <FormRow
            type="text"
            name="firstName"
            labelText="firstname"
            defaultValue={data?.firstName}
            withLabel={true}
          />
          <FormRow
            type="text"
            name="middleName"
            labelText="middleName"
            withLabel={true}
            defaultValue={data?.middleName}
          />
          <FormRow
            type="text"
            name="familyName"
            labelText="family Name"
            defaultValue={data?.familyName}
            withLabel={true}
          />

          <FormRow
            type="date"
            name="DOBirth"
            labelText="DOB"
            withLabel={true}
          />
          <FormRow type="text" name="address" defaultValue={data?.address} />

          <Country name='country'/>
          <FormRow type="text" name="city" defaultValue={data?.city} />
          <FormRow type="text" name="POBox" defaultValue={data?.POBox} />

          <FormRow
            type="text"
            name="phoneNumber"
            labelText="phone Number"
            withLabel
          />
          <WrapperSelect>
            <FormRowSelect
              labelText="Please Choose the account Type"
              name="examinerType"
              list={[...Object.values(ACADEMY_PROVIDER_TYPE)]}
              className="dropListAcademySecond"
              classNameLabel="labelStyle"
            />
          </WrapperSelect>

          <div>
            <label htmlFor="" style={{ color: "transparent" }}>
              submit
            </label>
            <button
              type="submit"
              className="btn btn-block form-btn "
              disabled={isSubmitting}
            >
              {isSubmitting ? "submitting..." : "submit"}
            </button>
          </div>
        </div>
      </Form>
    </Wrapper>
  );
};

export default AdminExaminerEdit;
