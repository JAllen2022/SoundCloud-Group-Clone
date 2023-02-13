import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
// import UploadPage from './Upload/UploadPage';
import './Navigation.css';

function Navigation({ isLoaded }){
	const sessionUser = useSelector(state => state.session.user);

	return (
		<div className='nav-page-container'>
			<div className='nav-bar'>

			<NavLink exact to="/">Home</NavLink>

			{isLoaded && (
				<li>
					{/* <NavLink exact to="/">Home</NavLink> */}
					<NavLink exact to="/upload">Upload</NavLink>
					<ProfileButton user={sessionUser} />

				</li>

			)}
			</div>
		</div>
	);
}

export default Navigation;
