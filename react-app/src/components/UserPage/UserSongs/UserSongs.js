import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUserSongsThunk } from "../../../store/songs";
import SongItem from "../../Songs/SongItem/SongItem";
import "./UserSongs.css";

const UserSongs = () => {
    const dispatch = useDispatch();
    const userSongs = useSelector(state => state.Songs.userSongs);
    console.log("userSongs :", userSongs);
    const user = useSelector(state => state.UserPage.userProfile);
    const { userId } = useParams();

    let userSongsArr;
    let userSongItems;
    if (userSongs) {
        userSongsArr = Object.values(userSongs);
        userSongItems = userSongsArr.map((song) => {
            return <SongItem key={song.id} song={song} />
        })
    }
    console.log("userSongArr :", userSongsArr)

    useEffect(() => {
        dispatch(getUserSongsThunk(userId))
    }, [dispatch, userId])


    if (!user || !userSongs) return null;

    return (
        <div className="user-songs-header">
            <div className="user-songs-container">
                {userSongItems}
            </div>
        </div>
    )
}

export default UserSongs;
