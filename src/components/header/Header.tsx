import { NavLink } from 'react-router-dom';
import { AuthButtons } from './auth-buttons/AuthButtons';
import { Search } from './search/Search';
import s from './styles.module.css';
import ThemePNG from '../../assets/theme.png';
import { SyntheticEvent, useContext } from 'react';
import { themeContext } from '../../App';

export function Header() {
  return (
    <section className={s['header-wrapper']}>
      <header className={s.header}>
        <Logo />
        <Search />
        <AuthButtons />
      </header>
      <ToggleTheme />
    </section>
  );
}

function Logo() {
  return (
    <NavLink className={s.logo} to="/heroes">
      MARVEL HEROES
    </NavLink>
  );
}

function ToggleTheme() {
  const [theme, setTheme] = useContext(themeContext);
  const changeTheme = (e: SyntheticEvent) => {
    e.preventDefault();
    console.log('handler called');
    if (theme === 'light') {
      setTheme('dark');
      return;
    }

    setTheme('light');
  };

  return (
    <div className={s['theme-wrapper']}>
      <img src={ThemePNG} className={s['theme-icon']} />
      <label
        onClick={changeTheme}
        htmlFor={s.theme}
        className={s['theme-label']}
      >
        <div className={s.circle}></div>
        <input data-theme={theme} type="checkbox" id={s.theme} />
      </label>
    </div>
  );
}
