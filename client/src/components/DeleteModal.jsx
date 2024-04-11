import  { useState } from "react";

import styled from "styled-components";
import Heading from "../ui/Heading";
import { Form, Link, useNavigate, useNavigation } from "react-router-dom";

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

const HR = styled.hr`
  width: 100%;
  border-radius: 10px;
  border: 1px solid;
`;
const ModelContent = styled.div`
  width: 500px;
  /* height: vh; */
  background-color: var(--background-color);
  border-radius: 1rem;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
`;

const ModalBody = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  p {
    font-size: 2rem;
  }
`;

const BtnActionModal = styled.div`
  display: flex;
  gap: 4rem;
  justify-content: center;
`;
const DeleteModal = ({
  id,
  title,
  modalWork,
  setIsModalActive,
  isModalActive,
  deleteUrl,
  currentUrl,
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
  const navigate = useNavigate();
  const isSubmitting = navigation.state === "submitting";
  
  const cancelAction = () => {
     modalWork(setIsModalActive(!isModalActive));
  };
    return (
    <ModalDecline>
      <ModelContent>
        <Heading as="h2">Confrim to Delete</Heading>
        <HR />
        <Form
          method="post"
          encType="multipart/form-data"
          action={`../${deleteUrl}/${id}`}
        >
          <ModalBody>
            <p>Delete : {title}</p>
             <BtnActionModal>
              <Link to={`../${currentUrl}`}  type="button" className="btn btn-block" onClick={cancelAction}>cancel</Link>
              {/* <Link  type="submit" className="btn btn-block" onClick={cancelAction}>cancel</Link> */}

              <button type="submit" className="btn btn-block">
                {isSubmitting ? "deletting..." : "Delete"}
              </button>
            </BtnActionModal>
          </ModalBody>
        </Form>
      </ModelContent>
    </ModalDecline>
  );
};

export default DeleteModal;
