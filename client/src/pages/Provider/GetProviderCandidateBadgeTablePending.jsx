 import { TableHeader, Table } from "../../assets/wrappers/TableWrapper";
 import GetProviderCandidateBadgeRow from "./GetProviderCandidateBadgeRow";

const GetProviderCandidateBadgeTablePending = ({ data }) => {
  const pendingBadges = data.filter((badge) => badge.status === 'pending');

  return (
    <Table role="table">
      <TableHeader role="row" style={{ "--num-columns": 10 }}>
        <div>Id</div>
        <div>Image</div>
        <div>Badge Title</div>
        <div>Candidate Name</div>
        <div>Isseu Date</div>
        <div>Due Date</div>
        <div>Degree</div>
        <div>Examiner Name</div>
        <div>Examiner Id</div>
        <div>Action</div>
      </TableHeader>
      {pendingBadges?.map((badge) => (

        <GetProviderCandidateBadgeRow badge={badge} key={badge._id} />
      ))}
    </Table>
  );
};

export default GetProviderCandidateBadgeTablePending;
