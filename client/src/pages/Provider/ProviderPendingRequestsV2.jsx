 import customFetch from "../../utils/customFetch";
import { toast } from "react-toastify";
import { useLoaderData } from "react-router-dom";
import { ReactTanStackTable } from "../../components";
import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
 import day from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
import utc from "dayjs/plugin/utc";
day.extend(advancedFormat);
day.extend(utc);

export const loader = async () => {
  // getCanandidatesBadges
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
  // candidateCountry  candidateId dueDate examinerFirstName examinerId   examinerMiddleName grade issueDate
  console.log(pendingBadges);
  /**@type import('@tanstack/react-table').columnDef<any>*/
  const columns = [
    { header: "ID", accessorKey: "_id" },
    {
      header: "First Name",
      accessorKey: "candidateFirstName",
     
    },
    {
      header: "candidate Id",
      accessorKey: "candidateId",
     
    },
    {
      header: "candidateDateOfBirth",
      accessorKey: "candidateDateOfBirth",
    
    },

    {
      header: "dueDate",
      accessorKey: "dueDate",
     
    },
    {
      header: "grade",
      accessorKey: "grade",
     
    },
    {
      header: "examinerFirstName",
      accessorKey: "examinerFirstName",
    
    },
    {
      header: "examinerId",
      accessorKey: "examinerId",
      
    },
  ];
  if (pendingBadges?.data?.data?.length === 0) {
    return (
      <div className="container">
        <h2>No Badges to display....</h2>
      </div>
    );
  }

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Badges Holder</Heading>
      </Row>
      <Row>
        {/* <ReactDataTable/> */}
        <ReactTanStackTable
          data={pendingBadges?.data?.data}
          columns={columns}
        />
      </Row>
    </>
  );
};

export default ProviderPendingRequests;
