import { Link, useLoaderData } from "react-router-dom";
import customFetch from "../../utils/customFetch";
import { toast } from "react-toastify";
import Wrapper from "../../assets/wrappers/Badge";
import ExternalBadge from "./ExternalBadge";

export const loader = async () => {
  try {
    const { data } = await customFetch.get("/externalBadge/allWebsites");
    return { data };
  } catch (error) {
    toast.error(error.response?.data?.message);
    return error;
  }
};

const AllExternalCertificates = () => {
  const { data } = useLoaderData();
   if (!data) {
    return (
      <div className="container">
        <h2>No Data to display....</h2>
      </div>
    );
  }
  return (
    <Wrapper>
      <div
        className=""
        style={{
          display: "flex",
          justifyContent: "end",
          paddingBottom: "1rem",
        }}
      >
        <Link to="add-new-external-certificate" className="btn">
          Add New Certificate
        </Link>
      </div>
      <Wrapper>
        <div>
          <h3 className="heading"> External Badges </h3>
        </div>
        <hr />

        <Wrapper className="content">
          {data?.externalWebsites?.map((badge, badgeIndex) => (
            <ExternalBadge key={badgeIndex} badge={badge} />
          ))}
        </Wrapper>
      </Wrapper>
    </Wrapper>
  );
};

export default AllExternalCertificates;
