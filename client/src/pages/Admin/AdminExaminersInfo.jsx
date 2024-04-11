 import customFetch from "../../utils/customFetch";
import { toast } from "react-toastify";
import { redirect, useLoaderData } from "react-router-dom";
 import AdminExaminersInfoTabel from "../../components/admin/adminExaminer/AdminExaminersInfoTabel";
import { createContext, useContext } from "react";
import SearchAdminExaminersInfo from "./SearchAdminExaminersInfo";
 
export const loader = async ({ request }) => {
  const params = Object.fromEntries([
    ...new URL(request.url).searchParams.entries(),
  ]);
  if (params.status == 'all' ){
    params.status = ''
  }
   try {
    const allExaminersInfo = await customFetch.get(
      "admin/getAllExaminersInfo",
      { params }
    );
    return { allExaminersInfo, searchValues: { ...params } };
  } catch (error) {
    const errors = { msg: "No data Founded" };
    toast.error(errors.msg);
    return error;
  }
};

const AdminExaminersInfoContext = createContext();

const AdminExaminersInfo = () => {
  const { allExaminersInfo, searchValues } = useLoaderData();

  return (
    <>
      <h3 style={{ paddingBottom: "1rem" }}>Aprroving Authority</h3>
      <AdminExaminersInfoContext.Provider
        value={{ allExaminersInfo, searchValues }}
      >
        <SearchAdminExaminersInfo />
        <AdminExaminersInfoTabel />
      </AdminExaminersInfoContext.Provider>
    </>
  );
};
export const useAdminExaminersInfoContext = () =>
  useContext(AdminExaminersInfoContext);

export default AdminExaminersInfo;
