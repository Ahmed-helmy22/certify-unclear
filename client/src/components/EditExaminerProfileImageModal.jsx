import styled from "styled-components";
import Heading from "../ui/Heading";
import {
  Form,
  Link,
  redirect,
  useNavigate,
  useNavigation,
} from "react-router-dom";
import FormRow from "./FormRow";
import { toast } from "react-toastify";
import customFetch from "../utils/customFetch";

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
  text-align: center;
`;

export const action = async ({ request }) => {
  const formData = await request.formData();

  try {
    await customFetch.post(`/examiner/updateMyPhoto`, formData);
    toast.success("Badge Added Successfful");
    return redirect("/dashboard/examiner");
  } catch (error) {
    toast.error(error?.response?.data?.message);
    return error;
  }
};
const EditExaminerProfileImageModal = ({
  modalWork,
  setIsModalActive,
  isModalActive,
}) => {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  const navigate = useNavigate();
  const cancelModalWork = () => {
    setIsModalActive(!isModalActive);
    navigate(-1);
  };

  if (isSubmitting) {
    setIsModalActive(!isModalActive);
    return redirect("/dashboard/examiner");
  }

  return (
    <ModalDecline>
      <ModelContent>
        <Heading as="h2">Update Profile Image</Heading>
        <Form
          method="post"
          encType="multipart/form-data"
          action={`../examiner/edit-profile-photo`}
        >
          <ModalBody>
            <FormRow
              type="file"
              name="examinerProfilePhoto"
              accept="image/"
              labelText="badge Photo accept image"
              placeholder="image"
              withLabel={true}
            />
            <BtnActionModal>
              <Link
                type="button"
                className="btn btn-block"
                onClick={cancelModalWork}
              >
                cancel
              </Link>

              <button type="submit" className="btn btn-block">
                {isSubmitting ? "updating image..." : "Update Image"}
              </button>
            </BtnActionModal>
          </ModalBody>
        </Form>
      </ModelContent>
    </ModalDecline>
  );
};

export default EditExaminerProfileImageModal;
