 import { TableHeader , Table } from '../../assets/wrappers/TableWrapper'
 
const BlankTable = () => {
 
   
  return (
    <>
      <Table role="table" >
        <TableHeader role="row" style={{ '--num-columns': 6 }}>
          <div>Candidate Name</div>
          <div>Candidate id</div>
          <div>DOB</div>
          <div>Examiner Name</div>
          <div>Action</div>
        </TableHeader>
        {/* {data?.data?.map((declineBadge) => (
          <BlankRow
            declineBadge={declineBadge}
            key={declineBadge._id}
          />
        ))} */}
      </Table>
    </>
  );
};

export default BlankTable;
