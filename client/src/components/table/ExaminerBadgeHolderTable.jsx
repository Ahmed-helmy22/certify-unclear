import ExaminerBadgeHolderRow from "./ExaminerBadgeHolderRow";
import { Table, TableHeader , TablContainer } from "../../assets/wrappers/TableWrapper";
import { useExaminerBadgeHolderContext } from "../../pages/Examiner/ExaminerBadgeHolder";

const ExaminerBadgeHolderTable = () => {
  const { examinerBadgeHolders } = useExaminerBadgeHolderContext();
   if (!examinerBadgeHolders) {
    return (
      <div className="container">
        <h2>No Data to display....</h2>
      </div>
    );
  }

  return (
    <TablContainer>
      <Table role="table">
        <TableHeader role="row" style={{ "--num-columns": 8 }}>
          <div>Training Subject</div>
          <div>Training Center</div>
          <div>Candidate Name</div>
          <div>Issue date</div>
          <div>due date</div>
          <div>degree</div>
          <div>status</div>
          <div>View</div>
        </TableHeader>

        {examinerBadgeHolders?.data?.map((examinerBadgeHolder) => (
          <ExaminerBadgeHolderRow
            examinerBadgeHolder={examinerBadgeHolder}
            key={examinerBadgeHolder._id}
          />
        ))}
      </Table>
    </TablContainer>
  );
};

export default ExaminerBadgeHolderTable;
