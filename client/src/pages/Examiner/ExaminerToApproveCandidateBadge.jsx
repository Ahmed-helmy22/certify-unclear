import { toast } from "react-toastify";
import customFetch from "../../utils/customFetch";
import { redirect } from "react-router-dom";

export const action = async ({ params }) => {
  try {
    await customFetch.get(
      `/examiner/approveCandidateBadge/${params.candidateBadgeId}`
    );
    toast.success("This badge is approved successfully");
  } catch (error) {
    toast.error(error?.response?.data?.message);
    return error;
  }
  return redirect("/dashboard/examiner/pending-badges");
};
