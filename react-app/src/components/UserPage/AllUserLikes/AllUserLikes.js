import SongItem from "../../Songs/SongItem/SongItem";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loadUserThunk } from "../../../store/userPage";
import profPic from "../../../assets/profPic.jpeg";

const AllUserLikes = () => {
    // const currentUser =useSelector(state=>state.UserPage.userProfile);
    const user = useSelector(state => state.UserPage.userProfile);
    const dispatch = useDispatch();
    const {userId} = useParams();

    let userLikeArray;
    if(Object.values(user).length) {
        userLikeArray = user.user_likes.map(song =>
            <SongItem song={song} />
        )
    }

    useEffect(() => {
        dispatch(loadUserThunk(userId))
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
