import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
// import { getUserSongsThunk } from "../../../store/songs";
// import SongItem from "../../Songs/SongItem/SongItem";
import { playSong } from "../../../store/songs";
import "./UserPageLikes.css";
import { Link } from "react-router-dom";
import commentBox from "../../../assets/icons8-comments-30.png";
import { getUserLikedSongsThunk, isPlaying } from "../../../store/songs";
import { loadUserThunk } from "../../../store/userPage";

const UserPageLikes = () => {
    const { userId } = useParams();
    const dispatch = useDispatch();
    const userLikedSongs = useSelector((state) => state.Songs.userLikedSongs);


    let userLikesArray;
    if (Object.values(userLikedSongs).length) {
        // Only show the first 7 songs the user has liked
        const tempArray = Object.values(userLikedSongs).slice(0, 7);
        userLikesArray = tempArray.map((song) => (
            <UserPageLikeItem key={song.id} song={song} />
        ));
    }

    useEffect(() => {
        // If the User Liked Songs is an empty object
        if (Object.values(userLikedSongs).length) {
            // Get User information, User Uploaded Songs, and User Liked Songs
            dispatch(loadUserThunk(userId));
            dispatch(getUserLikedSongsThunk(userId));
        }
    }, [dispatch, userId]);


    return (
        <div className="user-page-likes-outer-container">
            <div className="user-page-likes-header-container">
                <Link
                    className="user-page-likes-link-container"
                    to={`/users/${userId}/likes`}
                >
                    <div className="user-page-likes-container">
                        <p className="user-page-like-p-tags">
                            <i className="fa-solid fa-heart"></i>
                            {Object.values(userLikedSongs).length} likes
                        </p>
                    </div>
                    <div className="user-page-likes-show-view-all">
                        <p className="user-page-like-p-tags">View all</p>
                    </div>
                </Link>
            </div>
            <ul className="user-page-likes-item-container">{userLikesArray}</ul>
        </div>
    );
};

export default UserPageLikes;

const UserPageLikeItem = ({ song }) => {
    const dispatch = useDispatch();
    const currentUser = useSelector((state) => state.session.user);
    const playS = useSelector(state => state.Songs.playSong)
    const playerRef = useSelector(state => state.Songs.playerRef)
    const playing = useSelector(state => state.Songs.isPlaying)
    const pauseButton = "https://user-images.githubusercontent.com/110946315/226770796-edff1925-616f-4748-8d6c-29b790fe13d6.png";
    const playButton = "https://user-images.githubusercontent.com/110946315/218660719-06946dea-1d7d-4d44-a1ff-294b973dc87a.jpg";

    const showPlayButton = (
        <img
            className="up-likes-song-play-button-image"
            src={playButton}
            alt="orange play button"
        />
    )

    const showPauseButton = (
        <img
            className="up-likes-song-play-button-image"
            src={pauseButton}
            alt="orange play button"
        />
    )
    const [showButton, setShowButton] = useState(showPlayButton)

    // console.log("checking current user", currentUser);
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
        if (playS.id !== song.id) {
            setShowButton(showPlayButton)
        }
        if (playS.id === song.id && playerRef.current.audio.current.play) {
            setShowButton(showPauseButton)
        }
    }, [playS.id])

    useEffect(() => {
        if (playS.id == song.id) {
            if (!playing) setShowButton(showPlayButton)
            else setShowButton(showPauseButton)
        }
    }, [playing])

    return (
        <div className="up-likes-song-item-container">
            <div className="up-likes-song-image-play-container">
                <img
                    src={song.song_image_url}
                    alt={song.title}
                    className="up-likes-song-image"
                />
                <div
                    className="up-likes-song-play-container"
                    onClick={songAction}
                >
                    {showButton}
                </div>
            </div>
            <div className="up-likes-right-item-info-container">
                <div className="up-likes-play-displayName-title">
                    <Link
                        className="up-likes-link-container"
                        to={`/users/${song.user_id}`}
                    >
                        <p className="up-likes-displayName">
                            {currentUser.id == song.user_id
                                ? currentUser.display_name
                                : song.user_display_name}
                        </p>
                    </Link>
                    <Link className="up-likes-link-container" to={`/songs/${song.id}`}>
                        <p className="up-likes-artist-title">
                            {song.artist} - {song.title}
                        </p>
                    </Link>
                </div>
                <div className="up-likes-bottom-right-container">
                    <Link to={`/songs/${song.id}/likes`}>
                        <div className="up-likes-like-button">
                            <i className="fa-solid fa-heart"></i>
                            {song.like_count}
                        </div>
                    </Link>
                    <Link className="up-likes-comment-link link" to={`/songs/${song.id}`}>
                        <div className="comment-box-container">
                            <img src={commentBox} className="comment-box" alt="" />
                            <div className="up-likes-comment-count">
                                {song.comment_count}
                            </div>
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    );
};
