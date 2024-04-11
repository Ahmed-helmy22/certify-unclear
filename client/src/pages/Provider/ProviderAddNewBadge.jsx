import { FormRow } from "./../../components";
import { Form, useNavigation, redirect } from "react-router-dom";
import Wrapper from "../../assets/wrappers/DashboardFormPage";
import customFetch from "../../utils/customFetch";
import { toast } from "react-toastify";
 
export const action = async ({ request }) => {
  const formData = await request.formData();
  const file = formData.get("badgePhoto");
  const errors = { msg: "" };
  
  if (file.type !== "image/png") {
    errors.msg = "badge photo shall be png type";
    toast.error(errors.msg);
    return errors;
  }
  if (file.size > 50000) {
    errors.msg = "badge photo size shall be less than 5.0 MB";
    toast.error(errors.msg);
    return errors;
  }
  const data = Object.fromEntries(formData);

  if ( data.title.length  < 2){
    errors.msg = 'The Title shall contain more than 2 characters';
    toast.error(errors.msg);
    return errors;
  }
  if ( data.department.length  < 2){
    errors.msg = 'The department shall contain more than 2 characters';
    toast.error(errors.msg);
    return errors;
  }
  let pattern = /^[a-zA-Z0-9\s]+$/;

  if ( !pattern.test(data.title) || !pattern.test(data.department)){
    errors.msg = 'Shall not inlclude any speical character aA-zZ:0-9 only';
    toast.error(errors.msg);
    return errors;
  }

  try {
    await customFetch.post("/badge/addBadge/", formData);
    toast.success("Badge Added Successfful");

    return redirect("/dashboard/academy/all-badges");
  } catch (error) {
    errors.msg = error?.response?.data?.message;
    toast.error(errors.msg);
    return error;
  }
};

const ProviderAddNewBadge = () => {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  return (
    <Wrapper>
      <Form method="post" className="form" encType="multipart/form-data">
        <h4 className="form-title">add badge</h4>
        <div className="form-center">
          <FormRow type="text" name="title" labelText="badge name" withLabel />
          <FormRow
            type="text"
            name="department"
            labelText="Division/Sector/Department"
            withLabel
            placeHolder="if not applicable please write N/A"
          />
          <FormRow
            type="file"
            name="badgePhoto"
            accept="image/png"
            labelText="badge Photo accept image/png only"
            placeholder="image/png"
            withLabel={true}
          />
          <button
            type="submit"
            className="btn btn-block form-btn"
            disabled={isSubmitting}
          >
            {isSubmitting ? "submitting" : "submit"}
          </button>
        </div>
      </Form>
    </Wrapper>
  );
};

export default ProviderAddNewBadge;
