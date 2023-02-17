import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getSongThunk } from "../../../store/songs";

const AllSongLikes = () => {
  const dispatch = useDispatch();
  const { songId } = useParams();
  const songLikes = useSelector((state) => state.Songs.singleSong.song_likes);
    console.log("songLikes: ", songLikes)
  useEffect(() => {
    dispatch(getSongThunk(songId));
  }, [dispatch, songId]);

  if (!Object.values(songLikes).length) return null;

  return (
    <div>
      hi
    </div>
  )

}

export default AllSongLikes;
