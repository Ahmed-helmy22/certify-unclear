import { useState } from "react";

import styled from "styled-components";
import Heading from "../ui/Heading";
import {
  Form,
  Link,
  redirect,
  useNavigation,
  useParams,
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
`;

export const action = async ({ request, params }) => {
  const formData = await request.formData();
  const file = formData.get("newBadgePhoto");
  const errors = { msg: "" };
  console.log(params.badgeId);
  console.log(file);
  if (file.type !== "image/png") {
    errors.msg = "badge photo shall be png type";
    toast.error(errors.msg);
    return errors;
  }
  if (file.size > 50000) {
    errors.msg = "badge photo size shall be less than 5.0 MB";
    toast.error(errors.msg);
    return errors;
  }
  try {
    await customFetch.patch(
      `/badge/updateBadgePhoto/${params.badgeId}`,
      formData
    );
    toast.success("Badge Image Updated Successfful");
    return redirect("/dashboard/academy/all-badges");
  } catch (error) {
    errors.msg = error?.response?.data?.message;
    toast.error(errors.msg);
    return redirect("/dashboard/academy/all-badges");
     
  }
};
const EditBadgeModal = ({ modalWork, setIsModalActive, isModalActive }) => {
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
  const urlParams = useParams();

  if (isSubmitting) {
    setIsModalActive(!isModalActive);
    return redirect("/dashboard/academy/all-badges");
  }

  return (
    <ModalDecline>
      <ModelContent>
        <Heading as="h2">Update badge Image</Heading>
        <Form
          method="post"
          encType="multipart/form-data"
          action={`../all-badges/edit-badge-image/${urlParams.badgeId}`}
        >
          <ModalBody>
            <FormRow
              type="file"
              name="newBadgePhoto"
              accept="image/png"
              labelText="badge Photo accept image/png only"
              placeholder="image/png"
              withLabel={true}
            />
            <BtnActionModal>
              <Link
                type="button"
                className="btn btn-block"
                to="/dashboard/academy/all-badges"
                onClick={() => modalWork(setIsModalActive(!isModalActive))}
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

export default EditBadgeModal;
