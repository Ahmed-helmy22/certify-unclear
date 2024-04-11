import customFetch from "../../utils/customFetch";
import Wrapper from "../../assets/wrappers/DashboardFormPage";
import { toast } from "react-toastify";
import { Form, Link, redirect, useNavigate } from "react-router-dom";
import { useDashboardContext } from "../DashboardLayout";
import { FormRow, FormRowSelect } from "../../components";
import WrapperSelect from "../../assets/wrappers/checkBoxWrapper";
import Country from "../../components/Country";
import { ACADEMY_PROVIDER_TYPE } from "../../utils/constants";

export const action = async ({ request }) => {
  const errors = { msg: "" };
  try {
    const formData = await request.formData();
    const data = Object.fromEntries(formData);

    console.log(data.examinerType);
    let pattern = /^[a-zA-Z0-9\s]+$/;
    let bioPattern = /^[a-zA-Z0-9\s',";.()\-]+$/;
    let dobRegex = /^\d{4}-\d{2}-\d{2}$/;
    let numberPattern =
      /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;

    if (
      data?.providerType.length === 0 ||
      !data?.providerType === "GOVERNMENT" ||
      !data?.providerType === "NONPROFIT ORG" ||
      !data?.providerType === "PRIVATE ACADEMY"
    ) {
      errors.msg = "Please choose your account type!!!";
      toast.error(errors.msg);
      return errors;
    }

    if (data.phoneNumber && !numberPattern.test(data.phoneNumber)) {
      errors.msg = "Invalid phone number !!! ";
      toast.error(errors.msg);
      return errors;
    }
    if (data.adminPhoneNumber && !numberPattern.test(data.adminPhoneNumber)) {
      errors.msg = "Invalid phone number !!! ";
      toast.error(errors.msg);
      return errors;
    }

    if (data?.OrganizationName && !pattern.test(data.OrganizationName)) {
      errors.msg = "Organization Name is required";
      toast.error(errors.msg);
      return errors;
    }

    if (data?.DOBirth && !dobRegex.test(data.DOBirth)) {
      errors.msg = "Date of Birth is required";
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

    if (data?.POBox && !pattern.test(data.POBox)) {
      errors.msg =
        "POBox shall be not inlclude any speical character aA-zZ:0-9 only";
      toast.error(errors.msg);
      return errors;
    }

    if (data?.adminPOBox && !pattern.test(data.adminPOBox)) {
      errors.msg =
        "POBox shall be not inlclude any speical character aA-zZ:0-9 only";
      toast.error(errors.msg);
      return errors;
    }
    if (data?.bio && !bioPattern.test(data.bio)) {
      errors.msg =
        "Bio shall be not inlclude any speical character aA-zZ:0-9 only";
      toast.error(errors.msg);
      return errors;
    }
    if (data?.firstName && !pattern.test(data.firstName)) {
      errors.msg =
        "FirstName shall be not inlclude any speical character aA-zZ:0-9 only";
      toast.error(errors.msg);
      return errors;
    }

    if (data?.middleName && !pattern.test(data.middleName)) {
      errors.msg =
        "Address shall be not inlclude any speical character aA-zZ:0-9 only";
      toast.error(errors.msg);
      return errors;
    }

    if (data?.familyName && !pattern.test(data.familyName)) {
      errors.msg =
        "Address shall be not inlclude any speical character aA-zZ:0-9 only";
      toast.error(errors.msg);
      return errors;
    }

    if (data?.address && !pattern.test(data.address)) {
      errors.msg =
        "Address shall be not inlclude any speical character aA-zZ:0-9 only";
      toast.error(errors.msg);
      return errors;
    }

    if (data?.adminAddress && !pattern.test(data.adminAddress)) {
      errors.msg =
        "Address shall be not inlclude any speical character aA-zZ:0-9 only";
      toast.error(errors.msg);
      return errors;
    }

    if (
      (data?.adminGender === "" && data.adminGender === "male") ||
      data.adminGender === "female"
    ) {
      errors.msg = "choose your gender , please !!!";
      toast.error(errors.msg);
      return errors;
    }
    await customFetch.post("/provider/updateMyProfile", data);
    toast.success("updated profile successful");
    return redirect("/dashboard/academy");
  } catch (error) {
    errors.msg = error?.response?.data?.message;
    toast.error(errors.msg);
    return error;
  }
};
const ProviderUpdateInformation = () => {
  const { user } = useDashboardContext();

  const navigate = useNavigate();
  const handleBackClick = () => {
    navigate(-1);
  };
  return (
    <>
      <Wrapper>
        <p style={{ paddingBottom: "1rem", fontSize: "2rem" }}>
          update information
        </p>
        <hr />
        <Form method="post" encType="multipart/form-data">
          <div className="form-center">
            <FormRow
              type="text"
              name="OrganizationName"
              labelText="OrganizationName"
              defaultValue={user.OrganizationName}
              withLabel={true}
            />
            <WrapperSelect>
              <FormRowSelect
                labelText="Please Choose the account Type"
                name="providerType"
                list={[...Object.values(ACADEMY_PROVIDER_TYPE)]}
                className="dropListAcademy"
              />
            </WrapperSelect>
            <FormRow
              type="text"
              name="webSite"
              labelText="webSite"
              defaultValue={user.webSite}
              withLabel={true}
            />
            <FormRow
              name="city"
              type="text"
              labelText="city"
              defaultValue={user.city}
            />
            <FormRow
              type="text"
              name="address"
              labelText="address"
              defaultValue={user.address}
              withLabel={true}
            />

            <Country name="country" defaultValue={user.country} />

            <FormRow
              name="phoneNumber"
              type="text"
              labelText="phoneNumber"
              defaultValue={user.phoneNumber}
            />
            <FormRow
              type="text"
              name="POBox"
              labelText="POBox"
              defaultValue={user.POBox}
              withLabel={true}
            />
            <FormRow
              type="text"
              name="bio"
              labelText="Bio"
              defaultValue={user.bio}
              withLabel={true}
            />
          </div>
          <hr />
          <p
            style={{
              paddingBottom: "1.2rem",
              paddingTop: "1.2rem",
              fontSize: "1.2rem",
            }}
          >
            Admin - Account
          </p>
          <div className="form-center">
            <FormRow
              type="text"
              name="firstName"
              labelText="First Name"
              defaultValue={user?.providerAdminInfo?.firstName}
              withLabel={true}
            />
            <FormRow
              type="text"
              name="middleName"
              labelText="Middle Name"
              defaultValue={user?.providerAdminInfo?.middleName}
              withLabel={true}
            />
            <FormRow
              type="text"
              name="familyName"
              labelText="Family Name"
              defaultValue={user?.providerAdminInfo?.familyName}
              withLabel={true}
            />
            <FormRow
              type="date"
              name="DOBirth"
              labelText="DOB"
              defaultValue={user?.providerAdminInfo?.DOBirth}
              withLabel={true}
            />
            <FormRow
              type="text"
              name="adminRole"
              labelText="adminRole"
              defaultValue={user?.providerAdminInfo?.adminRole}
              withLabel={true}
            />
            <FormRow
              type="text"
              name="adminPhoneNumber"
              labelText=" Phone Number"
              defaultValue={user?.providerAdminInfo?.adminPhoneNumber}
              withLabel={true}
            />
            <FormRow
              type="text"
              name="adminAddress"
              labelText="Address"
              defaultValue={user?.providerAdminInfo?.adminAddress}
              withLabel={true}
            />
            <Country name="adminCountry" defaultValue={user.country} />
            <FormRow
              type="text"
              name="adminPOBox"
              labelText="POBox"
              defaultValue={user?.providerAdminInfo?.adminPOBox}
              withLabel={true}
            />
            <FormRow
              type="text"
              name="adminCity"
              labelText="City"
              defaultValue={user?.providerAdminInfo?.adminCity}
              withLabel={true}
            />
            <FormRow
              type="text"
              name="adminPassportNumber"
              labelText="Passport Number"
              defaultValue={user?.providerAdminInfo?.adminPassportNumber}
              withLabel={true}
            />
            {/* <FormRow
              type="file"
              name="adminProfilePhoto"
              labelText="Profile Photo"
              defaultValue={user?.providerAdminInfo?.adminProfilePhoto}
              withLabel={true}
            />
            <FormRow
              type="file"
              name="adminPassportPhoto"
              labelText="adminPassportPhoto"
              defaultValue={user?.providerAdminInfo?.adminPassportPhoto}
              withLabel={true}
            /> */}
            {/* <FormRow
              type="file"
              name="adminVerificationPhoto"
              labelText="Verification Photo"
              defaultValue={user?.providerAdminInfo?.adminVerificationPhoto}
              withLabel={true}
            /> */}

            <div
              className="genderInput"
              style={{ display: "flex", gap: "2rem" }}
            >
              <span>Gender</span>
              <div>
                <FormRow
                  type="radio"
                  key="male"
                  name="adminGender"
                  labelText="male"
                  defaultValue="male"
                  withLabel
                />
              </div>
              <div>
                <FormRow
                  type="radio"
                  key="female"
                  name="adminGender"
                  labelText="female"
                  defaultValue="female"
                  withLabel
                />
              </div>
            </div>
          </div>
          <div className="" style={{ display: "flex", justifyContent: "end" }}>
            <button
              type="submit"
              className="btn"
              style={{ width: "300px", marginTop: "1rem" }}
            >
              Submit
            </button>
          </div>
        </Form>
      </Wrapper>
    </>
  );
};

export default ProviderUpdateInformation;
