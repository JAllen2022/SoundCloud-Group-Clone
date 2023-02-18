import SongItem from "../../Songs/SongItem/SongItem";
import React, { useEffect } from "react";
import { useParams, Link  } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loadUserThunk } from "../../../store/userPage";
import { getUserLikedSongsThunk } from "../../../store/songs";
import profPic from "../../../assets/profPic.jpeg";
import './AllUserLikes.css'


const AllUserLikes = () => {
    // const currentUser =useSelector(state=>state.UserPage.userProfile);
    const userLikedSongs = useSelector((state) => state.Songs.userLikedSongs);
    const user = useSelector(state => state.UserPage.userProfile);
    const dispatch = useDispatch();
    const {userId} = useParams();

    // console.log("userPage :", user);
    // console.log("userLikedSong, AllUserlikes :", userLikedSongs)

    let userLikeArray;
    if(Object.values(userLikedSongs).length) {
        userLikeArray = Object.values(userLikedSongs).map((song) => (<SongItem key={song.id} song={song} />)
        )
    }

    // console.log("userLikeArray", userLikeArray)

    useEffect(() => {
        // If User is not loaded into state, dispatch for it
        dispatch(loadUserThunk(userId))
        // If User Liked Songs is not loaded into state, dispatch for it
        dispatch(getUserLikedSongsThunk(userId));
    },[dispatch, userId])

    // return (
    //     <div className="asl-page">
    //         <div className="asl-header">
    //             <Link to={`songs/${song.id}`}>
    //                 <div className="asl-image-title-container">
    //                     <img className="asl-song-image" src={song?.song_image_url} alt={song?.title} />
    //                     <h1 className="asl-title">{song?.title}</h1>
    //                 </div>
    //             </Link >
    //             <div className="asl-tab-container">
    //                 <h2 className='asl-tab-title'>Likes</h2>
    //             </div>
    //         </div>
    //         <div className='asl-main-title'>
    //             <div className="asl-body">
    //                 {songLikeItems}
    //             </div>
    //         </div>
    //     </div>
    // )
    return (
        <div className="aul-page">
            <div className="aul-header">
                <Link to={`users/${user.id}`}>
                    <div className="aul-image-title-container">
                        <img className="aul-prof-image" src={user?.profile_image_url ? user.profile_image_url : profPic} alt={user?.display_name} />
                        <h1 className="aul-likes-name">Likes by {user.display_name}</h1>
                    </div>
                </Link >
                <div className="aul-tab-container">
                    <h2 className='aul-tab-title'>Likes</h2>
                </div>
            </div>
            <div className="aul-main-title">
                <div className="aul-body">
                    {userLikeArray}
                </div>
            </div>
        </div>
    )
}

export default AllUserLikes;
