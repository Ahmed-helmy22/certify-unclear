import {
  Table,
  TableHeader,
  TablContainer,
} from "../../assets/wrappers/TableWrapper";
import ExaminerPublishedBadgeHolderRow from "./ExaminerPublishedBadgeHolderRow";

const ExaminerPublishedBadgeHolderTable = ({
  examinerPublishedBadgeHolders,
}) => {
  const { data, status } = examinerPublishedBadgeHolders;

  return (
    <TablContainer>
      <Table role="table">
        <TableHeader role="row" style={{ "--num-columns": 7 }}>
          <div>Candidate Name</div>
          <div>Training Subject</div>
          <div>Training Centre</div>

          <div>Issue date</div>
          <div>due date</div>
          <div>degree</div>
          <div>status</div>
        </TableHeader>

        {data?.data?.map((examinerPublishedBadgeHolder) => (
          <ExaminerPublishedBadgeHolderRow
            examinerPublishedBadgeHolder={examinerPublishedBadgeHolder}
            key={examinerPublishedBadgeHolder._id}
          />
        ))}
      </Table>
    </TablContainer>
  );
};

export default ExaminerPublishedBadgeHolderTable;
