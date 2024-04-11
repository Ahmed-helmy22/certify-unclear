 import {
  ProfileWrapper,
  Photo,
  Name,
  Details,
  DetailItem,
  Profession,
} from "../../assets/wrappers/CandidateProfile";
 import day from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
import { toast } from "react-toastify";
import customFetch from "../../utils/customFetch";
import { Link, redirect, useLoaderData, useNavigate } from "react-router-dom";
   day.extend(advancedFormat);


   export const loader = async ({ params }) => {
    try {
      const { data } = await customFetch.get(
        `/admin/viewCandidate/${params.userId}`
      );
        console.log(data);
      return data;
    } catch (error) {
      toast.error(error?.response?.data?.message);
      redirect("dashboard/admin/candidates");
      return error;
    }
  };
const AdminViewExaminerProfile = () => {
  const {examiner} = useLoaderData();
 
   const navigate = useNavigate();
    const date = day(examiner?.DOBirth).format("MMM Do, YYYY");

    const handleBackClick = () => {
      // Navigate back to the previous page
      navigate(-1);
    }
  return (
    <>
      <ProfileWrapper>
        <Photo>
        <div className="closeExaminerbtn">
        <Link className="btn closBtnExaminer" onClick={handleBackClick}>
          Back
        </Link>
      </div>
          <img src={`/examiner/${examiner?.examinerProfilePhoto}`} alt="Profile" />
          <div className="editImageIcon">
          
          <p className="editImageText">edit image</p>
        </div>
        </Photo>
        <Name>
          {examiner?.firstName} {examiner?.familyName}
        </Name>
        <Details>
          <DetailItem>
            <strong>Birth Date:</strong> {date}
          </DetailItem>
          <DetailItem>
            <strong>Country:</strong> {examiner?.country}
          </DetailItem>
          <DetailItem>
            <strong>City:</strong> {examiner.city}
          </DetailItem>
          <DetailItem>
            <strong>Email:</strong> {examiner.email}
          </DetailItem>
          <DetailItem>
            <strong>Phone:</strong> {examiner.phoneNumber}
          </DetailItem>
          <DetailItem>
            <strong>Address:</strong> {examiner.address}
          </DetailItem>
        </Details>
        <Profession>
          <div>Profession:</div> {examiner.qualification}
        </Profession>
        
       
      </ProfileWrapper>
    </>
  );
};

export default AdminViewExaminerProfile;
