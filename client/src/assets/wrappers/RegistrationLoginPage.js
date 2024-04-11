import styled from 'styled-components';


export const FileUploadButton = styled.input.attrs({
  type: 'file',
})`
  border: 2px solid rgba(255, 255, 255, 0.2);
  font-size: 16px;
  color: #fff;
  background-color: transparent;
  border-radius: 6px;
  padding: 15px 40px 15px 40px;
  position: relative;
  ::placeholder {
    color: #fff;
  }

  &::file-selector-button {
    position: absolute;
    right: 0;
    margin-right: 20px; /* Adjust the margin as needed */
    border: none;
    background: #084cdf;
    padding: 5px 5px;
    border-radius: 10px;
    color: #fff;
    cursor: pointer;
    transition: background 0.2s ease-in-out;

    &:hover {
      background: #0d45a5;
    }
  }
`;

 
export const MainPage = styled.div`
  height: 100vh;
  display: grid;
  align-items: center;
  justify-content: center;
 
  `
export const MainWrapper = styled.section`
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-content: center;
  justify-content: space-around;
  gap: 2rem;
  padding-top: 1rem;
 
  .bgImag{
    text-align: center;
    align-self: center;
    background-position: none;
    background-repeat: no-repeat;   
     img{
      width: 500px;
      height: fit-content;
      text-align: center;
      
    }
  }
  
  .wrapperForm {
    border-top: 5px solid var(--blue-500);
    background-color: rgba(27, 24, 24, 0.678);
    /* padding-left: 1rem; */
     width: fit-content;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
    backdrop-filter: blur(50px);
    border-radius: 10px;
    color: #fff;
    padding: 1.5rem;
    display: flex;
    flex-direction: column;
    height: fit-content;
    margin: auto;
    h4{
      font-size: 1.8rem;
      font-weight: 700;
    }
    .header{
      display: flex;
      justify-content: end;
      gap: 1rem;
      span{
        color: blue;
      }
      .member-btn{
        color: var(--blue-500);
        padding-left: 0.5rem;
      }
    }
    .footer{
      display: flex;
      justify-content: space-between;
      gap: 1rem;
      span{
        color: blue;
      }
      .member-btn{
        color: var(--blue-500);
        padding-left: 0.5rem;
      }
    }
    hr{
      margin-top: .5rem;
    }

  }
  form , .form{
    /* width: 100%; */
    background-color: rgba(27, 24, 24, 0.678);
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: .2rem;
  }
  h1 {
    font-size: 36px;
    text-align: center;
    margin-bottom: .2rem;
  }
  .input-box {
    display: flex;
    justify-content: space-between;
    gap: 1rem;
    .input-field {
      position: relative;
      width: 100%;
      height: 3rem;
      margin: 8px 0;
      background-color: #333;
      .icon {
        position: absolute;
        left: 15px;
        top: 50%;
        transform: translateY(-50%);
        font-size: 20px;
      }
      .label-input{
        position: absolute;
        top: 10px;
        left: 5%;
      }
      .label-image {
        position: absolute;
        top: 0px;
        left: 5%;
        font-size: 1rem;
        transform: translateY(-100%);
      }
    }
    input {
    width: 100%;
    height: 100%;
    background-color: transparent;
    border: 2px solid rgba(255, 255, 255, 0.2);
    outline: none;
    font-size: 16px;
    color: #fff;
    border-radius: 6px;
    padding: 15px 15px 15px 40px;
    ::placeholder {
      color: #fff;
    }
  }
  label {
    display: inline-block;
    font-size: 14.5px;
    margin: 10px 0 23px;
    input {
      accent-color: #fff;
      margin-right: 5px;
    }
  }
  .gender-input {
    display: flex;
    align-items: center;
    justify-items: center;
    text-align: center;
    gap: 1rem;
  }
  .gender {
    width: 40px;
  }
  .btn {
    width: 100%;
    height: 45px;
     
    background-color: #fff;
    border: none;
    outline: none;
    border-radius: 6px;
    color: #333;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    cursor: pointer;
    font-weight: 600;
  }
  
 
  }
  .input-box3{
    display: flex;
    justify-content: space-between;
    gap: 1rem;
    .input-field {
      position: relative;
      width: 48%;
      height: 50px;
      margin: 13px 0;

      .icon {
        position: absolute;
        left: 15px;
        top: 50%;
        transform: translateY(-50%);
        font-size: 20px;
      }
      .label-input{
        position: absolute;
        top: 10px;
        left: 5%;
      }
      .label-image {
        position: absolute;
        top: 0px;
        left: 5%;
        font-size: 1rem;
        transform: translateY(-100%);
      }
    }
    input {
    width: 100%;
    height: 100%;
    background-color: transparent;
    border: 2px solid rgba(255, 255, 255, 0.2);
    outline: none;
    font-size: 16px;
    color: #fff;
    border-radius: 6px;
    padding: 15px 15px 15px 40px;
    ::placeholder {
      color: #fff;
    }
  }
  label {
    display: inline-block;
    font-size: 14.5px;
    margin: 10px 0 23px;
    input {
      accent-color: #fff;
      margin-right: 5px;
    }
  }
  }
  .input-box-agreement{
    display: flex;
    gap: 2rem;
  }
  .action-btn{
    display: flex;
    justify-content: space-between;
    button{
      width: 100px;
    }
    .page-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 2rem;
    
  }
  }

  .licenceAgreement{
    padding-left: .5rem;
  color: var(--blue-500);
  }
  .btn{
    margin-top: 1rem;
  }

  .btn-mainRegister{
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding-top: 1rem;
  }
   
 .btn-container{
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
  align-items: center;
  padding: 1rem;
  :hover{
    background: var(--blue-800);
  }
  
 }
 .btn-container a{
  text-align: center;
  color : white;
  font-size: 1.2rem;
  font-weight: 600;
 }
  .input-box select {
    width: inherit;
    height: inherit;
    /* background-color: transparent; */
    border: 2px solid rgba(255, 255, 255, 0.2);
    outline: none;
    font-size: 16px;
    /* color:black; */
    border-radius: 6px;
    padding: 10px 15px 10px 40px;
    ::placeholder {
      color: white;
    }
  }
  .form-btn{
    display: flex;
    justify-content:end;
    align-items: center;
    .btn{
      padding: .8rem 4rem;
      font-size: 1rem;
    }
  }
  @media (max-width: 860px) {
    grid-template-columns : 1fr auto;
   margin-top: 2rem;
    .bgImag{
      display: none;
    }
    .bgImag img{
      display: none;
    }
    
  }
  @media (max-width: 576px) {
    grid-template-columns : 1fr;
    margin: 1rem;
    margin-top: 2rem;
   
     .input-box {
      display: flex;
      flex-direction: column;
      width: 100%;
     }
    .input-box input {
      width: 100%;
    }
    .wrapperForm{
      box-shadow: 0 0 0 rgba(0, 0, 0, 0.2);
      margin-top: 1rem; 
  }
}
`;


