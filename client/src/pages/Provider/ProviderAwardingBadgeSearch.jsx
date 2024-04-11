import { useState } from "react";
import { Form, useNavigation, redirect  } from "react-router-dom";
import Wrapper from "../../assets/wrappers/DashboardFormPage";
import FormRow from "../../components/FormRow";
import customFetch from "../../utils/customFetch";
import { toast } from "react-toastify";

export const action = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  const errors = { msg: "" };

  // let pattern = /^[0-9a-fA-F]{24}$/;
  // if (!pattern.test(data.candidateId)) {
  //   errors.msg = "Candidate Id shall be 24 characters please re-check again";
  //   toast.error(errors.msg);
  //   return errors;
  // }

  try {
    const candidate = await customFetch.post(
      "/candidate/getCandidateProfile",
      data
    );
    toast.success("Get candidate data successfully");
    return redirect(
      `/dashboard/academy/award-badge/${candidate.data.candidate._id}`
    );
  } catch (error) {
    console.log(error);
    toast.error(error?.response?.data?.message[0]);
    return error;
  }
};

const ProviderAwardingBadgeSearch = () => {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  const [isLoading, setIsLoading] = useState(false);

  return (
    <Wrapper>
      <Form method="post" className="form awardNewBadge">
        <h4 className="form-title">Search for a candidate</h4>
        <div className="form-coloumn">
          <FormRow
            type="email"
            name="email"
            labelText="email"
            withLabel
            defaultValue="bayon70874@konican.com"
          />
          {/* <span>Or</span>
          <FormRow
            type="text"
            name="candidateId"
            labelText="Registration Number"
            withLabel
          /> */}
          <button
            type="submit"
            className="btn btn-block form-btn"
            disabled={isSubmitting}
          >
            {isLoading ? "submitting" : "search"}
          </button>
        </div>
      </Form>
    </Wrapper>
  );
};

export default ProviderAwardingBadgeSearch;
