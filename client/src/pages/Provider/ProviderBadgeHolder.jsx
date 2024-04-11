import { toast } from "react-toastify";
import customFetch from "../../utils/customFetch";
import { redirect, useLoaderData } from "react-router-dom";
import Wrapper from "../../assets/wrappers/BadgeContainer";

import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import BadgeHolderTable from "../../components/table/BadgeHolderTable";

export const loader = async () => {
  const errors = { msg: "" };
  try {
    const holderBadges = await customFetch.get(
      "provider/getCanandidatesBadges"
    );
    return holderBadges;
  } catch (error) {
    errors.msg = "No Data of Badge Holders !!!!";
    toast.error(errors.msg);
    return redirect("/dashboard/academy/holder-badges");
  }
};

const ProviderBadgeHolder = () => {
  const holderBadges = useLoaderData();

  if (!holderBadges) {
    return <h2>No Profile to display....</h2>;
  }
  return (
    <>
      <Row type="horizontal">
        <Heading as="h2">Badges Holder</Heading>
      </Row>
      <Row>
        <BadgeHolderTable holderBadges={holderBadges.data.allBadgeHolders} />
      </Row>
    </>
  );
};

export default ProviderBadgeHolder;
