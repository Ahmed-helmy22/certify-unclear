 import Wrapper from "../assets/wrappers/RegisterAndLoginPage";
import { FormRow  } from "../components/";
import { Form, redirect, useNavigation } from "react-router-dom";
import customFetch from "../utils/customFetch";
import { toast } from "react-toastify";

export const action = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  const errors = { msg: "" };
  let patternObjId = /^[0-9a-fA-F]{24}$/;

  if (data.candidateBadgeId.length === 0) {
    errors.msg = "Badge Id is required...";
    toast.error(errors.msg);
    return errors;
  }
  if (!patternObjId.test(data.candidateBadgeId)) {
    errors.msg = "Badge Id is invalid, please check again  😒 !!!!";
    toast.error(errors.msg);
    return errors;
  }
 
  try {
    await customFetch.post("/candidate/getsingleCandidateBadge", data);
    toast.success("Get Certifcate successful");
    // redirect to register/email-verification
    return redirect(`/certificate/${data.candidateBadgeId}`);
  } catch (error) {
    //  error message
    errors.msg = error?.response?.data?.message;
    toast.error(errors.msg);
    return error;
  }
};

const CheckCertificateLandingPage = () => {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  return (
    <Wrapper>
      <Form className="form" method="post">
        <h4>Check Certificate</h4>
        <FormRow
          type="text"
          name="candidateBadgeId"
          labelText="certificate Regstration number"
          withLabel
          placeHolder="Enter certificate registration number"
        />

        <button type="submit" className="btn btn-block" disabled={isSubmitting}>
          {isSubmitting ? "submitting" : "Search"}
        </button>
      </Form>
    </Wrapper>
  );
};

export default CheckCertificateLandingPage;
