import { toast } from "react-toastify";
import { useLoaderData } from "react-router-dom";
import { createContext, useContext } from "react";
import BadgesContainerWithoutLogin from "./BadgesContainerWithoutLogin";
import customFetch from "../../utils/customFetch";

export const loader = async ({ request, params }) => {
  const paramOpt = Object.fromEntries([
    ...new URL(request.url).searchParams.entries(),
  ]);

  try {
    const { data: candidatData } = await customFetch.get(
      `/candidate/getAllBadges/${params.candidateId}`,
      { paramOpt }
    );
    return { candidatData, searchValues: { ...paramOpt } };
  } catch (error) {
    toast.error(error.response?.data?.message);
    return error;
  }
};

const AllBadgesWithoutLoginContext = createContext();

const AllBadgesWithoutLogin = () => {
  const { candidatData, searchValues } = useLoaderData();
  return (
    <AllBadgesWithoutLoginContext.Provider
      value={{ candidatData, searchValues }}
    >
      <BadgesContainerWithoutLogin />
    </AllBadgesWithoutLoginContext.Provider>
  );
};

export const useAllBadgesWithoutLoginContext = () =>
  useContext(AllBadgesWithoutLoginContext);
export default AllBadgesWithoutLogin;
