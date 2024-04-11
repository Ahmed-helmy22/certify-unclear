import {
  Table,
  TableHeader,
  TablContainer,
} from "../../../assets/wrappers/TableWrapper";

import day from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
import { useAdminCandidatesInfoContext } from "../../../pages/Admin/AdminCandidatesInfo";
import AdminCandidatesInfoRow from "./AdminCandidatesInfoRow";
import Wrapper from "../../../assets/wrappers/BadgeContainer";

day.extend(advancedFormat);

const AdminCandidatesInfoTable = () => {
  const { allCandidatesInfo, searchValues } = useAdminCandidatesInfoContext();

  if (!allCandidatesInfo) {
    return (
      <Wrapper>
        <h2>No Examiner Found</h2>
      </Wrapper>
    );
  }
  return (
    <TablContainer>
      <Table role="table">
        <TableHeader role="row" style={{ "--num-columns": 6 }}>
          <div>id</div>
          <div>Image</div>
          <div>Name</div>
          <div>Num Candidate Badges</div>
          <div>Status</div>
          <div>Action</div>
        </TableHeader>
        {allCandidatesInfo?.data?.data?.map((candidate) => (
          <AdminCandidatesInfoRow
            candidate={candidate}
            key={candidate._id}
            searchValues={searchValues}
          />
        ))}
      </Table>
    </TablContainer>
  );
};

export default AdminCandidatesInfoTable;
