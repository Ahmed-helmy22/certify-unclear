import { FormRow, Logo } from "../../components";
import { Form, Link, redirect, useNavigation } from "react-router-dom";
import customFetch from "../../utils/customFetch";
import { toast } from "react-toastify";
import image from "../../assets/images/host-banner.png";

import {
  MainWrapper,
  MainPage,
} from "../../assets/wrappers/RegistrationLoginPage";
import { MdEmail } from "react-icons/md";
export const action = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  const errors = { msg: "" };
  let patternObjId = /^[0-9a-fA-F]{24}$/;

  if (data.email && data.candidateId.length > 0) {
    errors.msg = "Check by candidate email or id only.....";
    toast.error(errors.msg);
    return errors;
  }
  if (data.candidateId.length > 0 && !patternObjId.test(data.candidateId)) {
    errors.msg = "Candidate Id is invalid, please check again";
    toast.error(errors.msg);
    return errors;
  }

  try {
    const result = await customFetch.post(
      "/candidate/getCandidateProfile",
      data
    );
    toast.success("Get Candidate data successful");
    //  navgiate to   >> personel-certificate/${result.data.candidate._id}
    return redirect(`/personal-certificate/${result.data.candidate._id}`);
  } catch (error) {
    errors.msg = error?.response?.data?.message;
    toast.error(errors.msg);
    return error;
  }
};

const CheckCertificatesProfile = () => {
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
            <h4>Check Candidate Profile</h4>
          </div>
          <div className="header">
            <p>
              Already a member ?
              <Link to="/login" className="member-btn">
                Login
              </Link>
            </p>
          </div>
          <hr />

          <Form method="post" className="form" encType="multipart/form-data">
            <div className="input-box">
              <div className="input-field">
                <input type="email" placeholder="email" name="email" />
                <MdEmail className="icon" />
              </div>
            </div>
            <p style={{fontSize: '1rem'}}>
            | OR 
            </p>
           
            <div className="input-box">
              <div className="input-field">
                <input type="text" placeholder="Candidate id"  name="candidateId" />
                <MdEmail className="icon" />
              </div>
            </div>
            <div className="form-btn">
              <button type="submit" className="btn " disabled={isSubmitting}>
                {isSubmitting ? "submitting" : "Search"}
              </button>
            </div>
          </Form>
        </div>
      </MainWrapper>
    </MainPage>
  );
};

export default CheckCertificatesProfile;
