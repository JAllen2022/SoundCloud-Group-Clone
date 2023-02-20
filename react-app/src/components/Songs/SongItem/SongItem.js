import { Link, useParams } from "react-router-dom";
import commentBox from "../../../assets/icons8-comments-30.png";
import OpenModalButton from "../../OpenModalButton";
import "./SongItem.css";
import UploadPage from "../../Navigation/Upload/UploadPage/UploadPage";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import {
  deleteSongThunk,
  playSong,
  addLikeThunk,
  deleteLikeThunk,
  isPlaying,
} from "../../../store/songs";
// import { useModal } from "../../../context/Modal";
// import pencil from "../../../assets/sc-pencil.png";

// import { deleteUserLike } from "../../../store/userPage";

const SongItem = ({ song }) => {
  const currentUser = useSelector((state) => state.session.user);
  // const user = useSelector((state) => state.UserPage.userProfile);
  const playS = useSelector((state) => state.Songs.playSong);
  const playerRef = useSelector((state) => state.Songs.playerRef);
  const playing = useSelector((state) => state.Songs.isPlaying);
  const dispatch = useDispatch();
  const { userId } = useParams();
  const [isLiked, setIsLiked] = useState(song.song_likes[currentUser?.id]);
  const pauseButton =
    "https://user-images.githubusercontent.com/110946315/219910407-770acf18-784f-4015-b12c-dc00450f6162.png";
  const playButton =
    "https://user-images.githubusercontent.com/110946315/218660719-06946dea-1d7d-4d44-a1ff-294b973dc87a.jpg";

  const showPlayButton = (
    <img
      className="play-button-image"
      src={playButton}
      alt="orange play button"
    />
  );

  const showPauseButton = (
    <img
      className="play-button-image"
      src={pauseButton}
      alt="orange play button"
    />
  );
  const [showButton, setShowButton] = useState(showPlayButton);

  const clickToLike = () => {
    const song_likes = song.song_likes;
    // console.log("what is song_likes", song_likes);
    // console.log("conditional", song_likes[currentUser.id]);

    if (song_likes[currentUser.id]) {
      dispatch(deleteLikeThunk(song.id, currentUser, userId));
      setIsLiked(false);
      // Update user page state as well
      // if(Object.values(user).length) dispatch(deleteUserLike(song.id,currentUser.id))
    } else {
      dispatch(addLikeThunk(song.id, currentUser));
      setIsLiked(true);
      // Update user page state as well
      // if(Object.values(user).length) dispatch(addUserLike(song.id,currentUser.id))
    }
  };

  function songAction() {
    if (playS.id !== song.id) {
      dispatch(playSong(song));
      setShowButton(showPauseButton);
      dispatch(isPlaying(true));
    } else if (playS.id == song.id) {
      // We want to try and pause it here
      if (!playerRef.current.audio.current.paused) {
        playerRef.current.audio.current.pause();
        setShowButton(showPlayButton);
      } else {
        playerRef.current.audio.current.play();
        setShowButton(showPauseButton);
      }
    }
  }

  useEffect(() => {
    if (playS.id !== song.id) {
      setShowButton(showPlayButton);
    }
    if (playS.id === song.id && playerRef.current.audio.current.play) {
      setShowButton(showPauseButton);
    }
  }, [playS.id]);

  useEffect(() => {
    if (playS.id == song.id) {
      if (!playing) setShowButton(showPlayButton);
      else setShowButton(showPauseButton);
    }
  }, [playing]);

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
          <div className="play" onClick={songAction}>
            {showButton}
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
                  : song?.user_display_name}
              </p>
            </Link>
            <Link className="title-link link" to={`/songs/${song?.id}`}>
              <p className="artist-title">
                {song?.artist} - {song?.title}
              </p>
            </Link>
          </div>
        </div>
        <div className="bottom-right-container">
          <div className="like-button-container">
            <button
              className={
                isLiked ? "liked like-button" : "not-liked like-button"
              }
              onClick={clickToLike}
            >
              <i className="fa-solid fa-heart"></i>
              <div className="song-like-count">{song?.like_count}</div>
            </button>
            {currentUser && currentUser.id == song?.user_id ? (
              <div className="edit-song-button">
                <OpenModalButton
                  className="edit-user-modal-button s"
                  modalComponent={
                    <UploadPage editSong={true} songEdit={song} />
                  }
                  // buttonText={<img className="pencil" src={pencil}/>}
                  buttonText={<i className="fa-solid fa-pencil fa-sm"></i>}
                />
              </div>
            ) : (
              ""
            )}
            {currentUser && currentUser.id == song?.user_id ? (
              <div className="delete-song-button-container">
                <button
                  onClick={() => dispatch(deleteSongThunk(song?.id))}
                  className="delete-song-button s"
                >
                  <i className="fa-solid fa-trash fa-sm"></i>
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
            <Link className="comment-link link" to={`/songs/${song?.id}`}>
              <div className="comment-box-container">
                <img src={commentBox} className="comment-box" alt="" />
                <div className="comment-count">{song?.comment_count}</div>
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
