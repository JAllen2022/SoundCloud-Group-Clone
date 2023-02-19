import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getSongThunk } from "../../../store/songs";
import './AllSongLikes.css'

const AllSongLikes = () => {
    const dispatch = useDispatch();
    const { songId } = useParams();
    const songLikes = useSelector((state) => state.Songs.singleSong.song_likes);
    const song = useSelector(state => state.Songs.singleSong)
    // console.log("songLikes: ", songLikes)

    useEffect(() => {
        if (!Object.values(song).length) dispatch(getSongThunk(songId));
    }, [dispatch, songId]);

    let songLikeItems;

    if (songLikes && Object.values(songLikes).length) {
        const songLikesArr = Object.values(songLikes);
        songLikeItems = songLikesArr.map((user) => (
            <div className="song-likes-user-prof-container">
                <Link to={`/users/${user?.id}`}>
                    <div className="asl-user-pic">
                        <img className='asl-user-image' alt={user?.display_name} src={user?.profile_image_url}/>
                    </div>
                    <div className="asl-user-display-name">
                        <p className='asl-display-name'>{user?.display_name}</p>
                    </div>
                </Link>
            </div>
        ))
    }

    // if (!Object.values(songLikes).length) return null;

    // asl = all song likes
    return (
        <div className="page-outer-container">
            <div className="page-container">
                <div className="asl-header">
                    <Link to={`songs/${song.id}`}>
                        <div className="asl-image-title-container">
                            <img className="asl-song-image" src={song?.song_image_url} alt={song?.title} />
                            <h1 className="asl-title">{song?.title}</h1>
                        </div>
                    </Link >
                    <div className="asl-tab-container">
                        <h2 className='asl-tab-title'>Likes</h2>
                    </div>
                </div>
                <div className='asl-main-title'>
                    <div className="asl-body">
                        {songLikeItems}
                    </div>
                </div>

            </div>
        </div>
    )

}

export default AllSongLikes;

// const UserProfilePic = () => {
//     const dispatch = useDispatch();
//     const { songId } = useParams();
//     const songLikes = useSelector((state) => state.Songs.singleSong.song_likes);
//     console.log("songLikes: ", songLikes)
//     useEffect(() => {
//         dispatch(getSongThunk(songId));
//     }, [dispatch, songId]);

//     let songLikeItems;
//     if (Object.values(songLikes).length) {
//         const songLikesArr = Object.values(songLikes);
//         songLikeItems = songLikesArr.map((user) => (
//             <div className="song-likes-user-prof-container">
//                 <div className="user-pic">
//                     {user?.profile_image_url}
//                 </div>
//                 <div className="user-display-name">
//                     {user?.display_name}
//                 </div>
//             </div>

//         ))
//     }
// }
