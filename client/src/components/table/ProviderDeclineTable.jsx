import ProviderDeclineRow from "./ProviderDeclineRow";
import { TableHeader , Table } from '../../assets/wrappers/TableWrapper'
import Wrapper from "../../assets/wrappers/BadgeContainer";

const ProviderDeclineTable = ({ declinedBadges }) => {
  const { data, status ,response} = declinedBadges;

  if (response?.status === 404) return (
    <Wrapper>
      <h2>No Badges to display....</h2>
    </Wrapper>
  );
  return (
    <>
      <Table role="table" >
        <TableHeader role="row" style={{ '--num-columns': 5 }}>
          <div>Candidate Name</div>
          <div>Candidate id</div>
          <div>DOB</div>
          <div>Approv. Entity</div>
          <div>Action</div>
        </TableHeader>
        {data?.data?.map((declineBadge) => (
          <ProviderDeclineRow
            declineBadge={declineBadge}
            key={declineBadge._id}
          />
        ))}
      </Table>
    </>
  );
};

export default ProviderDeclineTable;
