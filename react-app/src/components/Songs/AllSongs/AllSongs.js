import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSongsThunk } from "../../../store/songs";
import SongItem from "../SongItem/SongItem";
import "./AllSongs.css";

const AllSongs = () => {
    const dispatch = useDispatch();
    const allSongs = useSelector((state) => state.Songs.allSongs);
    const allSongsArr = Object.values(allSongs);
    // console.log(allSongsArr)

    useEffect(() => {
        dispatch(getSongsThunk());
    }, [dispatch]);

    if (!allSongs) return null;

    const songItems = allSongsArr.map((song) => {
        return <SongItem key={song.id} song={song} />;
    });

    return (
        <>
        <p className="all-songs-header"> Here are the lastest songs </p>
        <div className="songs-container">
            <ul className="songs-wrapper">{songItems}</ul>
        </div>
        </>
    );
};

export default AllSongs;
