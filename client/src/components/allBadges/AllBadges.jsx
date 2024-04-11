import { toast } from "react-toastify";
import customFetch from "../../utils/customFetch";
import BadgesContainer from "./BadgesContainer";
import SearchContainer from "./SearchContainer";
import {useLoaderData } from "react-router-dom";
import { createContext, useContext } from "react";

export const loader = async ({ request }) => {
  const params = Object.fromEntries([
    ...new URL(request.url).searchParams.entries(),
  ]);
   try {
    const { data } = await customFetch.get('/badge/getMyBadges' ,  { params });
    return { data, searchValues: { ...params } };
  } catch (error) {
    toast.error(error.response?.data?.message)
    return error;
  }

}

const AllBadgesContext = createContext();

const AllBadges = () => {
  const {data , searchValues}  = useLoaderData()
  console.log(data);
   return (
    <AllBadgesContext.Provider value={{data ,searchValues}}>
      {/* <SearchContainer /> */}
      <BadgesContainer />
    </AllBadgesContext.Provider>
  );
};

export const useAllBadgesContext = () => useContext(AllBadgesContext);
export default AllBadges;