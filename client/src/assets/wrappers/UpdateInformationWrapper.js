import styled from 'styled-components';

const Wrapper = styled.section`
border-radius: var(--border-radius);
  
  background: var(--background-secondary-color);
  padding: 3rem 2rem 4rem;
  .form-title {
    margin-bottom: 2rem;
  }
  h2{
    padding-bottom: 1rem;
  }
    .container{
        display: grid;
        grid-template-columns: 1fr;
        grid-row: auto;
        gap:2.2rem;
        
      
    }
    .image-input{
        display: block;
    }
    button{
        display: block;
        width: 100%;
        margin-top: 2.8rem;
        padding: .6rem;
    }
    @media (min-width: 960px) {
      width: 50%;
      margin: auto;
    .container {
      grid-template-columns: 1fr 1fr;
      gap: 2rem;
      
    }
    
    button{
        display: block;
        width: 100%;
        margin-top: 2.8rem;
        padding: .6rem;
    }
  }
  
`;

export default Wrapper;