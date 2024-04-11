import customFetch from '../../utils/customFetch';
import { toast } from 'react-toastify';
import { useLoaderData } from 'react-router-dom';
import Row from '../../ui/Row';
import Heading from '../../ui/Heading';
import ProviderDeclineTable from '../../components/table/ProviderDeclineTable';

export const loader = async () => {
  try {
    const declinedBadges = await customFetch.get(
      "provider/getDeclinedBadges"
    );
    return declinedBadges;
  } catch (error) {
    toast.error(error?.response?.data?.message);
    return error;
  }
};

const ProviderDeclinedBadge = () => {

  const declinedBadges = useLoaderData();

  return (
     <>
      <Row type="horizontal">
        <Heading as="h2">Badges Holder</Heading>
      </Row>
      <Row>
        <ProviderDeclineTable declinedBadges={declinedBadges} />
      </Row>
    </>
  )
}

export default ProviderDeclinedBadge