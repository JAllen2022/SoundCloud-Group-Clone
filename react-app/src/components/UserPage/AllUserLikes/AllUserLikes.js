import SongItem from "../../Songs/SongItem/SongItem";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loadUserThunk } from "../../../store/userPage";
import { getUserLikedSongsThunk } from "../../../store/songs";
import profPic from "../../../assets/profPic.jpeg";

const AllUserLikes = () => {
    // const currentUser =useSelector(state=>state.UserPage.userProfile);
    const userLikedSongs = useSelector((state) => state.Songs.userLikedSongs);
    const user = useSelector(state => state.UserPage.userProfile);
    const dispatch = useDispatch();
    const {userId} = useParams();

    console.log("userPage :", user);
    console.log("userLikedSong, AllUserlikes :", userLikedSongs)

    let userLikeArray;
    if(Object.values(userLikedSongs).length) {
        userLikeArray = Object.values(userLikedSongs).map((song) => (<SongItem key={song.id} song={song} />)
        )
    }

    console.log("userLikeArray", userLikeArray)

    useEffect(() => {
        // If User is not loaded into state, dispatch for it
        dispatch(loadUserThunk(userId))
        // If User Liked Songs is not loaded into state, dispatch for it
        dispatch(getUserLikedSongsThunk(userId));
    },[dispatch, userId])


    return (
        <div className="all-user-likes-container">
            <div className="all-user-likes-header">
                <div className="user-likes-pic">
                    <img className="user-likes-prof-pic" src={user?.profile_image_url ? user.profile_image_url : profPic} alt="" />
                </div>
                <div className="likes-by">
                    Likes by {user.display_name}
                </div>
            </div>
            <div className="all-user-comments">
                {userLikeArray}
            </div>
        </div>
    )
}

export default AllUserLikes;
