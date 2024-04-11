 
import styled from "styled-components";
import Heading from "../ui/Heading";
import {
  Form,
  Link,
   useLoaderData,
  } from "react-router-dom";
 import { toast } from "react-toastify";
import customFetch from "../utils/customFetch";
import { useDashboardContext } from "../pages/DashboardLayout";

const ModalDecline = styled.div`
  background-color: var(--popupBackground);
  width: 100%;
  height: 100dvh;
  z-index: 999;
  right: 0;
  left: 0;
  top: 0;
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  justify-items: center;
`;

const ModelContent = styled.div`
  width: 500px;
  height: 250px;
  background-color: var(--background-color);
  border-radius: 1rem;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const ModalBody = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;

  textarea {
    border-radius: 1rem;
    padding: 1rem;
    font-size: 1rem;
  }
`;

const BtnActionModal = styled.div`
  display: flex;
  gap: 4rem;
  justify-content: center;
`;

export const loader = async ({params}) => {
 
  try {
   const { data } = await customFetch.get(`/candidate/getsingleCandidateBadge/${params.candidateBadgeId}`);
    return  data ;
 } catch (error) {
   toast.error(error.response?.data?.message)
   return error;
 }

}


const ViewBadgeModal = ({ modalWork, setIsModalActive, isModalActive }) => {
  const { user } = useDashboardContext();
  const result = useLoaderData();

  // Check if data is available before rendering
  if (!result || !result.candidatData || !result.candidatData.data) {
    return null; // or loading indicator, error message, etc.
  }

  const { data } = result.candidatData;
  const badge = data.badges[0]?.badge[0];
  
  return (
    <ModalDecline>
      <ModelContent>
        <Heading as="h2">View Bagde to candidate</Heading>
        <Form>
          <ModalBody>
          <p>Badge Details:</p>
            {badge && (
              <>
                <p>Title: {badge.title}</p>
                <p>Department: {badge.department}</p>
                {/* Add other badge details you want to display */}
                <img
                  src={`${badge.badgePhoto}`}
                  alt={badge.title}
                  style={{ maxWidth: '100%', maxHeight: '200px' }}
                />
              </>
            )}
             {user.role === "candidate" ? (
              <BtnActionModal>
                <Link
                  type="button"
                  className="btn btn-block"
                  to="/dashboard/candidate/all-badges"
                  onClick={() => modalWork(setIsModalActive(!isModalActive))}
                >
                  close
                </Link>
              </BtnActionModal>
            ) : (
              ""
            )}
          </ModalBody>
        </Form>
      </ModelContent>
    </ModalDecline>
  );
};

export default ViewBadgeModal;
