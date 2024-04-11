import { useState } from "react";

import styled from "styled-components";
import Heading from "../ui/Heading";
import { Form } from "react-router-dom";

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
const DeclineModel = ({ id, modalWork, setIsModalActive, isModalActive }) => {
  const [disableButton, setDisableButton] = useState(false);

  const disableAction = (e) => {
    if (e.target.value.length > 0) {
      setDisableButton(true);
    } else {
      setDisableButton(false);
    }
  };

  return (
    <ModalDecline>
      <ModelContent>
        <Heading as="h2">Confrim to Decline the badge</Heading>

        <Form method="post" action={`../decline-badge/${id}`}>
          <ModalBody>
            <p>Please Enter the reasons of decline ?</p>
            <textarea
              name="declineReason"
              cols="30"
              rows="10"
              onChange={disableAction}
            ></textarea>
            <BtnActionModal>
              <button
                type="button"
                className="btn delete-btn"
                onClick={() => modalWork(setIsModalActive(!isModalActive))}
              >
                cancel
              </button>
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

export default DeclineModel;
