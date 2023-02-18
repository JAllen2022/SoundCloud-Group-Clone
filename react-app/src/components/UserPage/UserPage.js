import "./UserPage.css";
// import { useEffect } from 'react';
import { useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import OpenModalButton from "../OpenModalButton";
import EditUserPageForm from "./EditUserPageForm/EditUserPageForm";
import { useEffect, useState } from "react";
import { loadUserThunk, headerUserPage } from "../../store/userPage";
import UserSongs from "./UserSongs/UserSongs";
import profPic from "../../assets/profPic.jpeg";
import { getUserSongsThunk, getUserLikedSongsThunk } from "../../store/songs";
import { setHeaderImageThunk } from "../../store/session";
import UserPageLikes from "./UserPageLikes/UserPageLikes";
import UserPageComments from "../Comments/UserPageComments/UserPageComments";
import { loadUserCommentsThunk } from "../../store/comments";

const UserPage = () => {
  const { userId } = useParams();
  // const [user, setUser] = useState({});
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.session.user);
  const user = useSelector((state) => state.UserPage.userProfile);
  // const userLikedSongs = useSelector((state) => state.Songs.userLikedSongs);
  // const userSongs = useSelector((state) => state.Songs.userSongs);

  const [headerImage, setHeaderImage] = useState("");
  // console.log(user)

  // useEffect(() => {
  //     if (!userId) {
  //         return;
  //     }
  //     (async () => {
  //         const res = await fetch(`/api/users/${userId}`);
  //         const user = await res.json();
  //         setUser(user);
  //     })();
  // }, [userId]);

  // if (!user) {
  //     return null;
  // }

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("we are submitting header 2");

    const data = new FormData();

    data.append("header_picture", headerImage);

    dispatch(setHeaderImageThunk(data, currentUser.id)).catch(async (res) => {
      const data = await res.json();
    });
  };

  const colorPicker = () => {
    let colors = [
      "h-pink",
      "h-purple",
      "h-yellow",
      "h-bluegreen",
      "h-hotpink",
      "h-purpleblue",
      "h-orange",
      "h-darkblue",
    ];
    let randoNum;
    // for (let i in colors) {
    randoNum = Math.floor(Math.random() * 9);
    // }
    console.log(randoNum);
    return colors[randoNum];
  };
  console.log("colors", colorPicker());

  //   useEffect(() => {
  //     if (headerImage) {
  //       console.log("we are submitting header");
  //       document.getElementById("submit-header-image").submit();
  //     }
  //   }, [headerImage]);

  useEffect(() => {
    // Get User information, User Uploaded Songs, and User Liked Songs
    dispatch(loadUserThunk(userId));
    dispatch(getUserSongsThunk(userId));
    dispatch(getUserLikedSongsThunk(userId));
    dispatch(loadUserCommentsThunk(userId));
  }, [dispatch, userId]);

  const updateHeaderImage = (e) => {
    console.log("inside our header image on change");
    const file = e.target.files[0];
    // setHeaderImage(file);

    const data = new FormData();

    data.append("header_picture", file);

    dispatch(setHeaderImageThunk(data, currentUser.id))
      .then((data) => dispatch(headerUserPage(data)))
      .catch(async (res) => {
        console.log("error is ", res);
      });
  };

  //   document.getElementById("file").onchange = function() {
  //
  // };

  return (
    <div className="user-page-outer-container">
      <div className="user-page-container">
        {/* <div className={user.header_image_url ? "" : "user-page-header"}> */}
        <div
          className={
            user?.header_image_url
              ? "user-page-header"
              : `${colorPicker()} user-page-header`
          }
        >
          {user?.header_image_url && (
            <div className="header-image-container">
              <img
                className="user-page-header-image"
                src={user?.header_image_url}
                alt="header image"
              />
            </div>
          )}
          <div className="user-page-profile-header-info-container">
            <div className="user-page-profile-header-info-left">
              <img
                className="user-prof-img"
                src={user?.profile_image_url ? user.profile_image_url : profPic}
                alt="profile picture"
              />
            </div>
            <div className="user-page-profile-header-name-details-container">
              <div className="user-page-profile-header-name-details-inner-container">
                <h1 className="user-page-profile-header-text">
                  {user?.display_name}
                </h1>
              </div>
              <div className="user-page-profile-header-name-details-inner-container">
                <h3 className="user-page-profile-header-subtext">
                  {user?.first_name} {user?.last_name}
                </h3>
              </div>
              <div className="user-page-profile-header-name-details-inner-container">
                <h3 className="user-page-profile-header-subtext">
                  {user?.city} {user?.country}
                </h3>
              </div>
            </div>
            {currentUser.id == userId && (
              <div className="user-page-header-upload-container">
                <label htmlFor="header-pic-file">Update Header Image</label>
                <input
                  name="header-pic-file"
                  type="file"
                  accept="image/*"
                  onChange={updateHeaderImage}
                />
              </div>
            )}
          </div>
        </div>
        <div className="user-page-nav-body-container">
          <div className="user-page-nav-container">
            <div className="user-page-nav-links-left">
              <Link className="user-page-nav-links">Tracks</Link>
              <Link className="user-page-nav-links">
                Playlist
                {/* this is a future feature - will pop-up modal that shows "Feature Pending" */}
              </Link>
            </div>
            <div className="user-page-nav-links-right">
              {currentUser && currentUser.id == userId ? (
                <div className="edit-user-profile-button">
                  <OpenModalButton
                    className="edit-user-modal-button"
                    modalComponent={<EditUserPageForm />}
                    buttonText={<i className="fa-regular fa-pen-to-square"></i>}
                  />
                </div>
              ) : (
                ""
              )}
            </div>
          </div>
          <div className="user-page-body-container">
            <div className="left-user-page-body-container">
              <UserSongs />
            </div>
            <div className="right-user-page-body-container">
              <div className="right-user-page-body-inner-container">
                <div className="right-user-page-body-track-count">
                  <div className="right-user-page-body-track">Tracks</div>
                  <div className="right-user-page-body-track-count">0</div>
                </div>
                <div className="right-user-page-body-user-bio-container">
                  <div className="right-user-page-body-user-bio">
                    User Bio. Something interesting about a person who is interesting.
                  </div>
                </div>
                <div className="UserPageLikes-component">
                  <UserPageLikes />
                </div>
                <div className="userPagecomments-component">
                  <UserPageComments />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserPage;
