import styled from 'styled-components';

const Wrapper = styled.aside`
  display: none;
  @media (min-width: 992px) {
    display: block;
    box-shadow: 1px 0px 0px 0px rgba(0, 0, 0, 0.1);
    .sidebar-container {
      background: var(--background-secondary-color);
      min-height: 100vh;
      height: 100%;
      width: 200px;
      margin-left: -250px;
      transition: margin-left 0.3s ease-in-out;
    }
    .content {
      position: sticky;
      display: flex;
      flex-direction: column;
      top: 0;
    }
    .show-sidebar {
      margin-left: 0;
    }
    header {
      height: 6rem;
      display: flex;
      align-items: center;
      padding-left: 2.5rem;
    }
    /* .search{
        margin: auto;
        display: flex;
        align-items: center;
        position: relative;
        z-index:9999%;
      }
      .search-side-bar{
        height: 2.2rem;
        border-radius: 5px;
        padding: .5rem;
        z-index:9999%;
        ::placeholder{
          margin: 0.5rem;
        }
      } */
      
    }
    .nav-links {
      padding-top: 2rem;
      display: flex;
      flex-direction: column;
      justify-content: center;
      position: relative;
      .searchSideBar{
        width: 400px;
    height: fit-content;
    background-color: var(--popupBackground);
    color: var(--text-color);
    padding: 20px;
    border-radius: 5px;
    position: absolute;
    margin: 40px;
    z-index: inherit;
    left: 79%;
    top: 33%;
        ::after{
          content: " ";
          position: absolute;
          left: -15px;
          top: 15px;
          border-top: 15px solid transparent;
          border-right: 15px solid var(--popupBackground);
          border-left: none;
          border-bottom: 15px solid transparent;
        }
      
    }
    .nav-link {
      display: flex;
      align-items: center;
      color: var(--text-secondary-color);
      padding: 1rem 0;
      padding-left: 2.5rem;
      text-transform: capitalize;
      transition: padding-left 0.3s ease-in-out;
    }
    .nav-link:hover {
      padding-left: 3rem;
      color: var(--primary-500);
      transition: var(--transition);
    }
    .icon {
      font-size: 1.5rem;
      margin-right: 1rem;
      display: grid;
      place-items: center;
    }
    .active {
      color: var(--primary-500);
    }
    .pending {
      background: var(--background-color);
    }

    
  }
`;
export default Wrapper;
