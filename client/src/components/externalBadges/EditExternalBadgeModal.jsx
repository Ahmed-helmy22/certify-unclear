import { useState } from "react";

import styled from "styled-components";
import Heading from "../../ui/Heading";
import {
  Form,
  Link,
  redirect,
  useNavigation,
  useParams,
} from "react-router-dom";
import FormRow from "../FormRow";
import { toast } from "react-toastify";
import customFetch from "../../utils/customFetch";

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
  padding: 2rem;
`;

const ModelContent = styled.div`
  width: 500px;
  min-height: 350px;
  background-color: var(--background-color);
  border-radius: 1rem;
  padding: 2rem;
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

  const file = formData.get("newWebsitePhoto");
  console.log(file.name.length);
  const errors = { msg: "" };
  if (file.name.length > 0) {
    if (file.type !== "image/png") {
      errors.msg = "badge photo shall be png";
      toast.error(errors.msg);
      return errors;
    }
  }

  try {
    await customFetch.patch(
      `/externalBadge/editWebsiteImage/${params.websiteId}`,
      formData
    );
    toast.success("Badge Added Successfful");
    return redirect("/dashboard/admin/manage-external");
  } catch (error) {
    errors.msg = error?.response?.data?.message;
    toast.error(errors.msg);
    redirect("/dashboard/admin/manage-external");
    return error;
  }
};
const EditExternalBadgeModal = ({
  modalWork,
  setIsModalActive,
  isModalActive,
}) => {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  const urlParams = useParams();

  if (isSubmitting) {
    setIsModalActive(!isModalActive);
    return redirect("/dashboard/admin/manage-external");
  }
  const [file, setFile] = useState(null);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  return (
    <ModalDecline>
      <ModelContent>
        <Heading as="h2">Update badge Image</Heading>
        <Form
          method="post"
          encType="multipart/form-data"
          action={`../manage-external/edit/${urlParams.websiteId}`}
        >
          <ModalBody>
            <FormRow
              type="file"
              name="newWebsitePhoto"
              accept="image/png"
              labelText="badge Photo accept image/png only"
              placeholder="image/png"
              withLabel={true}
              onChange={handleFileChange}
            />

            <BtnActionModal>
              <Link
                type="button"
                className="btn btn-block"
                to="/dashboard/admin/manage-external"
                onClick={() => modalWork(setIsModalActive(!isModalActive))}
              >
                cancel
              </Link>

              {file ? (
                <button type="submit" className="btn btn-block">
                  {isSubmitting ? "Updating image..." : "Update Image"}
                </button>
              ) : (
                <button type="button" className="btn btn-block" disabled>
                  Select an Image
                </button>
              )}
            </BtnActionModal>
          </ModalBody>
        </Form>
      </ModelContent>
    </ModalDecline>
  );
};

export default EditExternalBadgeModal;
