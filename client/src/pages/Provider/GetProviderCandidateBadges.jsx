import Heading from "../../ui/Heading";
import Row from "../../ui/Row";
import GetProviderCandidateBadgeTable from "./GetProviderCandidateBadgeTable";
import { useProviderCandidateBadgesContext } from "./ProviderGetAllCandidateBadges";

const GetProviderCandidateBadges = () => {

  const  holderBadges   = useProviderCandidateBadgesContext()
   return (
    <>
      <Row type="horizontal">
        <Heading as="h3">Badges Holder</Heading>
      </Row>
      <Row><GetProviderCandidateBadgeTable data={holderBadges?.data?.data}/></Row>
    </>
  );
};

export default GetProviderCandidateBadges;
