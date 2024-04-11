import ProviderPendingRow from "./ProviderPendingRow";
import { Table, TableHeader } from "../../assets/wrappers/TableWrapper";
import Wrapper from "../../assets/wrappers/BadgeContainer";

const ProviderPendingTable = ({ pendingBadges }) => {
  const { data, status, response } = pendingBadges;

  if (response?.status === 404)
    return (
      <Wrapper>
        <h2>No Badges to display....</h2>
      </Wrapper>
    );
  return (
    <>
      <Table role="table">
        <TableHeader role="row" style={{ "--num-columns": 7 }}>
          <div>Badge Id</div>
          <div>Candidate Name</div>
          <div>Candidate id</div>
          <div>Approve. Entity</div>

          <div>issue date</div>
          <div>due date</div>
          <div>grade</div>
        </TableHeader>

        {data?.data?.map((pendingBadge) => (
          <ProviderPendingRow
            pendingBadge={pendingBadge}
            key={pendingBadge._id}
          />
        ))}
      </Table>
    </>
  );
};

export default ProviderPendingTable;
