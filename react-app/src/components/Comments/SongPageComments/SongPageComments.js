import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { loadSongCommentsThunk } from '../../../store/comments';
// import CreateComment from '../CreateComment/CreateComment';
import commentBox from '../../../assets/icons8-comments-30.png';
import SongCommentItem from '../SongCommentItem/SongCommentItem';
import "./SongPage.css";

const SongPageComments = () => {
    const dispatch = useDispatch();
    const songComments = useSelector((state) => state.Comments.song)
    const song = useSelector(state => state.Songs.singleSong)
    // console.log(song);
    // const songComments = song.comments
    // console.log("songComments :", songComments)
    let songCommentsArr;
    if (songComments) songCommentsArr = Object.values(songComments);
    // console.log(songCommentsArr)
    const { songId } = useParams();

    useEffect(() => {
        dispatch(loadSongCommentsThunk(songId))
    }, [dispatch, songId])


    const commentItems = songCommentsArr.map((comment) => {
        return <SongCommentItem key={comment.id} comment={comment} song={song}/>
    })

    if (!Object.values(songComments).length || !Object.values(song).length) return null;

    return (
        <div className='song-comments-container'>
            <div className='song-comments-header'>
                <img src={commentBox} className="comment-box" alt=""/>
                <p>{songCommentsArr.length} comments</p>
            </div>
            <div className='song-comments-area'>
                <ul className='song-comment-wrapper'>
                    {commentItems}
                </ul>
            </div>
        </div>
    )
}

export default SongPageComments;
