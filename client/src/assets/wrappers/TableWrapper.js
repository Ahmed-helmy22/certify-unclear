import styled from "styled-components";

export const TablContainer = styled.div`
 overflow-x:auto;

`;

export const Table = styled.div`
  border: 1px solid var(--color-grey-200);
  font-size: 1rem;
  background-color: var(--color-grey-0);
  border-radius: 10px;
  border: 1px solid;
  justify-items: center;
  flex-direction: column;
  min-width: min-content ;
  overflow-x: auto;
  align-items: center;  /* Add this line */
  @media (max-width: 1092px) {
    min-width: 1100px;
  }
  @media (max-width: 768px) {
    overflow-x: auto;
  };
`;

export const TableHeader = styled.div`
  display: grid;
  grid-template-columns: repeat(var(--num-columns, 3), 1fr);
  align-items: center; // Align vertically
  justify-content: center;
  text-align: center;
  background-color: var(--blue-500);
  border-bottom: 4px solid var(--grey-300);
  text-transform: uppercase;
  letter-spacing: 0.4px;
  font-weight: 300;
  font-size: 1rem;
  color: var(--color-grey-600);
  padding: 1rem;
  border-top-left-radius: inherit;
  border-top-right-radius: inherit;
  align-items: center;  /* Add this line */
  :last-child{
    background-color: red;
 }
`;

export const TableRow = styled.div`
  display: grid;
  grid-template-columns: repeat(var(--num-columns, 3), 1fr);
  overflow-x:auto;
  align-items: center; // Align vertically
  justify-items: center;
  padding: 1.4rem;
  text-align: center;
  /* white-space: nowrap;  */
   &:not(:last-child) {
    border-bottom: 1px solid var(--blue-800);
  };
 
`;


export const Name = styled.div`
  font-size: 1.2rem;
  font-weight: 400;
  color: var(--color-grey-600);
  font-family: "Sono";
  text-transform: capitalize;
`;
export const HiddenId = styled.div`
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  font-family: "Sono";
  font-weight: 200;
  color: var(--color-grey-600);
  cursor: pointer;
  user-select: none;
  &:hover {
    overflow: visible;
    white-space: normal;
  }
`;

export const Title = styled.div`
  overflow: hidden;
  font-family: "Sono";
  font-weight: 200;
  font-size: 1.1rem;
 color: var(--color-grey-600);
  text-transform: capitalize;
`;
export const Pending = styled.div`
 font-family: "Sono";
  font-weight: 400;
   font-size: 1.2rem;
  color: var(--red-dark);
  background-color: var(--red-light);
  border-radius: 1rem;
  padding-top: 0.2rem;
  padding-bottom: 0.2rem;
  padding-left: 0.2rem;
  padding-right: 0.2rem;
  width: 100px;
`;
export const Published = styled.div`
  font-family: "Sono";
  font-weight: 400;
  font-size: 1.2rem;
  /* color: var(--red-dark); */
  background-color: var(--primary-600);
  border-radius: 1rem;
  padding-top: 0.2rem;
  padding-bottom: 0.2rem;
  padding-left: 0.2rem;
  padding-right: 0.2rem;
  width: 100px;
`;

export const Declined = styled.div`
  font-family: "Sono";
  font-weight: 400;
  color: yellow;
  background-color: var(--primary-600);
  border-radius: 1rem;
  padding-top: 0.2rem;
  padding-bottom: 0.2rem;
  padding-left: 0.2rem;
  padding-right: 0.2rem;
  width:100px;
   font-size: 1.2rem;
`;

// export const Action = styled.div`
//   display: "flex"; 
//   gap: 4rem;   
//   flex-wrap: wrap;
//   width: 200px;
//   margin: auto;
//   button {
//     flex-grow: 2; /* Allow the button to grow and take available space */
//     max-width: 100% /* Make the button take the full width */
//   }

//   .adminAction {
//     font-size: 1rem;
//   }
//  `;

export const Action = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
  align-content: center;
  flex-wrap: wrap;
  a{
    color: var(--text-color);
    font-size: 1rem;
  }
 `;

export const Img = styled.img`
display: flex;
justify-content: center;
align-items: center;
width: 6.4rem;
aspect-ratio: 3 / 2;
object-fit: cover;
object-position: center;
transform: scale(1.5) translateX(-7px);
 margin: auto;
  `;

export const ExaminerPendingTableBtn = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
  align-content: center;
  a{
    color: var(--text-color);
    font-size: 1rem;
  }
`

export const SmallActionSize = styled.div`
  display: flex;
  gap: .5rem;
  align-items: center;
  justify-content: center;
  width: 100px;
  margin: auto;
  .deleteBtn{
    background-color: red;
  }
  button {
    flex-grow: 1; /* Allow the button to grow and take available space */
    max-width: 100% /* Make the button take the full width */
  }

  .adminAction {
    font-size: 10px;
  }
  
 `;