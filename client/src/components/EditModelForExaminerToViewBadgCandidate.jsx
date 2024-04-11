import { useState } from "react";
import styled from "styled-components";
import Heading from "../ui/Heading";
import {
  Form,
  Link,
  redirect,
  useLoaderData,
  useNavigation,
} from "react-router-dom";
import customFetch from "../utils/customFetch";
import { toast } from "react-toastify";

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
  height: 500px;
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
const StyleCrtificate = styled.div`
  background: var(--background-secondary-color);
  border-radius: var(--border-radius);
  padding: 2rem;
  text-align: center;
  border: 2px solid var(--text-color); /* Add border styling here */
  outline: 10px double;

  .header {
    display: flex;
    justify-content: space-around;
    font-family: "Courier New", Courier, monospace;
    img {
      width: 150px;
      height: 150px;
    }
  }
  .content {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    font-family: "Courier New", Courier, monospace;
    .contentDate {
      display: flex;
      justify-content: space-between;
    }
    .sector {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 2rem;
    }
    .providerName {
      font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;
    }
    .candidateName {
      font-family: "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS",
        sans-serif;
    }
  }
`;

export const loader = async ({ params }) => {
  console.log(params);
  try {
    const { res } = await customFetch.get(
      `/examiner/viewCandidateBadge/${params.id}`
    );
    return res;
  } catch (error) {
    toast.error(error.response?.data?.message);
    redirect("/dashboard/examiner/pending-badges");
    return error;
  }
};

const EditModelForExaminerToViewBadgCandidate = ({
  id,
  editModalWork,
  setIsEditModalActive,
  isEditModalActive,
}) => {
  const { res } = useLoaderData();
  const [disableButton, setDisableButton] = useState(false);

  const disableAction = (e) => {
    if (e.target.value.length > 0) {
      setDisableButton(true);
    } else {
      setDisableButton(false);
    }
  };

  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  if (isSubmitting) {
    setIsEditModalActive(!isEditModalActive);
    return redirect("/dashboard/examiner/pending-badges");
  }

  return (
    <ModalDecline>
      <ModelContent>
        <Heading as="h2">Candidate-badge</Heading>

        <Form method="post" action={`../decline-badge/${id}`}>
          <ModalBody>
            <BtnActionModal>
              <Link
                type="button"
                className="btn delete-btn"
                to="/dashboard/examiner/pending-badges"
                onClick={() =>
                  editModalWork(setIsEditModalActive(!isEditModalActive))
                }
              >
                cancel
              </Link>
              {disableButton ? (
                <button type="submit" className="btn delete-btn">
                  Decline
                </button>
              ) : (
                ""
              )}
            </BtnActionModal>
          </ModalBody>
        </Form>
      </ModelContent>
    </ModalDecline>
  );
};

export default EditModelForExaminerToViewBadgCandidate;
