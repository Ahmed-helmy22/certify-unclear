import { createContext, useContext } from "react";
import { toast } from "react-toastify";
import customFetch from "../../utils/customFetch";
import Heading from "../../ui/Heading";
import { Row } from "react-bootstrap";
import { useLoaderData } from "react-router-dom";
import ExaminerInstituteTable from "../../components/table/ExaminerInstituteTable";
import SearchExaminerInstituteList from "./SearchExaminerInstituteList";

export const loader = async ({ request }) => {
  const params = Object.fromEntries([
    ...new URL(request.url).searchParams.entries(),
  ]);
  try {
    const { data: examinerInstituteList } = await customFetch.get(
      "examiner/pendingCandidateBadges",
      { params }
    );
    return { examinerInstituteList, searchValues: { ...params } };
  } catch (error) {
    toast.error(error?.response?.data?.message);
    return error;
  }
};

const ExaminerInstituteListContext = createContext();
const ExaminerInstituteList = () => {
  const { examinerInstituteList, searchValues } = useLoaderData();

  return (
    <ExaminerInstituteListContext.Provider
      value={{ examinerInstituteList, searchValues }}
    >
      <Row type="horizontal">
        <Heading as="h2">Badges Holder</Heading>
      </Row>
      <Row>
        <SearchExaminerInstituteList />
        <ExaminerInstituteTable />
      </Row>
    </ExaminerInstituteListContext.Provider>
  );
};

export const useExaminerInstituteListContext = () =>
  useContext(ExaminerInstituteListContext);

export default ExaminerInstituteList;
