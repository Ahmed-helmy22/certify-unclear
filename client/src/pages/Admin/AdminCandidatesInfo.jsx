 import customFetch from "../../utils/customFetch";
import { toast } from "react-toastify";
import { useLoaderData } from "react-router-dom";
  import SearchAdminCandidatesInfo from "./SearchAdminCandidatesInfo";
import { createContext, useContext } from "react";
import AdminCandidatesInfoTable from "../../components/admin/adminCandidate/AdminCandidatesInfoTable";

export const loader = async ({ request }) => {
  const params = Object.fromEntries([
    ...new URL(request.url).searchParams.entries(),
  ]);
  if (params.status == 'all' ){
    params.status = ''
  }
  try {
    const allCandidatesInfo = await customFetch.get(
      "admin/getAllCandidatesInfo",
      { params }
    );
    return { allCandidatesInfo, searchValues: { ...params } };
  } catch (error) {
    toast.error(error?.response?.data?.message);
    return error;
  }
};

const AdminCandidatesInfoContext = createContext();

const AdminCandidatesInfo = () => {
  const { allCandidatesInfo, searchValues } = useLoaderData();

  return (
    <>
      <h3 style={{ paddingBottom: "1rem" }}>Candidates Information</h3>

      <AdminCandidatesInfoContext.Provider
        value={{ allCandidatesInfo, searchValues }}
      >
        <SearchAdminCandidatesInfo />
        <AdminCandidatesInfoTable/>
      </AdminCandidatesInfoContext.Provider>
    </>
  );
};

export const useAdminCandidatesInfoContext = () =>
  useContext(AdminCandidatesInfoContext);
export default AdminCandidatesInfo;
