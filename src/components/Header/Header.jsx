import { Link, NavLink } from 'react-router-dom';
import styles from './Header.module.scss';

const Header = () => {
	const navStyles = ({ isActive }) => (isActive ? 'Header_active__lMuHy' : '');

	return (
		<header className={styles.header}>
			<div className={styles.logoText}>
				<Link to='/'>Redux CRUD Blog</Link>
			</div>
			<nav className={styles.navigation}>
				<NavLink to='/' className={navStyles}>
					Home
				</NavLink>
				<NavLink to='/post' className={navStyles} end>
					NewPost
				</NavLink>
			</nav>
		</header>
	);
};

export default Header;
