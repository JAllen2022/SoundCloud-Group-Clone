import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../store/session";
import { Link, useHistory } from "react-router-dom";
import OpenModalButton from "../OpenModalButton";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";
import dropUserPic from "../../assets/icons8-customer-50.png";
import waveForm from "../../assets/waveform.232x256.png";

// import { BsSoundwave } from 'react-icons/bs';

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

  const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden") + (user ? "" : " loggedOut");
  const closeMenu = () => setShowMenu(false);

  return (
    <>
      <div className="prof-pic-and-displayName">
        <button className="profile-pic-button" onClick={openMenu}>
          <i className="fas fa-user-circle fa-lg" />
        <div className="navbar-display-name">
          {user?.display_name}
        </div>
        </button>
      </div>
      <div className="dropdown-container">
        <ul className={ulClassName} ref={ulRef}>
          {user ? (
            <>
              <Link onClick={closeMenu} className="link" to={`/users/${user?.id}`} ><p className='profile-dropdown-link link'><img className="drop-user-pic" src={dropUserPic} alt="" />Profile</p></Link>
              <Link onClick={closeMenu} className="link" to={`/users/${user?.id}/likes`} ><p className='profile-dropdown-link link'><i id="dropdown-heart" className="fa-solid fa-heart"></i>Likes</p></Link>
              <Link onClick={closeMenu} className="link" to={`/users/${user?.id}/songs`} ><p className='profile-dropdown-link link'><img className="drop-tracks" src={waveForm} />Tracks</p></Link>
              <p className='profile-dropdown-logout' onClick={handleLogout}><i className="fa-solid fa-right-from-bracket"></i>Log Out</p>
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
      </div>
    </>
  );
}

export default ProfileButton;
