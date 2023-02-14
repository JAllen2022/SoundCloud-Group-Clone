import { Link } from "react-router-dom";
import playButton from "../../../assets/orange-play-btn.png";
import commentBox from '../../../assets/icons8-comments-30.png';
import './SongItem.css'
// --------------------------------------- WARNING!!!!!!!!!!! -----------------------------------
// -------------------------------add user to song to_dict() method -----------------------------
// add likes_count method

// songLikes = song.song_likes
// songLikesArr = Object.values(songLikes)
// numLikes = songLikesArr.length

const SongItem = ({ song }) => {

    return (
        <div className="song-item-container">
            <div className="song-image-container">
                <Link className="image-link" to={`/songs/${song.id}`}>
                    <img src={song.song_image_url} alt={song.title} className="song-image" />
                </Link>
            </div>
            <div className="right-item-info-container">
                <div className="play-displayName-title">
                    <div className="play">
                        <img className='play-button-image' src='https://user-images.githubusercontent.com/110946315/218660719-06946dea-1d7d-4d44-a1ff-294b973dc87a.jpg' alt='orange play button' />
                    </div>
                    <div className="displayName-title">
                        <Link className="displayName-link link" to={`/users/${song.user.id}`}>
                            {/* {song.user.display_name} this seems like it doesnt work but
                            we just have to add display names to our seeders */}
                            {/* {song.user.username} */}
                            <p className="displayName link">{song.user.display_name}</p>
                        </Link>
                        <Link className="title-link link" to={`/songs/${song.id}`}>
                            <p className="artist-title">{song.artist} - {song.title}</p>
                        </Link>
                    </div>
                </div>
                <div className="bottom-right-container">
                    <div className="like-button-container">
                        <button className="like-button">
                            <i className="fa-solid fa-heart"></i>
                            {song.like_count}
                        </button>
                        {/* <div className="likes-count">
                            <p className="bottom-right-container-p"></p>
                        </div> */}
                    </div>
                    <div className="comment-button-container">
                        <Link className="comment-link link" to={`/songs/${song.id}`}>
                            <div className="comment-box-container">
                                <img src={commentBox} className="comment-box" alt=""/>
                                {song.comment_count}
                            </div>
                            {/* <p className="bottom-right-container-p link"></p> */}
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SongItem;
