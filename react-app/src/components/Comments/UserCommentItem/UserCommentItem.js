import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteCommentThunk } from "../../../store/comments";
import CreateComment from "../CreateComment/CreateComment";
import { Link } from "react-router-dom";
import "./UserCommentItem.css";
import moment from "moment";

const UserCommentItem = ({ comment }) => {
    const dispatch = useDispatch();

    const currentUser = useSelector(state => state.session.user);
    const [editing, setEditing] = useState(false);

    return (
        <div className='user-comment-individual-item-container'>
            <div className="user-comment-item-song-title-date-container">
                <Link className="user-comment-link" to={`/songs/${comment?.song.id}`}>
                <div className="user-comment-item-song-title-div">
                    on <span className="user-comment-on-song-title">{comment?.song.title}</span>
                    </div>
                </Link>
                <div className="user-comment-created-at">
                    {moment(comment?.created_at).fromNow()}
                </div>
            </div>
            <div className="user-comment-item-body">
                {editing ? <CreateComment currentComment={comment} setEditing={setEditing} /> : comment?.body}
            </div>
            {currentUser && currentUser.id == comment.user_id && (
                <div className="user-edit-delete-container">
                    <div className="edit-song-button">
                        <button onClick={(e) => setEditing(prev => !prev)} className="comment-edit-song-button"><i className="fa-solid fa-pencil fa-sm"></i></button>
                    </div>
                    <div className="delete-comment-container">
                        <button onClick={() => dispatch(deleteCommentThunk(comment.id))} className="delete-song-button"><i className="fa-solid fa-trash fa-sm"></i></button>
                    </div>
                </div>
            )}
        </div>
    )
};

export default UserCommentItem;
