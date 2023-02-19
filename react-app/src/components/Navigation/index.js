import React, {useState, useEffect} from "react";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
// import UploadPage from './Upload/UploadPage';
import { resetSingleSong } from "../../store/songs";
import "./Navigation.css";

function Navigation({ isLoaded }) {
  const sessionUser = useSelector((state) => state.session.user);
  const [profileButtonActive, setProfileButtonActive]= useState("")
  const dispatch = useDispatch();

  console.log("we re-rendering this page", profileButtonActive)
  let activeProfBackground = "";
  if (profileButtonActive) activeProfBackground = "nav-bar-prof-button-active"
  else activeProfBackground = ""

  return (
    <div className="nav-page-container">
      <div className="nav-bar">
        <div className="header-left">
          <div className="logo">
            <div>
              <i className="fa-brands fa-soundcloud fa-3x "></i>
            </div>
          </div>
          <div className="nav-bar-button-container">
            <NavLink className="nav-bar-nav-link" exact to={sessionUser ? "/songs" : "/"}>
              Home
            </NavLink>
          </div>
        </div>
        <div className="header-right">
          {isLoaded && (
            <div className="upload-prof-pic">
              {/* <NavLink exact to="/">Home</NavLink> */}
              <div className="nav-bar-button-container">
                <NavLink
                  exact
                  to={sessionUser ? '/upload' : '/'}
                  className="nav-bar-nav-link"
                  onClick={() => dispatch(resetSingleSong())}
                >
                  Upload
                </NavLink>
              </div>
              <div className={sessionUser ? `profile-button-container ${activeProfBackground}` : `prof-butt-cont-loggedOut ${activeProfBackground}`}>
                <ProfileButton user={sessionUser} setProfileActive={ setProfileButtonActive } />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Navigation;
