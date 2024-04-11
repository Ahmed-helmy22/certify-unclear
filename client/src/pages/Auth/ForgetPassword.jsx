import FormRowSelect from "../../components/FormRowSelect";
import WrapperSelect from "../../assets/wrappers/checkBoxWrapper";
import {
  MainWrapper,
  MainPage,
} from "../../assets/wrappers/RegistrationLoginPage";
import { Form, redirect, useNavigation, Link } from "react-router-dom";
import { toast } from "react-toastify";
import { USER_TYPE } from "../../utils/constants";
import customFetch from "../../utils/customFetch";
import image from "../../assets/images/host-banner.png";
import { MdEmail } from "react-icons/md";

export const action = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  const errors = { msg: "" };
  try {
    if (data.userType === "candidate") {
      await customFetch.post("/candidate/forgetPassword", data);
      toast.success("check your email for verification code");
      return redirect("/reset-password");
    } else if (data.userType === "academy") {
      await customFetch.post("/provider/forgetPassword", data);
      toast.success("check your email for verification code");
      return redirect("/reset-password");
    } else if (data.userType === "examiner") {
      await customFetch.post("/examiner/forgetPassword", data);
      toast.success("check your email for verification code");
      return redirect("/reset-password");
    } else {
      errors.msg = "choose the corrct user type";
      toast.error(errors.msg);
      return errors;
    }
  } catch (error) {
    toast.error(error?.response?.data?.message);
    return error;
  }
};

const ForgetPassword = () => {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  return (
    <MainPage>
      <MainWrapper>
        <div className="bgImag">
          <img src={image} alt="" />
        </div>

        <div className="wrapperForm">
          <div>
            <h4>Forget Password</h4>
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
              {isSubmitting ? "submitting" : "Reset"}
            </button>
            <div className="footer">
              <p>
                <Link to="/home" className="member-btn">
                  home
                </Link>
              </p>
              <p>
                Already member !
                <Link to="/login" className="member-btn">
                  Login
                </Link>
              </p>
            </div>
          </Form>
        </div>
      </MainWrapper>
    </MainPage>

    //   <Wrapper>
    //   <Form method="post" className="form">
    //     <h4>forget Password</h4>
    //     <FormRow type="emal" name="email" />
    //     <WrapperSelect>
    //         <FormRowSelect
    //           labelText="Please Choose the account Type"
    //           name="userType"
    //           list={[...Object.values(USER_TYPE)]}
    //           className="dropListAcademy"
    //           classNameLabel="labelStyle"
    //         />
    //       </WrapperSelect>
    //       <button type="submit" className="btn btn-block" disabled={isSubmitting}>
    //         {isSubmitting ? "submitting" : "reset"}
    //       </button>

    //     <div className="genderInput">
    //       <p>
    //         Already regisertd ?
    //         <Link to="/login" className="member-btn">
    //           login
    //         </Link>
    //       </p>
    //       <p>
    //         Not a member ?
    //         <Link to="/register" className="member-btn">
    //           Register
    //         </Link>
    //       </p>
    //     </div>
    //   </Form>
    // </Wrapper>
  );
};

export default ForgetPassword;
