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
          <NavLink className="home-link" exact to="/songs">
            Home
          </NavLink>
        </div>
        <div className="header-right">
          {isLoaded && (
            <div className="upload-prof-pic">
              {/* <NavLink exact to="/">Home</NavLink> */}
              <div className="upload-button-container">
                <NavLink
                  exact
                  to="/upload"
                  className="upload-button"
                  onClick={() => dispatch(resetSingleSong())}
                >
                  Upload
                </NavLink>
              </div>
              <div className="profile-button-container">
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
