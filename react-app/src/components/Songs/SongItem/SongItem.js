import { Link } from "react-router-dom";
import playButton from "../../../assets/orange-play-btn.png";
import { useParams } from "react-router-dom";
import commentBox from "../../../assets/icons8-comments-30.png";
import OpenModalButton from "../../OpenModalButton";
import "./SongItem.css";
import UploadPage from "../../Navigation/Upload/UploadPage/UploadPage";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { deleteSongThunk, playSong } from "../../../store/songs";
import { useModal } from "../../../context/Modal";
import {
  getSongThunk,
  addLikeThunk,
  deleteLikeThunk,
} from "../../../store/songs";
import { deleteUserLike } from "../../../store/userPage";

// add likes_count method

// songLikes = song.song_likes
// songLikesArr = Object.values(songLikes)
// numLikes = songLikesArr.length
const SongItem = ({ song }) => {
  const currentUser = useSelector((state) => state.session.user);
  const user = useSelector((state) => state.UserPage.userProfile);
  const dispatch = useDispatch();
  // const currentSong = useSelector(state => state.Songs.singleSong)
  const { closeModal } = useModal();
  const { userId } = useParams();


  // const userSongs = useSelector(state => state.Songs.userSongs);
  // const { userId } = useParams();

  const clickToLike = () => {
    const song_likes = song.song_likes;
    console.log("what is song_likes", song_likes);
    console.log("conditional", song_likes[currentUser.id]);

    if (song_likes[currentUser.id]) {
      dispatch(deleteLikeThunk(song.id, currentUser, userId));
      // Update user page state as well
      // if(Object.values(user).length) dispatch(deleteUserLike(song.id,currentUser.id))
    } else {
      dispatch(addLikeThunk(song.id, currentUser));
      // Update user page state as well
      // if(Object.values(user).length) dispatch(addUserLike(song.id,currentUser.id))
    }
  };

  return (
    <div className="song-item-container">
      <div className="song-image-container">
        <Link className="image-link" to={`/songs/${song.id}`}>
          <img
            src={song.song_image_url}
            alt={song.title}
            className="song-image"
          />
        </Link>
      </div>
      <div className="right-item-info-container">
        <div className="play-displayName-title">
          <div className="play" onClick={()=> dispatch( playSong(song))}>
            <img
              className="play-button-image"
              src="https://user-images.githubusercontent.com/110946315/218660719-06946dea-1d7d-4d44-a1ff-294b973dc87a.jpg"
              alt="orange play button"
            />
          </div>
          <div className="displayName-title">
            <Link
              className="displayName-link link"
              to={`/users/${song.user_id}`}
            >
              {/* {song.user.display_name} this seems like it doesnt work but
                            we just have to add display names to our seeders */}
              {/* {song.user.username} */}
              <p className="displayName link">
                {currentUser.id == song.user_id
                  ? currentUser.display_name
                  : song.user_display_name}
              </p>
            </Link>
            <Link className="title-link link" to={`/songs/${song.id}`}>
              <p className="artist-title">
                {song.artist} - {song.title}
              </p>
            </Link>
          </div>
        </div>
        <div className="bottom-right-container">
          <div className="like-button-container">
            <button className="like-button" onClick={clickToLike}>
              <i className="fa-solid fa-heart"></i>
              {song.like_count}
            </button>
            {currentUser && currentUser.id == song.user_id ? (
              <div className="edit-song-button">
                <OpenModalButton
                  className="edit-user-modal-button"
                  modalComponent={
                    <UploadPage editSong={true} songEdit={song} />
                  }
                  buttonText={<i className="fa-regular fa-pen-to-square"></i>}
                />
              </div>
            ) : (
              ""
            )}
            {currentUser && currentUser.id == song.user_id ? (
              <div className="delete-song-button-container">
                <button
                  onClick={() => dispatch(deleteSongThunk(song.id))}
                  className="delete-song-button"
                >
                  <i className="fa-solid fa-trash"></i>
                </button>
              </div>
            ) : (
              ""
            )}
            {/* <div className="likes-count">
                            <p className="bottom-right-container-p"></p>
                        </div> */}
          </div>
          <div className="comment-button-container">
            <Link className="comment-link link" to={`/songs/${song.id}`}>
              <div className="comment-box-container">
                <img src={commentBox} className="comment-box" alt="" />
                {song.comment_count}
              </div>
              {/* <p className="bottom-right-container-p link"></p> */}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SongItem;
