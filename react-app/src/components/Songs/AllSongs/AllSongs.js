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

  let songItems;
  if (Object.values(allSongs).length) {
    songItems = allSongsArr.map((song) => {
      return <SongItem key={song.id} song={song} />;
    });
  }

  // console.log("checking song items", allSongsArr);

  if (!Object.values(allSongs).length) return null;
  return (
    <>
      <h2 className="all-songs-header"> Here are the lastest songs: </h2>
      <div className="songs-container">
        <ul className="songs-wrapper">{songItems}</ul>
      </div>
    </>
  );
};

export default AllSongs;
