import React from "react";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
// import UploadPage from './Upload/UploadPage';
import { resetSingleSong } from "../../store/songs";
import "./Navigation.css";

function Navigation({ isLoaded }) {
  const sessionUser = useSelector((state) => state.session.user);
  const dispatch = useDispatch();

  return (
    <div className="nav-page-container">
      <div className="nav-bar">
        <div className="header-left">
          <div className="logo">
            <i className="fa-brands fa-soundcloud fa-3x "></i>
          </div>
          <div className="home-tab">
            <NavLink className="home-link" exact to={sessionUser ? "/songs" : "/"}>
              Home
            </NavLink>
          </div>
        </div>
        <div className="header-right">
          {isLoaded && (
            <div className="upload-prof-pic">
              {/* <NavLink exact to="/">Home</NavLink> */}
              <div className="upload-button-container">
                <NavLink
                  exact
                  to={sessionUser ? '/upload' : '/'}
                  className="upload-button"
                  onClick={() => dispatch(resetSingleSong())}
                >
                  Upload
                </NavLink>
              </div>
              <div className={sessionUser ? "profile-button-container" : "prof-butt-cont-loggedOut"}>
                <ProfileButton user={sessionUser} />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Navigation;
