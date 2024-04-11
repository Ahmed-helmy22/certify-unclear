import customFetch from "../../utils/customFetch";
import { toast } from "react-toastify";
import { redirect, useLoaderData } from "react-router-dom";
import { createContext, useContext } from "react";
import SearchAdminProviderInfo from "./SearchAdminProviderInfo";
import AdminProvidersInfoTable from "./AdminProvidersInfoTable";

export const loader = async ({ request }) => {
  const params = Object.fromEntries([
    ...new URL(request.url).searchParams.entries(),
  ]);
  try {
    const allProvidersInfo = await customFetch.get(
      "admin/getAllProvidersInfo",
      { params }
    );
    return { allProvidersInfo, searchValues: { ...params } };
  } catch (error) {
    const errors = { msg: "No data Founded" };
    toast.error(errors.msg);

    return error;
  }
};
const AdminProviderInfoContext = createContext();

const AdminProvidersInfo = () => {
  const { allProvidersInfo, searchValues } = useLoaderData();

  return (
    <>
      <h3 style={{ paddingBottom: "1rem" }}>Badge Issuer</h3>
      <AdminProviderInfoContext.Provider
        value={{ allProvidersInfo, searchValues }}
      >
        <SearchAdminProviderInfo />
        <AdminProvidersInfoTable />
      </AdminProviderInfoContext.Provider>
    </>
    // <>
    // <h3 style={{paddingBottom: '1rem'}}>Badge Issuers :</h3>
    // <TablContainer>
    // <Table role="table">
    //   <TableHeader role="row" style={{ "--num-columns": 6 }}>
    //     <div>id</div>
    //     <div>Institute Academy</div>
    //     <div>No. Badges</div>
    //     <div>Country</div>
    //     <div>Status</div>
    //     <div>Action</div>
    //   </TableHeader>
    //   {data
    //     .filter((provider) => (provider.isDeleted !== true)) // Filter out providers with isDelete set to true
    //     .map((provider) => (
    //       <AdminProvidersInfoRow provider={provider} key={provider._id} />
    //     ))}
    // </Table>
    // </TablContainer>
    // </>
  );
};
export const useAdminProviderInfoContext = () =>
  useContext(AdminProviderInfoContext);
export default AdminProvidersInfo;
