import {
  Table,
  TableHeader,
  TablContainer,
} from "../../assets/wrappers/TableWrapper";
import { useExaminerPendingBadgesContext } from "../../pages/Examiner/ExaminerPendingBadges";
import ExaminerPendingBadgeHolderRow from "./ExaminerPendingBadgeHolderRow";

const examinerPendingBadgeHolders = () => {
  const { examinerPendingBadgeHolders } = useExaminerPendingBadgesContext();

  if (!examinerPendingBadgeHolders) {
    return (
      <div className="container">
        <h2>No Data to display....</h2>
      </div>
    );
  }

  return (
    <TablContainer>
      <Table role="table">
        <TableHeader role="row" style={{ "--num-columns":7}}>
          <div>Candidate Name</div>
          <div>Training Center</div>
          <div>Training Subject</div>
          <div>Issue Date</div>
          <div>degree</div>
          <div>status</div>
          <div>action</div>
        </TableHeader>

        {examinerPendingBadgeHolders?.data?.map(
          (examinerPendingBadgeHolder) => (
            <ExaminerPendingBadgeHolderRow
              examinerPendingBadgeHolder={examinerPendingBadgeHolder}
              key={examinerPendingBadgeHolder._id}
            />
          )
        )}
      </Table>
    </TablContainer>
  );
};

export default examinerPendingBadgeHolders;
