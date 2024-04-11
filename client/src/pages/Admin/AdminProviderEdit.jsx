import customFetch from "../../utils/customFetch";
import { toast } from "react-toastify";
import { Form, redirect, useLoaderData, useNavigation } from "react-router-dom";
import Wrapper from "../../assets/wrappers/DashboardFormPage";
import { FormRow, FormRowSelect } from "../../components";
import Country from "../../components/Country";
import BackOnePageButton from "../../components/BackOnePageButton";
import WrapperSelect from "../../assets/wrappers/checkBoxWrapper";
import { ACADEMY_PROVIDER_TYPE } from "../../utils/constants";
 
import day from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
day.extend(advancedFormat);


export const loader = async ({ params }) => {
  try {
    const { data } = await customFetch.get(
      `/admin/viewProvider/${params.userId}`
    );
    return data;
  } catch (error) {
    toast.error(error?.response?.data?.message);
    return redirect("/dashboard/admin/provider");
  }
};

export const action = async ({ request, params }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  const errors = { msg: "" };
  const file = formData.get("logo");
  console.log(data, file);

  let pattern = /^[a-zA-Z0-9\s]+$/;
  let numberPattern =
    /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;

  if (file && file.size > 50000) {
    errors.msg = "Photo size shall be less than 5.0 MB";
    toast.error(errors.msg);
    return errors;
  }

  let bioPattern = /^[a-zA-Z0-9\s',";.()\-]+$/;
  let dobRegex = /^\d{4}-\d{2}-\d{2}$/;

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
    errors.msg = "Organization Name is required";
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
  // if ( !data.DOBirth ){
  //   errors.msg =
  //     "Birthdate is required";
  //   toast.error(errors.msg);
  //   return errors;
  // }
  try {
    await customFetch.patch(`/admin/editProvider/${params.userId}`, formData);
    toast.success("Provider info. edit succesfully");
    return redirect("/dashboard/admin/provider/");
  } catch (error) {
    errors.msg = error?.response?.data?.message;
    toast.error(errors.msg);
    return error;
  }
};

const AdminProviderEdit = () => {
  const { data } = useLoaderData();
   
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
 
  const birthDate = day(data?.providerAdminInfo?.DOBirth).format("MM/DD/YYYY");
   
  return (
    <Wrapper>
      <div style={{ display: "flex", justifyContent: "end", gap: "2rem" }}>
        <BackOnePageButton />
      </div>
      <Form method="post" className="form" encType="multipart/form-data">
        <h4 className="form-title">edit provider information</h4>

        <img src={`${data.logo}`} alt="" style={{ width: 150, height: 150 }} />
        <div className="form-center">
          <FormRow
            type="file"
            name="logo"
            accept="image"
            labelText="Photo accept image - logo company"
            placeholder="image"
            withLabel={true}
          />
          <FormRow
            type="text"
            name="OrganizationName"
            labelText="Organization Name"
            withLabel={true}
            defaultValue={data.OrganizationName}
          />
          <WrapperSelect>
            <FormRowSelect
              labelText="Please Choose the account Type"
              name="providerType"
              list={[...Object.values(ACADEMY_PROVIDER_TYPE)]}
              className="dropListAcademy"
              // onChange={handleSelectChangeProviderType}
              classNameLabel="labelStyle"
            />
          </WrapperSelect>
          <FormRow type="text" name="webSite" defaultValue={data.webSite} />
          <FormRow type="text" name="address" defaultValue={data.address} />
          <Country name="country" defaultValue={data.country} />
          <FormRow type="text" name="city" defaultValue={data.city} />
          <FormRow
            name="phoneNumber"
            type="text"
            labelText="phoneNumber"
            defaultValue={data.phoneNumber}
          />

          <FormRow
            type="text"
            name="bio"
            labelText="Bio"
            defaultValue={data.bio}
            withLabel={true}
          />
        </div>
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
            defaultValue={data?.providerAdminInfo?.firstName}
            withLabel={true}
          />
          <FormRow
            type="text"
            name="middleName"
            labelText="Middle Name"
            defaultValue={data?.providerAdminInfo?.middleName}
            withLabel={true}
          />
          <FormRow
            type="text"
            name="familyName"
            labelText="Family Name"
            defaultValue={data?.providerAdminInfo?.familyName}
            withLabel={true}
          />
          {/* <FormRow
            type="date"
            name="DOBirth"
            labelText="DOB"
            value={birthDate}
            defaultValue={birthDate}
            withLabel={true}
          /> */}

         
          <FormRow
            type="text"
            name="adminRole"
            labelText="adminRole"
            defaultValue={data?.providerAdminInfo?.adminRole}
            withLabel={true}
          />
          <FormRow
            type="text"
            name="adminPhoneNumber"
            labelText=" Phone Number"
            defaultValue={data?.providerAdminInfo?.adminPhoneNumber}
            withLabel={true}
          />
          <FormRow
            type="text"
            name="adminAddress"
            labelText="Address"
            defaultValue={data?.providerAdminInfo?.adminAddress}
            withLabel={true}
          />
          <Country
            name="adminCountry"
            defaultValue={data?.providerAdminInfo?.country}
          />
          <FormRow
            type="text"
            name="adminPOBox"
            labelText="POBox"
            defaultValue={data?.providerAdminInfo?.adminPOBox}
            withLabel={true}
          />
          <FormRow
            type="text"
            name="adminCity"
            labelText="City"
            defaultValue={data?.providerAdminInfo?.adminCity}
            withLabel={true}
          />
          <FormRow
            type="text"
            name="adminPassportNumber"
            labelText="Passport Number"
            defaultValue={data?.providerAdminInfo?.adminPassportNumber}
            withLabel={true}
          />
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

export default AdminProviderEdit;
