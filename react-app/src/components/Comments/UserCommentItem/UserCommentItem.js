import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteCommentThunk } from "../../../store/comments";
import CreateComment from "../CreateComment/CreateComment";
import "./userCommentItem.css";


const UserCommentItem = ({ comment }) => {
    const dispatch = useDispatch();

    const currentUser = useSelector(state => state.session.user);
    const [editing, setEditing] = useState(false);

    return (
        <div className='user-comment-item-container'>
            <div className="on-song-created-at">
                <div className="comments-post">
                    on {comment.song}
                </div>
                <div className="comment-created-at">
                    {comment?.created_at}
                </div>
            </div>
            <div className="comment-body">
                {editing ? <CreateComment currentComment={comment} setEditing={setEditing} /> : comment?.body}
            </div>
            {currentUser && currentUser.id == comment.user_id && (
                <div className="edit-delete-container">
                    <div className="edit-comment-container">
                        <button onClick={(e) => setEditing(prev => !prev)} className="edit-comment-button"><i className="fa-regular fa-pen-to-square"></i></button>
                    </div>
                    <div className="delete-comment-container">
                        <button onClick={() => dispatch(deleteCommentThunk(comment.id))} className="delete-comment-button"><i className="fa-solid fa-trash"></i></button>
                    </div>
                </div>
            )}
        </div>
    )
};

export default UserCommentItem;
