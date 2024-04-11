import styled from 'styled-components';

export const Wrapper = styled.article`
  background: var(--background-secondary-color);
  border-radius: var(--border-radius);
  /* display: grid;
  grid-template-rows: .2fr 1fr; */
  box-shadow: var(--shadow-2);
  header {
    padding: 1rem 1.5rem;
    border-bottom: 1px solid var(--grey-100);
    display: grid;
    grid-template-columns: auto 1fr;
    align-items: center;
  }
  .main-icon {
    width: 60px;
    height: 60px;
    display: grid;
    place-items: center;
    background: var(--primary-500);
    border-radius: var(--border-radius);
    font-size: 1.5rem;
    font-weight: 700;
    text-transform: uppercase;
    color: var(--white);
    margin-right: 2rem;
    
  }
  .info {
    h5 {
      margin-bottom: 0.5rem;
    }
    p {
      margin: 0;
      text-transform: capitalize;
      letter-spacing: var(--letter-spacing);
      color: var(--text-secondary-color);
    }
  }
  .content {
    display: grid;
    grid-template-columns: 1fr 2fr;
    padding: 1rem 1.5rem;

    @media (max-width: 960px) {
      display: flex;
      flex-direction: column;
      img{
        max-width: fit-content;

      }
    }
  }
  .content-center {
    display: grid;
    margin-top: 1rem;
    margin-bottom: 1.5rem;
    grid-template-columns: 300px 2fr;
    row-gap: 1.5rem;
    align-items: center;
       
    @media (min-width: 576px) {
      grid-template-columns: 1fr 2fr;
    }
  }
  .profileImage{
    width: 100%;
    img{
      width: 300px;
     }
  }
  .section{
    display: flex;
    flex-direction: column;
    gap: .2rem;
    
    p {
    line-height: 1.5;
    margin-top: 0.5rem;
    margin-bottom: 1rem;
    color: var(--text-secondary-color);
    :nth-child(1){
        font-weight: 600;
        font-size: 2.2rem;
    }
    :nth-child(2){
        font-weight: 400;
        font-size: 1.2rem;
    }
  }
  }
  
  .nav-link{
    display: flex;
    gap: 2.4rem;
    font-size: 1.2rem;
    border-bottom: 1px solid var(--grey-100);
    padding-bottom: 1.2rem;
  }

  .contactUs{
    ul{
        display: flex;
        gap: 1.2rem;
        li{
            border-right: 1px solid var(--grey-100);
            padding-right: 1rem;
            &:last-child {
            border-right: none;  
            }
        }
        
       
    }
    @media (max-width: 720px) {
      ul{
         flex-direction : column;
         li{
          border-right : none
         }
      }
    }
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
      color: red;
      + .editImageText {
        display: block;
      }
    
    }

  }
  .editImageText {
    display: none;
    position: absolute;
    top: 100%;
    background-color: white; 
    color: black; 
    padding: 0.5rem;
    border: 1px solid #ccc; 
    border-radius: 5px;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.1); 
    z-index: 1;
  }
`;

export const SupportedImage = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 1.2rem;
  @media (max-width: 720px)  {
    grid-template-columns: 1fr;
  }

`;



 