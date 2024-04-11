import { createContext, useContext } from "react";
import customFetch from "../../utils/customFetch";
import { toast } from "react-toastify";
import { useLoaderData } from "react-router-dom";
 import AdminCandidateBadgesTable from "../../components/admin/AdminCandidateBadgesTable";
import SearchAdminCandidateBadges from "./SearchAdminCandidateBadges";

export const loader = async ({ request }) => {
  const params = Object.fromEntries([
    ...new URL(request.url).searchParams.entries(),
  ]);
 
  if (params.status == 'all' ){
    params.status = ''
  }
   try {
    const allCandidateBadges = await customFetch.get(
      "admin/getAllCandidateBadges",
      { params }
    );
    return { allCandidateBadges, searchValues: { ...params } };
  } catch (error) {
    toast.error(error?.response?.data?.message);
    return error;
  }
};

const AdminCandidateBadgesContext = createContext();

const AdminCandidateBadges = () => {
  const { allCandidateBadges, searchValues } = useLoaderData();

  return (
    <>
      <h4 style={{ paddingBottom: "1rem" }}>Badge Holders</h4>
      <AdminCandidateBadgesContext.Provider
        value={{ allCandidateBadges, searchValues }}
      >
        <SearchAdminCandidateBadges />
        <AdminCandidateBadgesTable />
      </AdminCandidateBadgesContext.Provider>
    </>
  );
};
export const useAdminCandidateBadgesContext = () =>
  useContext(AdminCandidateBadgesContext);
export default AdminCandidateBadges;
