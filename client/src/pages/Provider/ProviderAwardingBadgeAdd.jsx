import { Link, Outlet, useLoaderData } from "react-router-dom";
import customFetch from "../../utils/customFetch";
import { toast } from "react-toastify";
import { createContext, useContext } from "react";

export const loader = async ({ params }) => {

  try {
    const { data } = await customFetch.get(
      `/candidate/getAllBadges/${params.candidateId}`
    );
      
     return data;
  } catch (error) {
    toast.error(error?.response?.data?.message);
    return error;
  }
};

const CandidateDataToAwardingBadge = createContext();

const ProviderAwardingBadgeAdd = () => {
  const { data  } = useLoaderData();
   return (
    <CandidateDataToAwardingBadge.Provider value={{ data }}>
      <div className="content">
        <div className="action-btn" style={{ padding: "1rem" }}>
          <div style={{ display: "flex", gap: "1rem" }}>
            <Link className="btn prev" to="">
              profile
            </Link>
            <Link to="all-badges" className="btn ">
              check Badges
            </Link>
            <Link to="awarding-new-badge" className="btn next">
              awarding badge
            </Link>
          </div>
        </div>
        <Outlet />
      </div>
    </CandidateDataToAwardingBadge.Provider>
  );
};

export const useCandidateDataToAWardingContext = () =>
  useContext(CandidateDataToAwardingBadge);
export default ProviderAwardingBadgeAdd;
