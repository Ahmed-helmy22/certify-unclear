import { FormRow } from "../components";
import Wrapper from "../assets/wrappers/UpdateInformationWrapper";
import { Form, redirect } from "react-router-dom";
import { useDashboardContext } from "./DashboardLayout";
import customFetch from "../utils/customFetch";
import { toast } from "react-toastify";
import Country from "../components/Country";

export const action = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  const errors = { msg: "" };
  if (data.password.length < 9) {
    errors.msg = "password shall be not length than 9 numbers";
    toast.error(errors.msg);
    return errors;
  }
  try {
    if (data.userType === "candidate") {
      await customFetch.post("/candidate/login", data);
      toast.success("login successful");
      return redirect("/dashboard/candidate");
    } else if (data.userType === "academy") {
      await customFetch.post("/provider/login", data);
      toast.success("login successful academy");
      return redirect("/dashboard/academy");
    } else if (data.userType === "examiner") {
      await customFetch.post("/examiner/login", data);
      toast.success("login successful");
      return redirect("/dashboard/examiner");
    } else {
      errors.msg = "choose the corrct user type";
      toast.error(errors.msg);
      return errors;
    }
  } catch (error) {
    console.log(error);
    errors.msg = error?.response?.data?.message;
    toast.error(errors.msg);
    return error;
  }
};

const UpdateInformation = () => {
  const { user } = useDashboardContext();

  return (
    <Wrapper>
      <h2>update information</h2>
      <Form method="post" encType="multipart/form-data">
        <div>
          {/* /candidateProfilePhoto */}
          <FormRow
            type="file"
            name="candidateProfilePhoto"
            accept="image/*"
            labelText="candidate Profile Photo"
            withLabel={true}
          />
          <FormRow
            name="occupation"
            type="text"
            labelText="occupation"
            withLabel={true}
          />
          <Country name="country" />

          <FormRow
            name="address"
            type="text"
            labelText="address"
            withLabel={true}
          />
          <FormRow name="city" type="text" labelText="city" withLabel={true} />

          <FormRow
            name="Phone no"
            type="text"
            labelText="Phone no"
            withLabel={true}
          />
        </div>
        <div>
          <FormRow
            name="qualifications"
            type="text"
            labelText="qualifications"
            withLabel={true}
          />
          <FormRow
            name="poBox"
            type="text"
            labelText="PO.Box"
            withLabel={true}
          />

          <button className="btn ">Submit</button>
        </div>
      </Form>
    </Wrapper>
  );
};

export default UpdateInformation;
