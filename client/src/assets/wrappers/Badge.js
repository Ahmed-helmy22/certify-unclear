import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
    gap: 1rem;
    border-radius: var(--border-radius);
    text-align: center;
    box-shadow: var(--shadow-3);
    .heading{
      text-align: left;
      padding-left: 1rem;
      border-bottom : solid 2px var(--text-color) ;
      padding-bottom: 1rem;
      width: fit-content;
    }
   .content{
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    gap: 2.2rem;
    padding-bottom: 2.2rem;
     
   }
   .badges{
      box-shadow: var(--shadow-2);
      width: 250px;
      display: "flex";
      flex-direction: "column";
      justify-content: "center";
      align-items: center;
      gap: 15rem;
      margin: auto;
      
  }
   

  .editImageIcon {
    display: flex;
    justify-content: end;
    margin: .3rem;
    position: relative;

    .icon{
      color: white;
    }
    .icon:hover {
     /* Add your hover styles here */
      /* For example, you can change color */
      color: red;

      /* Show the text when icon is hovered */
      + .editImageText {
        display: block;
      }
    
    }

  }
  .editImageText {
    display: none;
    position: absolute;
    top: 100%;
    /* left: 50%; */
    /* transform: translateX(-50%); */
    background-color: white; /* Adjust background color as needed */
    color: black; /* Adjust text color as needed */
    padding: 0.5rem;
    border: 1px solid #ccc; /* Add border as needed */
    border-radius: 5px;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.1); /* Add box shadow as needed */
    z-index: 1;
  }

  hr{
    margin-top: .8rem;
    margin-bottom: .8rem;
    height: .2rem;
    border: none;
    border-radius: .5rem;
  }
  @media (max-width: 1200px){
    .content{
      grid-template-columns: 1fr 1fr 1fr auto;
    }
  }

  @media (max-width: 990px){
    .content{
      grid-template-columns: 1fr 1fr auto;
    }
  }

  @media (max-width: 690px){
    .content{
      grid-template-columns: 1fr;
    }
  }

`;

export default Wrapper;
