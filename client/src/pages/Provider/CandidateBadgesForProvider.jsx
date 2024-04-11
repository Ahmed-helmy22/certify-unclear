import { toast } from "react-toastify";
import customFetch from "../../utils/customFetch";
import Wrapper from "../../assets/wrappers/Badge";
import CandidateOneBadgeForProvider from "./CandidateOneBadgeForProvider";
import { Link, useLoaderData, useNavigate } from "react-router-dom";

export const loader = async ({ params }) => {
  try {
    // getAllBadges/:candidateId
    const { data: candidatBadgesData } = await customFetch.get(
      `/provider/getCanandidatesBadgesForProvider/${params.candidateId}`
    );
    return { candidatBadgesData };
  } catch (error) {
    toast.error(error.response?.data?.message);
    return error;
  }
};

const CandidateBadgesForProvider = () => {
  const { candidatBadgesData } = useLoaderData();
  const navigate = useNavigate();

  const handleBackClick = () => {
    // Navigate back to the previous page
    navigate(-1);
  };
  return (
    <>
    <div style={{display:'flex' , justifyContent:'end'}}>
    <Link className="btn closBtnExaminer" onClick={handleBackClick}>
        Back
      </Link>
    </div>
      
      <Wrapper>
        <Wrapper className="content">
          {candidatBadgesData?.data?.map((badges) => {
            return (
              <CandidateOneBadgeForProvider key={badges._id} badges={badges} />
            );
          })}
        </Wrapper>
      </Wrapper>
    </>
  );
};

export default CandidateBadgesForProvider;
