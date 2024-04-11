import { useLoaderData } from "react-router-dom";
import customFetch from "../../utils/customFetch";
import { toast } from "react-toastify";
import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import ExaminerPendingBadgeHolderTable from "../../components/table/ExaminerPendingBadgeHolderTable";
import { createContext, useContext } from "react";
import SearchExaminerPendingBadges from "./SearchExaminerPendingBadges";

export const loader = async ({ request }) => {
  const params = Object.fromEntries([
    ...new URL(request.url).searchParams.entries(),
  ]);
  const errors = { msg: "" };
  try {
    const { data: examinerPendingBadgeHolders } = await customFetch.get(
      "examiner/pendingCandidateBadges",{ params }
    
    );
    return { examinerPendingBadgeHolders, searchValues: { ...params } };
  } catch (error) {
    errors.msg = error?.response?.data?.message;
    toast.error('No pending badges for the current approving authority !!!!');
    return error;
  }
};

const ExaminerPendingBadgesContext = createContext();

const ExaminerPendingBadges = () => {
  const { examinerPendingBadgeHolders, searchValues } = useLoaderData();
  return (
    <ExaminerPendingBadgesContext.Provider
      value={{ examinerPendingBadgeHolders, searchValues }}
    >
      <Row type="horizontal">
        <Heading as="h2">Badges Holder</Heading>
      </Row>
      <Row>
        {/* <SearchExaminerPendingBadges /> */}
        <ExaminerPendingBadgeHolderTable />
      </Row>
    </ExaminerPendingBadgesContext.Provider>
  );
};

export const useExaminerPendingBadgesContext = () =>
  useContext(ExaminerPendingBadgesContext);

export default ExaminerPendingBadges;
