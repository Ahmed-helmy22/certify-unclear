import { toast } from "react-toastify";
import customFetch from "../../utils/customFetch";
import { Outlet, useLoaderData } from "react-router-dom";
import Wrapper from "../../assets/wrappers/BadgeContainer";

 
import { createContext, useContext } from "react";

export const loader = async () => {
  try {
    const holderBadges = await customFetch.get(
      "provider/getAllCandidateBadges"
    );  
    return holderBadges;
  } catch (error) {
    toast.error(error?.response?.data?.message);
    return error;
  }
}

const GetProviderCandidateBadgesContext = createContext();

const ProviderGetAllCandidateBadges = () => {
  const holderBadges = useLoaderData();
   if (holderBadges?.data?.length === 0 ) {
    return (
      <Wrapper>
        <h2>No Badges to display....</h2>
      </Wrapper>
    );
  }

  return (
    <GetProviderCandidateBadgesContext.Provider value={holderBadges}>
        <Outlet />       
    </GetProviderCandidateBadgesContext.Provider>
  );

};
export const useProviderCandidateBadgesContext = () => useContext(GetProviderCandidateBadgesContext);
export default ProviderGetAllCandidateBadges