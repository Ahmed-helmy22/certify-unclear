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
import { FormRow } from "../../components";
import Country from "../../components/Country";

export const loader = async ({ params }) => {
  try {
    const { data } = await customFetch.get(
      `/admin/viewCandidate/${params.userId}`
    );
    return data;
  } catch (error) {
    toast.error(error?.response?.data?.message);
    return redirect("/dashboard/admin/candidates/");
  }
};

export const action = async ({ request, params }) => {
  const formData = await request.formData();

  const data = Object.fromEntries(formData);
  const file = formData.get("candidateProfilePhoto");
  console.log(data);
  const errors = { msg: "" };
  // firstName familyName DOBirth occupation city country phoneNumber qualification address

  let pattern = /^[a-zA-Z0-9\s]+$/;

  if (file.size > 50000) {
    errors.msg = "Candidate Profile Photo size shall be less than 5.0 MB";
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
  if (data.occupation && !pattern.test(data.occupation)) {
    errors.msg =
      "Occupation shall be not inlclude any speical character aA-zZ:0-9 only";
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
  if (data.qualification && !pattern.test(data.qualification)) {
    errors.msg =
      "Qualification shall be not inlclude any speical character aA-zZ:0-9 only";
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
  let dobRegex = /^\d{4}-\d{2}-\d{2}$/;
  if (data.DOBirth && !dobRegex.test(data.DOBirth)) {
    errors.msg = "Date of Birth is invalid date";
    toast.error(errors.msg);
    return errors;
  }

  try {
    await customFetch.patch(`/admin/editCandidate/${params.userId}`, formData);
    toast.success("Candidat info. edit succesfully");
    return redirect("/dashboard/admin/candidates/");
  } catch (error) {
    toast.error(error?.response?.data?.message);
    toast.error(errors.msg);
    return error;
  }
};

const AdminCandidateEdit = () => {
  const { data } = useLoaderData();
  const navigation = useNavigation();
  const navigate = useNavigate();
  const isSubmitting = navigation.state === "submitting";

  const handleBackClick = () => {
    navigate(-1);
  };

  const handleBackClickTwo = () => {
    navigate(-2);
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
      <h4 className="form-title">edit candidate information</h4>
        <img
        src={`${data.candidateProfilePhoto}`}
        alt=""
        style={{ width: 150, height: 150 }}
      />
      <Form method="post" className="form" encType="multipart/form-data">
       
        <div className="form-center">
          <FormRow
            type="file"
            name="candidateProfilePhoto"
            accept="image"
            labelText="Photo accept image"
            placeholder="image"
            withLabel={true}
          />
          <FormRow type="text" name="firstName" defaultValue={data.firstName} />
          <FormRow
            type="text"
            name="middleName"
            defaultValue={data.middleName}
          />
          <FormRow
            type="text"
            name="familyName"
            defaultValue={data.familyName}
          />
          <FormRow type="date" name="DOBirth" defaultValue={data.DOBirth} />
          <FormRow
            type="text"
            name="occupation"
            defaultValue={data.occupation}
          />

          <FormRow
            type="text"
            name="qualification"
            defaultValue={data.qualification}
          />
          <FormRow type="text" name="address" defaultValue={data.address} />
          <Country name="country" />
          <FormRow type="text" name="city" defaultValue={data.city} />
          <FormRow type="text" name="POBox" defaultValue={data.POBox} />
          <FormRow
            type="text"
            name="phoneNumber"
            defaultValue={data.phoneNumber}
          />
          <FormRow
            type="text"
            name="PassportNumber"
            defaultValue={data.PassportNumber}
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

export default AdminCandidateEdit;
