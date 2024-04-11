import Wrapper from "../../assets/wrappers/RegisterAndLoginPage";
import { FormRow } from "../../components";
import WrapperSelect from "../../assets/wrappers/checkBoxWrapper";
import FormRowSelect from "../../components/FormRowSelect";
import { toast } from "react-toastify";

import { USER_TYPE } from "../../utils/constants";
import customFetch from "../../utils/customFetch";
import {
  Form,
  redirect,
  useNavigation,
  Link,
  useActionData,
} from "react-router-dom";

export const action = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  const errors = { msg: "", emailmsg: "" };

  if (data.passwordResetCode.length < 6) {
    errors.msg = "Verification-Code shall be not length than 6 numbers";
    toast.error(errors.msg);
    return errors;
  }

  try {
    if (data.userType === "academy") {
      await customFetch.patch("/provider/resetPassword", data);
      toast.success("verification successful");
      return redirect("/login");
    } else if (data.userType === "candidate") {
      await customFetch.patch("/candidate/resetPassword", data);
      toast.success("verification successful");
      return redirect("/login");
    } else if (data.userType === "examiner") {
      await customFetch.patch("/examiner/resetPassword", data);
      toast.success("verification successful");
      return redirect("/login");
    } else {
      toast.error("Verify your user type");
      return null;
    }
  } catch (error) {
    errors.msg = error?.response?.data?.message;
    toast.error(errors.msg);
    return error;
  }
};

const ResetPassword = () => {
  const errors = useActionData();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  return (
    <Wrapper>
      <Form className="form" method="post">
        <h4>Verification code</h4>
        <FormRow type="email" name="email" />
        {errors?.emailmsg && <p style={{ color: "red" }}>{errors.emailmsg}</p>}
        <WrapperSelect>
          <FormRowSelect
            labelText="Please Choose the account Type"
            name="userType"
            list={[...Object.values(USER_TYPE)]}
            className="dropListAcademy"
            classNameLabel="labelStyle"
          />
        </WrapperSelect>
        <FormRow type="text" name="passwordResetCode" />
        <FormRow
          type="password"
          name="password"
          labelText="Password"
          defaultValue="1234567891"
          withLabel={true}
        />
        <FormRow
          type="password"
          name="passwordConfirm"
          labelText="Confirm Password"
          defaultValue="1234567891"
          withLabel={true}
        />
        {errors?.msg && <p style={{ color: "red" }}>{errors.msg}</p>}
        <button type="submit" className="btn btn-block" disabled={isSubmitting}>
          {isSubmitting ? "submitting" : "submit"}
        </button>
        <div className="row-formRow"></div>
        <p>
          Already a member ?
          <Link to="/login" className="member-btn">
            Login
          </Link>
        </p>
      </Form>
    </Wrapper>
  );
};

export default ResetPassword;
