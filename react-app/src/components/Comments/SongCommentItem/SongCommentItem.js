import "./SongCommentItem.css";
import { useSelector, useDispatch } from "react-redux";
import profPic from "../../../assets/profPic.jpeg";
const SongCommentItem = ({ comment, song }) => {
    const dispatch = useDispatch();

    const currentUser = useSelector(state => state.session.user);

    return (
        <div className='song-comment-item-container'>
            <div className="creator-pic">
                <img className="prof-pic" src={profPic} alt="" />
            </div>
            <div className="username-time-body-created-at">
                <div className="username-time">
                    <div className="creator-name">
                        {comment.user.username} at {comment?.time}
                    </div>
                </div>
                <div className="comment-created-at">
                    {comment?.created_at}
                </div>
            </div>
            <div className="comment-body">
                {comment?.body}
            </div>
        </div>
    )
}

export default SongCommentItem;
