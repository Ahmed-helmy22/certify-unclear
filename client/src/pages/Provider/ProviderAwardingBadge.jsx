import   { createContext, useContext, useState } from "react";
import Wrapper from "../../assets/wrappers/BadgeAwarding";
import awardingBadgeList from "../../utils/awardingBadgeList";
import {  Outlet, useLoaderData } from "react-router-dom";
import { toast } from "react-toastify";
import customFetch from "../../utils/customFetch";
 
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

const ProviderAwardingBadge = () => {
  const { data } = useLoaderData();
  const [activeLink, setActiveLink] = useState(false);
  const links = awardingBadgeList;

  const toggleLink = () => {
    setActiveLink(!activeLink);
  };
  return (
    <Wrapper>

      <CandidateDataToAwardingBadge.Provider value={{ data }}>
        <div className="content" >
          <Outlet />
        </div>

      </CandidateDataToAwardingBadge.Provider>
    </Wrapper>
  );
};

export const useCandidateDataToAWardingContext = () =>
  useContext(CandidateDataToAwardingBadge);

export default ProviderAwardingBadge;
