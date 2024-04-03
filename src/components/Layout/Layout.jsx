import { Outlet } from 'react-router-dom';
import s from './Layout.module.scss';
import Header from '../Header/Header';

const Layout = () => {
	return (
		<div className={s.layout}>
			<Header />
			<main className={s.app}>
				<Outlet />
			</main>
		</div>
	);
};

export default Layout;