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
    // ******** Get User comments ********
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
    <div className="user-page-container">
      <div className={user.header_image_url ? '' : 'user-page-header'}>
        <div className="header-image-container">
          <img
            src={user.header_image_url ? user.header_image_url : ""}
            alt="header image"
          />
        </div>
        <div className="prof-pic-info">
          <div className="user-prof-pic">
            <img
              className="user-prof-img"
              src={user?.profile_image_url ? user.profile_image_url : profPic}
              alt="profile picture"
            />
          </div>
          <div className="user-info">
            <div className="user-page-display-name">{user?.display_name}</div>
            <div className="user-first-last">
              {user?.first_name} {user?.last_name}
            </div>
            <div className="user-city">{user?.city}</div>
            <div className="user-country">{user?.country}</div>
          </div>
          {currentUser.id == userId && (
            //   id="submit-header-image"
            //   onSubmit={handleSubmit}
            //   action={`/user/${currentUser.id}`}
            // >
            <div>
              <label htmlFor="header-pic-file">Update Header Image</label>
              <input
                name="header-pic-file"
                type="file"
                accept="image/*"
                onChange={updateHeaderImage}
              />
            </div>
            // </form>
          )}
        </div>
      </div>
      <div className="user-page-nav-container">
        <div className="user-page-nav">
          <Link className="user-page-nav-links">Tracks</Link>
          <Link className="user-page-nav-links">
            Playlist
            {/* this is a future feature - will pop-up modal that shows "Feature Pending" */}
          </Link>
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
          <div className="edit-user-page-"></div>
        </div>
      </div>
      <div className="user-page-body-container">
        <div className="left-user-page-body-container">
          <UserSongs />
        </div>
        <div className="right-user-page-body-container">
          <UserPageLikes />
        </div>
      </div>
    </div>
  );
};

export default UserPage;
