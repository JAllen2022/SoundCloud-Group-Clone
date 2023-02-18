import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getSongThunk,
  addLikeThunk,
  deleteLikeThunk,
  playSong,
} from "../../../store/songs";
import profPic from "../../../assets/profPic.jpeg";
import { Link } from "react-router-dom";
import CreateComment from "../../Comments/CreateComment/CreateComment";
import SongPageComments from "../../Comments/SongPageComments/SongPageComments";
import OpenModalButton from "../../OpenModalButton";
import UploadPage from "../../Navigation/Upload/UploadPage/UploadPage";
import { deleteSongThunk } from "../../../store/songs";
// import AllLikes from "../Likes/AllLikes";

import "./SongShow.css";

const SongShow = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { songId } = useParams();
  const song = useSelector((state) => state.Songs.singleSong);
  const currentUser = useSelector((state) => state.session.user);
  const user = useSelector((state) => state.UserPage.userProfile);
  console.log('song', song)
  console.log('song likes', song.song_likes)
  console.log('curr user', currentUser)
  // const [isLiked, setIsLiked] = useState(song.song_likes[currentUser?.id])

  useEffect(() => {
    dispatch(getSongThunk(songId));
  }, [dispatch, songId]);

  // Determining Display Time
  const song_date = new Date(song.created_at);
  const current_date = new Date();

  console.log("day", song.created_at)
  console.log(current_date)
  // const difference = current_date - song_date;
  // console.log(difference)
  // const seconds = (difference / 1000) % 60
  // console.log('seconds', seconds)

  // const minutes = Math.floor((difference / (60 * 1000)) % 60)
  // console.log('minutes', minutes)

  // const hours = Math.floor((difference / (1000 * 60 * 60)) % 24 );
  // console.log('hours', hours)

  // const days = Math.floor((difference / (1000 * 60 * 60 * 24) ))
  // console.log('days', days)
  // // console.log(hours / 24)
  // const months = Math.floor((difference / (1000 * 60 * 60 * 24 * 30) ))

  const display_time = (difference) => {
    let seconds = Math.floor(((current_date - song_date) / 1000) * 60)
    switch(seconds) {
      case (seconds < 60):
        return `${seconds} seconds ago`
      case (seconds < (60 * 60)):
        return `${seconds * 60} minutes ago`
      case (seconds = (60 * 60 * 24)):
        return `${seconds * 60 * 60} hour ago`
      case (seconds < (60 * 60 * 24)):
        return `${seconds * 60 * 60} hours ago`
      case (seconds < (60 * 60 * 24 * 30)):
        return `${seconds * 60 * 60 * 24} days ago`
      case (seconds < (60 * 60 * 24 * 30 * 12)):
        return `${seconds * 60 * 60 * 24 * 30} months ago`
      case (seconds >= (60 * 60 * 24 * 30 * 12)):
        return `${seconds * 60 * 60 * 24 * 30 * 12} years ago`
    }
  }



  // if (minutes < 1) {
  //   display_time = `${Math.floor(difference / 1000)} seconds ago`;
  // } else if (hours < 1) {
  //   if (minutes === 1) display_time = `${minutes} minute ago`;
  //   else display_time = `${minutes} minutes ago`;
  // } else if (hours < 24) {
  //   if (hours === 1) display_time = `${hours} hour ago`;
  //   else display_time = `${hours} hours ago`;
  // } else {
  //   if (hours < 48) display_time = `1 day ago`;
  //   else display_time = `${Math.floor(hours / 24)} days ago`;
  // }

  const clickToLike = () => {
    const song_likes = song.song_likes;

    if (song_likes[currentUser.id]) {
      dispatch(deleteLikeThunk(song.id, currentUser));
      // setIsLiked(false)
    } else {
      dispatch(addLikeThunk(song.id, currentUser));
      // setIsLiked(true)
    }
  };

  if (!Object.values(song).length) return null;

  return (
    <div className="song-show-page">
      <div className="song-header-container">
        <div className="left-header-container">
          <div className="play-artist-title-name-created">
            <div className="play-artist-title-name">
              <div className="show-play play" onClick={() => dispatch(playSong(song))}>
                {/* <button
                  className="show-play-button"
                  onClick={() => dispatch(playSong(song))}
                > */}
                <img
                  className="show-play-button-image"
                  src="https://user-images.githubusercontent.com/110946315/218660719-06946dea-1d7d-4d44-a1ff-294b973dc87a.jpg"
                  alt="orange play button"
                />
                {/* </button> */}
              </div>
              <div className="show-artist-title-name">
                <div className="show-artist-title">
                  {song.artist} - {song.title}
                </div>
                <Link to={`/users/${song?.user_id}`} className="show-name">{song.user?.display_name}</Link>
              </div>
            </div>
            <div className="created">{display_time}</div>
          </div>
          <div className="song-player"></div>
        </div>
        <div className="right-header-container">
          <div className="show-song-image-container">
            <img alt="" className="show-song-image" src={song.song_image_url} />
          </div>
        </div>
      </div>
      <div className="under-header-container">
        <div className="left-under-container">
          <div className="add-comment-form">
            <CreateComment />
          </div>
          <div className="song-interact-container">
            <button className={song.song_likes[currentUser?.id] ? "liked show-like-button" : "show-like-button"} onClick={clickToLike}>
              <i className="fa-solid fa-heart"></i>
            </button>
            <div className="show-likes-count link">
              <Link className="show-likes-link link" to={`/songs/${songId}/likes`}>
                <i className="fa-solid fa-heart link"></i>
                <p>{song.like_count}</p>
              </Link>
            </div>
            {currentUser && currentUser.id == song.user_id ? (
              <div className="edit-song-button">
                <OpenModalButton
                  className="edit-user-modal-button"
                  modalComponent={<UploadPage editSong={true} />}
                  buttonText={<i className="fa-regular fa-pen-to-square"></i>}
                />
              </div>
            ) : (
              ""
            )}
            {currentUser && currentUser.id == song.user_id ? (
              <div className="delete-song-button-container">
                <button
                  onClick={() =>
                    dispatch(deleteSongThunk(song.id)).then(() =>
                      history.push("/songs")
                    )
                  }
                  className="delete-song-button"
                >
                  <i className="fa-solid fa-trash"></i>
                </button>
              </div>
            ) : (
              ""
            )}
          </div>
          <div className="user-info-comments-container">
            <div className="left-user-container">
              <div className="user-pic-display-name">
                <div className="user-pic">
                  <img src={user?.profile_image_url ? user.profile_image_url : profPic} alt="profile picture"/>
                </div>
                <div className="user-page-disName">
                  {user?.display_name ? user.display_name : "No display name"}
                </div>
              </div>
            </div>
            <div className="right-info-comments-container">
              <div className="song-info-container"></div>
              <div className="show-comments-container">
                <SongPageComments />
              </div>
            </div>
          </div>
        </div>
        <div className="right-under-container">
          <div className="show-song-likes-container">
            <div className="song-likes-header">
              <Link className="show-likes-link link" to={`/songs/${song.id}/likes`}>
                <div className="show-likes-view-all">
                  <div className="show-likes-likes">
                    <i className="fa-solid fa-heart"></i>
                    <p>{song.like_count} likes</p>
                  </div>
                  <div className="show-view-all">
                    <p>View all</p>
                  </div>
                </div>
              </Link>
            </div>
            {/* <div className="users-liked">
                            <AllLikes />
                        </div> */}
          </div>
          <div className="disclaimers-lang">
            <div className="disclamers">
              <p>
                Legal &#x2022; Do Not Sell or Share My Personal Information
                &#x2022; Privacy &#x2022; Cookie Policy &#x2022; Cookie Manager
                &#x2022; Imprint &#x2022; Artist Resources &#x2022; Blog
                &#x2022; Charts &#x2022;
              </p>
            </div>
            <div className="lang">
              <p>Language: English (US)</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SongShow;
