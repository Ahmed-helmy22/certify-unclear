 import styled from "styled-components";
import {
  Form,
  Link,
  redirect,
  useNavigation,
  useParams,
} from "react-router-dom";
 import Heading from "../../../ui/Heading";
  

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



const AdminCandidatesSuspendModal = ({id ,setIsCandidatesModalSuspendActive, isCandidatesModalSuspendActive , suspendCandidatesModalWork , name}) => {
  
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  const urlParams = useParams();

  if (isSubmitting) {
    setIsCandidatesModalSuspendActive(!isCandidatesModalSuspendActive);
    return redirect("/dashboard/admin/candidates/");
  }
  return (
    <ModalDecline>
    <ModelContent>
      <Heading as="h2">Suspend this account</Heading>
      <Form
        method="post"
        encType="multipart/form-data"
        action={`../candidates/candidate-suspend/${id}`}
      >
        <ModalBody>
          <div style={{display:'flex' , alignItems: 'center' , gap:'2rem' , justifyContent: 'center'}}>
          <h4>Name : </h4> <p>{name}</p>
          </div>
        
          <BtnActionModal>
            <Link
              type="button"
              className="btn btn-block"
              to="/dashboard/admin/candidates"
              onClick={() => suspendCandidatesModalWork(setIsCandidatesModalSuspendActive(!isCandidatesModalSuspendActive))}
            >
              cancel
            </Link>

            <button type="submit" className="btn btn-block">
              {isSubmitting ? "subimtting..." : "confirm"}
            </button>
          </BtnActionModal>
        </ModalBody>
      </Form>
    </ModelContent>
  </ModalDecline>
  )
}

export default AdminCandidatesSuspendModal