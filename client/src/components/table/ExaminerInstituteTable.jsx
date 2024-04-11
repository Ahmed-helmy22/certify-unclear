import { Table, TableHeader } from "../../assets/wrappers/TableWrapper";
import { useExaminerInstituteListContext } from "../../pages/Examiner/ExaminerInstituteList";
import ExaminerInstituteListRow from "./ExaminerInstituteListRow";

const ExaminerInstituteTable = () => {
  const { examinerInstituteList } = useExaminerInstituteListContext();

  if (!examinerInstituteList) {
    return (
      <div className="container">
        <h2>No Data to display....</h2>
      </div>
    );
  }

  return (
    <>
      <Table role="table">
        <TableHeader role="row" style={{ "--num-columns": 7 }}>
          <div>Badge title</div>
          <div>badge id</div>
          <div>Candidate Name</div>
          <div>due date</div>
          <div>degree</div>
          <div>status</div>
          <div>action</div>
        </TableHeader>

        {examinerInstituteList?.data?.map((examinerInstitute) => (
          <ExaminerInstituteListRow
            examinerInstitute={examinerInstitute}
            key={examinerInstitute._id}
          />
        ))}
      </Table>
    </>
  );
};

export default ExaminerInstituteTable;
