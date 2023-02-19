import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getSongThunk,
  addLikeThunk,
  deleteLikeThunk,
  playSong,
  isPlaying
} from "../../../store/songs";
// import profPic from "../../../assets/profPic.jpeg";
import { Link } from "react-router-dom";
import CreateComment from "../../Comments/CreateComment/CreateComment";
import SongPageComments from "../../Comments/SongPageComments/SongPageComments";
import OpenModalButton from "../../OpenModalButton";
import UploadPage from "../../Navigation/Upload/UploadPage/UploadPage";
import { deleteSongThunk } from "../../../store/songs";
import moment from 'moment'
import "./SongShow.css";

const SongShow = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { songId } = useParams();
  const song = useSelector((state) => state.Songs.singleSong);
  const currentUser = useSelector((state) => state.session.user);
  const user = useSelector((state) => state.UserPage.userProfile);
  const playing = useSelector(state => state.Songs.isPlaying)
  const playS = useSelector(state => state.Songs.playSong)
  const playerRef = useSelector(state => state.Songs.playerRef)
   const pauseButton = "https://user-images.githubusercontent.com/110946315/219910407-770acf18-784f-4015-b12c-dc00450f6162.png";
  const playButton = "https://user-images.githubusercontent.com/110946315/218660719-06946dea-1d7d-4d44-a1ff-294b973dc87a.jpg";

  const showPlayButton = (
    <img
      className="show-play-button-image"
      src={playButton}
      alt="orange play button"
    />
  )

  const showPauseButton = (
    <img
      className="show-play-button-image"
      src={pauseButton}
      alt="orange play button"
    />
  )
  const [showButton, setShowButton] = useState(showPlayButton)


  useEffect(() => {
    dispatch(getSongThunk(songId));
  }, [dispatch, songId]);

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

  function songAction() {
    if (playS.id !== song.id) {
      dispatch(playSong(song))
      setShowButton(showPauseButton)
      dispatch(isPlaying(true))
    } else if (playS.id == song.id) {
      // We want to try and pause it here
      if (!playerRef.current.audio.current.paused) {
        playerRef.current.audio.current.pause();
        setShowButton(showPlayButton)
      }
      else {
        playerRef.current.audio.current.play();
        setShowButton(showPauseButton)
      }
    }
  }

  useEffect(() => {
    console.log(playerRef.current.audio.current.play)
    if (playS.id !== song.id) {
      setShowButton(showPlayButton)
    }
     if (playS.id === song.id && playerRef.current.audio.current.play) {
       setShowButton(showPauseButton)
     }
  }, [playS.id, song])

  useEffect(() => {
    if (playS.id == song.id) {
      if (!playing) setShowButton(showPlayButton)
      else setShowButton(showPauseButton)
    }
  },[playing])

  if (!Object.values(song).length) return null;
  const profPic = "https://user-images.githubusercontent.com/110946315/219914467-8f897a76-7950-4a7d-a20e-f67537f32254.jpeg";

  return (
    // <div className="song-show-page">
    <div className="page-outer-container">
        <div className="page-container">
      <div className="song-header-container">
        <div className="left-header-container">
          <div className="play-artist-title-name-created">
            <div className="play-artist-title-name">
              <div className="show-play play" onClick={songAction}>
                {showButton}
                {/* <img
                  className="show-play-button-image"
                  src="https://user-images.githubusercontent.com/110946315/218660719-06946dea-1d7d-4d44-a1ff-294b973dc87a.jpg"
                  alt="orange play button"
                /> */}
              </div>
              <div className="show-artist-title-name">
                <div className="show-artist-title">
                  {song.artist} - {song.title}
                </div>
                <Link to={`/users/${song?.user_id}`} className="show-name">{song.user?.display_name}</Link>
              </div>
            </div>
            <div className="created">{moment(song?.created_at).fromNow()}</div>
          </div>
          <div className="song-player"></div>
        </div>
        <div className="right-header-container">
          <div className="show-song-image-container">
            <img alt="" className="show-song-image" src={song.song_image_url} />
          </div>
        </div>
      </div>
        <div className="page-body-container">

        <div className="left-user-page-body-container">
          <div className="add-comment-form">
            <CreateComment />
          </div>
          <div className="song-interact-container">
            <div className="liked-edit-delete">
              <button className={song.song_likes[currentUser?.id] ? "liked show-like-button" : "show-like-button"} onClick={clickToLike}>
                <i className="fa-solid fa-heart"></i>
                <div className="like">
                  {song.song_likes[currentUser?.id] ? "Liked" : "Like"}
                </div>
              </button>
              {currentUser && currentUser.id == song.user_id ? (
                <div className="edit-song-button">
                  <OpenModalButton
                    className="edit-user-modal-button"
                    modalComponent={<UploadPage editSong={true} />}
                    buttonText={<i className="fa-solid fa-pencil fa-sm"></i>}
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
                    <i className="fa-solid fa-trash fa-sm"></i>
                  </button>
                </div>
              ) : (
                ""
              )}
            </div>
            <div className="show-likes-count link">
              <Link className="show-likes-link link" to={`/songs/${songId}/likes`}>
                <i className="fa-solid fa-heart link"></i>
                <div className="like-count">
                  <p>{song.like_count}</p>
                </div>
              </Link>
            </div>
          </div>
          <div className="user-info-comments-container">
            <div className="left-user-container">
              <div className="user-pic-display-name">
                <div className="user-pic">
                  <Link to={`/users/${song.user_id}`}><img className="song-user-img" src={song.user?.profile_image_url ? song.user.profile_image_url : profPic} alt="user profile" /></Link>
                </div>
                <div className="user-page-disName">
                <Link className="link" to={`/users/${song.user_id}`}>{song.user?.display_name ? song.user.display_name : "No display name"}</Link>
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
        <div className="right-user-page-body-container">
          <div className="show-song-likes-container">
            <Link className="show-likes-link link show-song-like-link-cont" to={`/songs/${song.id}/likes`}>
              <div className="show-likes-view-all">
                <div className="show-likes-likes">
                  <i className="fa-solid fa-heart show"></i>
                  <div>{song.like_count} likes</div>
                </div>
                <div className="show-view-all">
                  <p>View all</p>
                </div>
              </div>
            </Link>
            {/* <div className="users-liked">
                            <AllLikes />
                        </div> */}
          </div>
          <div className="disclaimers-lang">
            <div className="disclaimers-container">
              <div className="disclaimers">
                Legal &#x2022; Do Not Sell or Share My Personal Information
                &#x2022; Privacy &#x2022; Cookie Policy &#x2022; Cookie Manager
                &#x2022; Imprint &#x2022; Artist Resources &#x2022; Blog
                &#x2022; Charts &#x2022;
              </div>
            </div>
            <div className="lang-cont">
              <div className="lang">Language: </div><p> English (US)</p>
            </div>
          </div>
        </div>


        </div>
        </div>
    </div>
  );
};

export default SongShow;
