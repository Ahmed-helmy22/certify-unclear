import { useLoaderData } from 'react-router-dom';
import customFetch from '../../utils/customFetch';
import { toast } from 'react-toastify';
import Row from '../../ui/Row';
import Heading from '../../ui/Heading';
import ExaminerPublishedBadgeHolderTable from '../../components/table/ExaminerPublishedBadgeHolderTable';


export const loader = async () => {
  try {
    const examinerPublishedBadgeHolders = await customFetch.get(
      "examiner/publishedCandidateBadges"
    );
    return examinerPublishedBadgeHolders;
  } catch (error) {
    toast.error(error?.response?.data?.message);
    return error;
  }
};

const ExaminerPublishedBadges = () => {
  const examinerPublishedBadgeHolders = useLoaderData();

  if (examinerPublishedBadgeHolders?.response?.status === 404) {
    return (
      <div className="container">
        <h2>No Badges to display....</h2>
      </div>
    );
  }
  return (
    <>
    <Row type="horizontal">
      <Heading as="h2">Badges Holder</Heading>
    </Row>
    <Row>
      <ExaminerPublishedBadgeHolderTable
        examinerPublishedBadgeHolders={examinerPublishedBadgeHolders}
      />
    </Row>
  </>
  )
}

export default ExaminerPublishedBadges