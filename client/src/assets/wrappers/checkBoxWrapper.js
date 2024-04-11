import styled from 'styled-components';

const Wrapper = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-around;
    font-size: 1.2rem ;
    .form-row{
        display: grid;
        width: 100%;
    }
    .dropListAcademy{
        margin-top  : 1.2rem ;
        padding: 0.375rem 4.75rem;
        border-radius: var(--border-radius);
        background: var(--background-color);
        border: 1px solid var(--grey-300);
        color: var(--text-color);
        font-size: 1.4rem;
    }

    .dropListAcademySecond{
        margin-top  : 1rem ;
        padding: 0.375rem 4.7rem;
        border-radius: var(--border-radius);
        background: var(--background-color);
        border: 1px solid var(--grey-300);
        color: var(--text-color);
        font-size: 1.2rem;
    }
`;

export default Wrapper;
