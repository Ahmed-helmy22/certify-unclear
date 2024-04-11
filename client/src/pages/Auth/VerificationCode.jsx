import Wrapper from "../../assets/wrappers/RegisterAndLoginPage";
import { FormRow } from "../../components";
import WrapperSelect from "../../assets/wrappers/checkBoxWrapper";
import FormRowSelect from "../../components/FormRowSelect";
import { toast } from 'react-toastify';
import {
  MainWrapper,
  MainPage,
} from "../../assets/wrappers/RegistrationLoginPage";
import image from "../../assets/images/host-banner.png";

import { USER_TYPE } from "../../utils/constants";
import customFetch from "../../utils/customFetch";
import { Form, redirect, useNavigation, Link , useActionData} from "react-router-dom";
import { MdEmail } from "react-icons/md";
 
export const action = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  const errors = { msg : '' , emailmsg : ''}
  
   if(data.verificationCode.length < 6 || data.verificationCode === "") {
    errors.msg = 'Verification-Code shall be not length than 6 numbers'
    toast.error(errors.msg)
    return errors;
  }
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
    if (data.userType === "academy") {
       await customFetch.post("/provider/verifyEmail", data);
      toast.success('verification successful')
      return redirect("/login");
    } else if (data.userType === "candidate") {
       await customFetch.post("/candidate/verifyEmail", data);
      toast.success('verification successful')
      return redirect("/login");
    } else if (data.userType === "examiner") {
       await customFetch.post("/examiner/verifyEmail", data);
      toast.success('verification successful')
      return redirect("/login");
    } else {
      toast.error('Verify your user type')
      return null;
    }
  } catch (error) {
    errors.msg = error?.response?.data?.message;
    toast.error(errors.msg)
    return error;
  }
};

const VerificationCode = () => {
  const errors = useActionData();
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
                <input type="text" placeholder="Verification Code" required name="verificationCode" />
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

export default VerificationCode;
