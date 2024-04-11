import { createContext, useContext } from "react";
import customFetch from "../../utils/customFetch";
import { toast } from "react-toastify";
import { useLoaderData } from "react-router-dom";
import ExaminerBadgeHolderTable from "../../components/table/ExaminerBadgeHolderTable";
import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import SearchExaminerBadgeHolder from "./SearchExaminerBadgeHolder";

export const loader = async ({ request }) => {
  const params = Object.fromEntries([
    ...new URL(request.url).searchParams.entries(),
  ]);
   
  try {
    const { data: examinerBadgeHolders } = await customFetch.get(
      "examiner/candidateBadges",
      { params }
    );
    return { examinerBadgeHolders, searchValues: { ...params } };
  } catch (error) {
    toast.error(error?.response?.data?.message);
    return error;
  }
};

const ExaminerBadgeHolderContext = createContext();

const ExaminerBadgeHolder = () => {
  const { examinerBadgeHolders, searchValues } = useLoaderData();

  return (
    <ExaminerBadgeHolderContext.Provider
      value={{ examinerBadgeHolders, searchValues }}
    >
      <Row type="horizontal">
        <Heading as="h2">Badges Holder</Heading>
      </Row>
      <SearchExaminerBadgeHolder />
      <Row>
        <ExaminerBadgeHolderTable />
      </Row>
    </ExaminerBadgeHolderContext.Provider>
  );
};

export const useExaminerBadgeHolderContext = () =>
  useContext(ExaminerBadgeHolderContext);
export default ExaminerBadgeHolder;
