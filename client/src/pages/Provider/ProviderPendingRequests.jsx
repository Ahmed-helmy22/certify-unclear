import customFetch from "../../utils/customFetch";
import { toast } from "react-toastify";
import { useLoaderData } from "react-router-dom";
import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import day from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
import utc from "dayjs/plugin/utc";
import ProviderPendingTable from "../../components/table/ProviderPendingTable";
import styled from "styled-components";
day.extend(advancedFormat);
day.extend(utc);

const TableContainer = styled.div`
  overflow-x: auto;
`;

export const loader = async () => {
  //
  try {
    const pendingBadges = await customFetch.get("provider/getPendingBadges");
    return pendingBadges;
  } catch (error) {
    toast.error(error?.response?.data?.message);
    return error;
  }
};

const ProviderPendingRequests = () => {
  const pendingBadges = useLoaderData();

  if (pendingBadges?.data?.data?.length === 0) {
    return (
      <div className="container">
        <h2>No Badges to display....</h2>
      </div>
    );
  }

  return (
    <TableContainer>
      <Row type="horizontal">
        <Heading as="h2" >Pending badges :</Heading>
        {/* <div>
          <div>Sort / Filter</div>
        </div> */}
      </Row>
      <Row>
        <ProviderPendingTable pendingBadges={pendingBadges} />
      </Row>
    </TableContainer>
  );
};

export default ProviderPendingRequests;
