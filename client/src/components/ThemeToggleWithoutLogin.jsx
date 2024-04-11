import { BsFillSunFill, BsFillMoonFill } from 'react-icons/bs';
import Wrapper from '../assets/wrappers/ThemeToggle';
 import { useDashboardWithoutContext } from '../pages/DashboardLayoutWithoutLogin';

const ThemeToggleWithoutLogin = () => {
    const { isDarkTheme, toggleDarkTheme } = useDashboardWithoutContext();
    return (
      <Wrapper onClick={toggleDarkTheme}>
        {isDarkTheme ? (
          <BsFillSunFill className='toggle-icon' />
        ) : (
          <BsFillMoonFill className='toggle-icon' />
        )}
      </Wrapper>
    );
}

export default ThemeToggleWithoutLogin