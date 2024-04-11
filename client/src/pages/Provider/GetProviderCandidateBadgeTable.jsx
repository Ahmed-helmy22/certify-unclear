 import { TableHeader, Table } from "../../assets/wrappers/TableWrapper";
 import GetProviderCandidateBadgeRow from "./GetProviderCandidateBadgeRow";

const GetProviderCandidateBadgeTable = ({ data }) => {
  
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
      {data?.map((badge) => (
        <GetProviderCandidateBadgeRow badge={badge} key={badge._id} />
      ))}
    </Table>
  );
};

export default GetProviderCandidateBadgeTable;
