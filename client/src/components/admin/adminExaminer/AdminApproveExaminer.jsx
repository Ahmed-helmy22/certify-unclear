import { toast } from "react-toastify";
import customFetch from "../../../utils/customFetch";
import { redirect } from "react-router-dom";

export const action = async ({ params }) => { 
    try {
      await customFetch.patch(
        `/admin/approveExaminer/${params.userId}`);
      toast.success("approved account Successful");
      return redirect("/dashboard/admin/examiner");
    } catch (error) {
       toast.error(error?.response?.data?.message);
      return error;
    }
  };


  