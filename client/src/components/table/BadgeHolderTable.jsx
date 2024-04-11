import { Table , TableHeader } from '../../assets/wrappers/TableWrapper'
import BadgeHolderRow from "./BadgeHolderRow";
import Wrapper from "../../assets/wrappers/BadgeContainer";
 
const BadgeHolderTable = ({ holderBadges }) => {
  const   data  = holderBadges;
   
   if (!data) return (
    <Wrapper>
      <h2>No Badges to display....</h2>
    </Wrapper>
  );
  return (
    <>
      <Table role="table">
        <TableHeader role="row" style={{ '--num-columns': 6 }}>
          <div>Name</div>
          <div>Candidate Id</div>
           <div>DOB</div>
          <div>Pending</div>
          <div>Published</div>
          <div>View</div>
        </TableHeader>
        {/* BadgeHolderRow */}
        {data?.map((badgeHolder) => (
          <BadgeHolderRow
            badgeHolder={badgeHolder}
            key={badgeHolder.candidateId}
          />
        ))}
      </Table>
    </>
  );
};

export default BadgeHolderTable;
