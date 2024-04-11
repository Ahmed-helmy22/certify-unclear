import customFetch from "../../utils/customFetch";
 import WrapperSelect from "../../assets/wrappers/checkBoxWrapper";
import FormRowSelect from "../../components/FormRowSelect";
import { toast } from "react-toastify";
import { USER_TYPE } from "../../utils/constants";
 import { Form, redirect, useNavigation, Link } from "react-router-dom";
import {
  MainWrapper,
  MainPage,
} from "../../assets/wrappers/RegistrationLoginPage";
import image from "../../assets/images/host-banner.png";
import { RiLockPasswordFill } from "react-icons/ri";
import { MdEmail } from "react-icons/md";
import { Logo } from "../../components";

export const action = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  const errors = { msg: "" };
  if (data.email == "") {
    errors.msg = "Email is required";
    toast.error(errors.msg);
    return errors;
  }
  if (!data.email.includes(".com")) {
    errors.msg = "its not an email please check again";
    toast.error(errors.msg);
    return errors;
  }
  if (data.password.length < 10) {
    errors.msg = "password shall be not length than 9 numbers";
    toast.error(errors.msg);
    return errors;
  }
  if (
    !data.userType === "candidate" ||
    !data.userType === "examienr" ||
    !data.userType === "academy"
  ) {
    errors.msg = "please choose your account type!";
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
      errors.msg = "choose the correct user type";
      toast.error(errors.msg);
      return errors;
    }
  } catch (error) {
    errors.msg = error?.response?.data?.message;
    toast.error(errors.msg);
    return error;
  }
};

const Login = () => {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  return (
    <MainPage>
        {/* <Logo /> */}
      <MainWrapper>
        <div className="bgImag">
          <img src={image} alt="" />
        </div>

        <div className="wrapperForm">
          <div>
            <h4>Login</h4>
          </div>
          <div className="header">
            <p>
              Not a member ?
              <Link to="/register" className="member-btn">
                Register
              </Link>
            </p>
          </div>
          <hr />

          <Form className="form" method="post">
            <div className="input-box">
              <div className="input-field">
                <input type="email" placeholder="email" required name="email" />
                <MdEmail className="icon" />
              </div>
            </div>
            <div className="input-box">
              <div className="input-field">
                <input
                  type="password"
                  placeholder="password"
                  required
                  name="password"
                />
                <RiLockPasswordFill className="icon" />
              </div>
            </div>

            <WrapperSelect className="input-box">
              <FormRowSelect
                labelText="Please Choose the account Type"
                name="userType"
                list={[...Object.values(USER_TYPE)]}
                className="input-box"
                classNameLabel="labelStyle"
              />
            </WrapperSelect>

            <button
              type="submit"
              className="btn btn-block"
              disabled={isSubmitting}
            >
              {isSubmitting ? "submitting" : "login"}
            </button>
          </Form>
          <div className="header">
            <p>
              Forget password ?
              <Link to="/forget-password" className="member-btn">
                forget-password
              </Link>
            </p>
          </div>
        </div>
      </MainWrapper>
    </MainPage>
  );
};

export default Login;
