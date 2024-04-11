import { useState } from "react";
import styled from "styled-components";
import {
  Form,
  Link,
  redirect,
  useNavigation,
  useParams,
} from "react-router-dom";
import { toast } from "react-toastify";
import Heading from "../../ui/Heading";
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

export const action = async ({ params }) => {
  console.log(params, "sssssssssssssssssss");
  try {
    await customFetch.patch(`/admin/suspendProvider/${params.userId}`);
    toast.success("suspend account Successfful");
    return redirect("/admin/provider");
  } catch (error) {
    toast.error(error?.response?.data?.message);
    return error;
  }
};

const AdminSuspendModal = ({
  suspendModalWork,
  setIsModalSuspendActive,
  isModalSuspendActive,
  OrganizationName,
}) => {
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
    setIsModalSuspendActive(!isModalSuspendActive);
    return redirect("/dashboard/admin/provider/");
  }
  return (
    <ModalDecline>
      <ModelContent>
        <Heading as="h2">Suspend this account</Heading>
        <Form
          method="post"
          encType="multipart/form-data"
          action={`../provider/suspend/${urlParams.userId}`}
        >
          <ModalBody>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "2rem",
                justifyContent: "center",
              }}
            >
              <h4>Name : </h4> <p>{OrganizationName}</p>
            </div>

            <BtnActionModal>
              <Link
                type="button"
                className="btn btn-block"
                to="/dashboardadmin/provider"
                onClick={() =>
                  suspendModalWork(
                    setIsModalSuspendActive(!isModalSuspendActive)
                  )
                }
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
  );
};

export default AdminSuspendModal;
