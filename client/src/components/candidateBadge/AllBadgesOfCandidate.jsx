import { toast } from "react-toastify";
import customFetch from "../../utils/customFetch";
import { useLoaderData } from "react-router-dom";
import { createContext, useContext } from "react";
 import BadgesCandidateContainer from "./BadgesCandidateContainer";
import SearchCandidateContainer from './SearchCandidateContainer';

export const loader = async ({request}) => {
  const params = Object.fromEntries([
    ...new URL(request.url).searchParams.entries()
  ])
  try {
    const { data: candidatData } = await customFetch.get("/candidate/getMyAllBadges" , {params} );
    return { candidatData , searchValues: {...params} }} 
    catch (error) {
    toast.error(error.response?.data?.message);
    return error;
  }
};

const AllCandidateBadgesContext = createContext();

const AllBadgesOfCandidate = () => {
  const { candidatData , searchValues } = useLoaderData();
   
    return (
      <AllCandidateBadgesContext.Provider value={{candidatData , searchValues} }>
        {/* <SearchCandidateContainer /> */}
        <BadgesCandidateContainer />
      </AllCandidateBadgesContext.Provider>
    );
  
};

export const useAllCandidateBadgesContext = () =>
  useContext(AllCandidateBadgesContext);
export default AllBadgesOfCandidate;
