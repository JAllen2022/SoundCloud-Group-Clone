import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../store/session";
import { Link, useHistory } from "react-router-dom";
import OpenModalButton from "../OpenModalButton";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";
import "./Navigation.css";

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();
  const history = useHistory();

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (!ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logout());
    history.push('/')
  };

  const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");
  const closeMenu = () => setShowMenu(false);

  return (
    <>
    <div className="prof-pic-and-displayName">
      <button className="profile-pic-button" onClick={openMenu}>
        <i className="fas fa-user-circle fa-lg" />
      </button>
      <div className="navbar-display-name">
        {user?.display_name}
      </div>
    </div>
      <ul className={ulClassName} ref={ulRef}>
        {user ? (
          <>
            <Link className="link" to={`/users/${user?.id}`} ><p className='profile-dropdown-link link'>Profile</p></Link>
            <Link className="link" to={`/users/${user?.id}/likes`} ><p className='profile-dropdown-link link'>Likes</p></Link>
            <Link className="link" to={`/users/${user?.id}/songs`} ><p className='profile-dropdown-link link'>Tracks</p></Link>
            <p className='profile-dropdown-username'>{user.username}</p>
            <p className='profile-dropdown-email'>{user.email}</p>
            <p className='profile-dropdown-logout' onClick={handleLogout}>Log Out</p>
          </>
        ) : (
          <div className="profile-dropdown logged-out">
            <OpenModalButton
              buttonText="Log In"
              onItemClick={closeMenu}
              modalComponent={<LoginFormModal />}
            />

            <OpenModalButton
              buttonText="Sign Up"
              onItemClick={closeMenu}
              modalComponent={<SignupFormModal />}
            />
          </div>
        )}
      </ul>
    </>
  );
}

export default ProfileButton;
