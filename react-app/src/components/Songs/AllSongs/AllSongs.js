import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSongsThunk } from "../../../store/songs";
import SongItem from "../SongItem/SongItem";
import "./allSongs.css";



const AllSongs = () => {
    const dispatch = useDispatch();
    const allSongs = useSelector((state) => state.Songs.allSongs);
    const allSongsArr = Object.values(allSongs)

    useEffect(() => {
        dispatch(getSongsThunk())
    }, [dispatch])

    if (!allSongs) return null;

    const songItems = allSongsArr.map((song) => {
        return <SongItem key={song.id} song={song} />
    })

    return (
        <div className="songs-container">
            <h1> All Songs </h1>
            <ul className="songs-wrapper">
                {songItems}
            </ul>
        </div>
    )
}

export default AllSongs;
