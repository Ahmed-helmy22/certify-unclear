import {
  Table,
  TableHeader,
  TablContainer,
} from "../../../assets/wrappers/TableWrapper";
import { useAdminExaminersInfoContext } from "../../../pages/Admin/AdminExaminersInfo";
import AdminExaminersInfoRow from "./AdminExaminersInfoRow";
import Wrapper from "../../../assets/wrappers/BadgeContainer";

import day from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
day.extend(advancedFormat);

const AdminExaminersInfoTabel = () => {
  const { allExaminersInfo } = useAdminExaminersInfoContext();

  if (!allExaminersInfo) {
    return (
      <Wrapper>
        <h2>No Approving Authority Found</h2>
      </Wrapper>
    );
  }
  return (
    <>
      <TablContainer>
        <Table role="table">
          <TableHeader role="row" style={{ "--num-columns": 7 }}>
            <div>Id</div>
            <div>Photo</div>  
            <div>Approve Entity.</div>
            <div>Num Candidate Badges</div>
            <div>Country</div>
            <div>Status</div>
            <div>Action</div>
          </TableHeader>
          {allExaminersInfo.data.data.map((examiner) => (
            <AdminExaminersInfoRow examiner={examiner} key={examiner._id} />
          ))}
        </Table>
      </TablContainer>
    </>
  );
};

export default AdminExaminersInfoTabel;
