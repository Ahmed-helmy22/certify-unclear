import { TableHeader, Table , TablContainer} from "../../assets/wrappers/TableWrapper";
import { useAdminCandidateBadgesContext } from "../../pages/Admin/AdminCandidateBadges";
import AdminCandidateBadgesRow from "./AdminCandidateBadgesRow";
import Wrapper from "../../assets/wrappers/BadgeContainer";
 
import day from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
day.extend(advancedFormat);

const AdminCandidateBadgesTable = () => {
  const {allCandidateBadges} = useAdminCandidateBadgesContext()
    if ( !allCandidateBadges ) {
    return (
      <Wrapper>
        <h2>No Badge Found</h2>
      </Wrapper>
    );
  }

  // const due = day(candidateBadge.dueDate).format("MMM Do, YYYY");
   return (
    <TablContainer>
    <Table role="table">
    <TableHeader role="row" style={{ "--num-columns": 9 }}>
      <div>badge Title</div>
      <div>candidate name</div>
      <div>Issue date</div>
      <div>Institute Acadmey</div>
      <div>Approve Entity</div>
      <div>grade</div>
      <div>note</div>
      <div>status</div>
      <div>view</div>

    </TableHeader>
    {allCandidateBadges?.data?.data?.map((candidateBadge) => (
       <AdminCandidateBadgesRow
        candidateBadge={candidateBadge}
        key={candidateBadge._id}
      />
    ))}
    
  </Table>
  </TablContainer>
  );
};

export default AdminCandidateBadgesTable;
