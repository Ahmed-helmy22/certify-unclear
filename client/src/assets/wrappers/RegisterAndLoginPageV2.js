import styled from 'styled-components';
 
 const Wrapper = styled.section`
  display: grid;
  grid-template-columns: 1fr 2fr;
  align-content: center;
  justify-content: center;
  .bgImag{
    text-align: center;
    width: 500px;
    height: 500px;
    background-position: none;
    background-repeat: no-repeat;
  }
  img:hover {
  transform: scaleX(-1);
  }
  .wrapperForm {
    /* width: 50%; */
    padding-left: 1rem;
    /* background: rgba(255, 255, 255, 0.1); */
    border: 2px solid rgba(255, 255, 255, 0.2);
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
    backdrop-filter: blur(50px);
    border-radius: 10px;
    color: #fff;
    padding: 40px 35px 55px;
    margin: 0 10px;
  }
  form {
    background-color: rgba(27, 24, 24, 0.678);
    padding: 2rem;
    width: 100%;
    margin-right: 1rem;
  }
  h1 {
    font-size: 36px;
    text-align: center;
    margin-bottom: 20px;
  }
  .input-box {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
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
  @media (max-width: 860px) {
    grid-template-columns : 1fr auto;
    .bgImag{
      display: none;
    }
    .bgImag img{
      display: none;
    }
    
  }
  @media (max-width: 576px) {
    .input-box .input-field {
      width: 100%;
    }
  }
`;
export default Wrapper;
