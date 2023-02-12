import { Link } from "react-router-dom";
import playButton from "../../assets/orange-play-btn.png";
import commentBox from "../../assets/icons8-comments-30.png";

// --------------------------------------- WARNING!!!!!!!!!!! -----------------------------------
// -------------------------------add user to song to_dict() method -----------------------------
// add likes_count method

// songLikes = song.song_likes
// songLikesArr = Object.values(songLikes)
// numLikes = songLikesArr.length

const SongItem = ({ song }) => {

    return (
        <div className="song-item-container">
            <div className="song-image">
                <Link className="image-link" to={`/songs/${song.id}`}>
                    <img src={song.song_image_url} alt={song.title} className="song_image" />
                </Link>
            </div>
            <div className="right-item-info-container">
                <div className="play-dislayName-title">
                    <div className="play">
                        <button className="play-button" type="button">
                            <img className='play-button-image' src={playButton} alt='orange play button' />
                        </button>
                    </div>
                    <div className="displayName-title">
                        <Link className="displayName-link" to={`/users/${song.user.id}`}>
                            <p className="displayName">{song.user.display_name}</p>
                        </Link>
                        <Link className="title-link" to={`/songs/${song.id}`}>
                            <p className="artist-title">{song.artist} - {song.title}</p>
                        </Link>
                    </div>
                </div>
                <div className="bottom-right-container">
                    <div className="like-button-container">
                        <button className="like-button">
                            <i className="fa-solid fa-heart"></i>
                        </button>
                        <div className="likes-count">
                            <p>likes count</p>
                        </div>
                    </div>
                    <div className="comment-button-container">
                        <Link className="comment-link" to={`/songs/${song.id}`}>
                            <img src={commentBox} className="comment-box" alt=""/>
                            <p>comments count</p>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SongItem;
