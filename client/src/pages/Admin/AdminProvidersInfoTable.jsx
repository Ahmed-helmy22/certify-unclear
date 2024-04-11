import { TableHeader, Table , TablContainer } from "../../assets/wrappers/TableWrapper";
import Wrapper from "../../assets/wrappers/BadgeContainer";
   import AdminProvidersInfoRow from "../../components/admin/AdminProvidersInfoRow";
 import { useAdminProviderInfoContext } from "./AdminProvidersInfo";

 

const AdminProvidersInfoTable = () => {
  const { allProvidersInfo } = useAdminProviderInfoContext();
  console.log(allProvidersInfo);
  if (!allProvidersInfo) {
    return (
      <Wrapper>
        <h2>No Badge Issuer Found</h2>
      </Wrapper>
    );
  }
  return (
    <>
   
    <TablContainer>
    <Table role="table">
      <TableHeader role="row" style={{ "--num-columns": 6 }}>
        <div>id</div>
        <div>Institute Academy</div>
        <div>No. Badges</div>
        <div>Country</div>
        <div>Status</div>
        <div>Action</div>
      </TableHeader>
      {/* {allProvidersInfo.data.data
        .filter((provider) => (provider.isDeleted !== true)) // Filter out providers with isDelete set to true
        .map((provider) => (
          <AdminProvidersInfoRow provider={provider} key={provider._id} />
        ))} */}
        {allProvidersInfo.data.data
         .map((provider) => (
          <AdminProvidersInfoRow provider={provider} key={provider._id} />
        ))}
    </Table>
    </TablContainer>
    </>

  );
};

export default AdminProvidersInfoTable;
