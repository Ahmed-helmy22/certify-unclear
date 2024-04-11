import { useRef } from "react";
import styled from "styled-components";

export const UploadFileContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.5rem;
  width: 100%;
  height: inherit;
  gap: 3rem;
  border: 2px solid rgba(255, 255, 255, 0.2);
  color: #fff;
  background-color: transparent;
  border-radius: 6px;
  position: relative;
  ::placeholder {
    color: #fff;
  }
  button {
    padding: 0.2rem 0.5rem;
    background-color: var(--blue-500);
    cursor: pointer;
    color: var(--white);
    background: var(--blue-500);
    border: transparent;
    border-radius: var(--border-radius);
    letter-spacing: var(--letter-spacing);
    padding: 0.375rem 0.75rem;
    box-shadow: var(--shadow-1);
    transition: var(--transition);
    text-transform: capitalize;
    display: inline-block;
    align-items: center;
  }
`;

export const FileUploader = ({ handleFile, uploadName , showName, className }) => {
  // Create a reference to the hidden file input element
  const hiddenFileInput = useRef(null);

  // Programatically click the hidden file input element
  // when the Button component is clicked
  const handleClick = (event) => {
    event.preventDefault()
    hiddenFileInput.current.click();
  };
  // Call a function (passed as a prop from the parent component)
  // to handle the user-selected file
  const handleChange = (event) => {
    event.preventDefault()
    const fileUploaded = event.target.files[0];
    handleFile(fileUploaded);
  };
  return (
    <>
      <UploadFileContainer>
        <p>{showName}</p>
        <button className={className} onClick={handleClick}>
          Upload
        </button>
        <input
          type="file"
          name={uploadName}
          onChange={handleChange}
          ref={hiddenFileInput}
          style={{ display: "none" }} // Make the file input element invisible
        />
      </UploadFileContainer>
    </>
  );
};

export default FileUploader;
