import { FormRow } from "../../components";
import { Form, redirect, useNavigation } from "react-router-dom";
import Wrapper from "../../assets/wrappers/DashboardFormPage";
import customFetch from "../../utils/customFetch";
import { toast } from "react-toastify";

export const action = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  const errors = { msg: "" };
  if (data.newPassword.length < 10 || data.passwordConfirm.length < 10 || data.oldPassword.length < 10 ) {
    errors.msg = "password not less than 10 !!!";
    toast.error(errors.msg);
    return errors;
  }
  if ( data.newPassword !==  data.passwordConfirm){
    errors.msg = "Password and confirm password are not matched";
    toast.error(errors.msg);
    return errors;
  }

  try {
    await customFetch.patch("/examiner/updatePassword/", data);
    toast.success("Change password Successfful");
    return redirect("/");
  } catch (error) {
    errors.msg = error?.response?.data?.message;
    toast.error(errors.msg);
    return error;
  }
};

const ChangePasswordExaminer = () => {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

   return (
    <Wrapper>
      <Form method="post" className="form" encType="multipart/form-data">
        <h4 className="form-title">Change password</h4>
        <div className="form-center">
          <FormRow
            type="password"
            name="oldPassword"
            labelText="Old password"
            withLabel
          />
          <FormRow
            type="password"
            name="newPassword"
            labelText="New password"
            withLabel
          />

          <FormRow
            type="password"
            name="passwordConfirm"
            labelText="Confirm New password"
            withLabel
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

export default ChangePasswordExaminer;
