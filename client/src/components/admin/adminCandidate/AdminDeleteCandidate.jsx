import { toast } from "react-toastify";
import customFetch from "../../../utils/customFetch";
import { redirect } from "react-router-dom";


export const action = async ({ params }) => { 
    try {
     await customFetch.delete(
       `/admin/deleteCandidate/${params.userId}`);
     toast.success("delete account Successful");
     return redirect("/dashboard/admin/candidates");
   } catch (error) {
      toast.error(error?.response?.data?.message);
     return error;
   }
  };