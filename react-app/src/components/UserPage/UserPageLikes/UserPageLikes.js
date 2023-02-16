import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUserSongsThunk } from "../../../store/songs";
import SongItem from "../../Songs/SongItem/SongItem";
import { playSong } from "../../../store/songs";
import "./UserPageLikes.css";
import { Link } from "react-router-dom";
import commentBox from "../../../assets/icons8-comments-30.png";

const UserPageLikes = () => {
    const { userId } = useParams();
    // const userLikes = useSelector(state => state.UserPage.userProfile.user_likes);

    const user = useSelector(state => state.UserPage.userProfile);

    let userLikesArray;
    if (user.user_likes) {
        // Only show the first 7 songs the user has liked
        const tempArray = user.user_likes.slice(0,7)
        console.log('we here', tempArray)
        userLikesArray = tempArray.map(song => (
            <UserPageLikeItem song={song} />
        ))
    }

    // <div className="likes-count">
    //     <i className="fa-solid fa-heart"></i>
    //     <div className="num-likes">
    //         {userLikesArray.length} likes
    //     </div>
    // </div>
    // <div className="View All">

    // </div>

    return (
        <div className="user-page-likes-container">
            <div className="user-page-likes-header">
                <Link className="user-likes-link" to={`/users/${userId}/likes`}>
                    <div className="user-likes-view-all">
                        <div className="user-likes-likes">
                            <i className="fa-solid fa-heart"></i>
                            <p>{user.user_likes?.length} likes</p>
                        </div>
                        <div className="show-view-all">
                            <p>View all</p>
                        </div>
                    </div>
                </Link>
            </div>
            {userLikesArray}
        </div>
    )
}

export default UserPageLikes;

const UserPageLikeItem = ({ song }) => {
    const dispatch = useDispatch();
    const currentUser = useSelector(state => state.session.user)

    console.log("checking current user", currentUser)

    return (
        <div className="up-likes-song-item-container">
            <div className="up-likes-song-image-play-container">
                <Link className="up-image-link" to={`/songs/${song.id}`}>
                    <img
                        src={song.song_image_url}
                        alt={song.title}
                        className="up-song-image"
                    />
                </Link>
                <div className="play" onClick={() => dispatch(playSong(song))}>
                    <img
                        className="play-button-image"
                        src="https://user-images.githubusercontent.com/110946315/218660719-06946dea-1d7d-4d44-a1ff-294b973dc87a.jpg"
                        alt="orange play button"
                    />
                </div>
            </div>
            <div className="up-likes-right-item-info-container">
                <div className="up-likes-play-displayName-title">
                    <div className="up-likes-displayName-title">
                        <Link
                            className="up-likes-displayName-link link"
                            to={`/users/${song.user_id}`}
                        >
                            {/* {song.user.display_name} this seems like it doesnt work but
                            we just have to add display names to our seeders */}
                            {/* {song.user.username} */}
                            <p className="up-likes-displayName link">
                                {currentUser.id == song.user_id
                                    ? currentUser.display_name
                                    : song.user_display_name}
                            </p>
                        </Link>
                        <Link className="up-likes-title-link link" to={`/songs/${song.id}`}>
                            <p className="up-likes-artist-title">
                                {song.artist} - {song.title}
                            </p>
                        </Link>
                    </div>
                </div>
                <div className="up-likes-bottom-right-container">
                    <div className="up-likes-like-button-container">
                        <Link to={`/songs/${song.Id}/likes`}>
                            <div className="up-likes-like-button" >
                                <i className="fa-solid fa-heart"></i>
                                {song.like_count}
                            </div>
                        </Link >
                    </div>
                    <div className="up-likes-comment-button-container">
                        <Link className="up-likes-comment-link link" to={`/songs/${song.id}`}>
                            <div className="up-likes-comment-box-container">
                                <img src={commentBox} className="up-likes-comment-box" alt="" />
                                {song.comment_count}
                            </div>
                            {/* <p className="bottom-right-container-p link"></p> */}
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
