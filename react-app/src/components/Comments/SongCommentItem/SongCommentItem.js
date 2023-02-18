import "./SongCommentItem.css";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import profPic from "../../../assets/profPic.jpeg";
import { deleteCommentThunk } from "../../../store/comments";
import CreateComment from "../CreateComment/CreateComment";

const SongCommentItem = ({ comment, song }) => {
  const dispatch = useDispatch();

  const currentUser = useSelector(state => state.session.user);
  // const user = useSelector((state) => state.UserPage.user);

  const [editing, setEditing] = useState(false);

  return (
    <div className="song-comment-item-container">
      <div className="creator-pic">
        <img
          className="prof-pic"
          src={
            comment.user?.profile_image_url
              ? comment.user.profile_image_url
              : profPic
          }
          alt=""
        />
      </div>
      <div className="user-name-time-created-at-body">
        <div className="username-time-created-at">
          <div className="username-time">
            <div className="creator-name">
              {comment.user?.username} at {comment?.time}
            </div>
          </div>
          <div className="comment-created-at">{comment?.created_at}</div>
        </div>
        <div className="comment-body">
          {editing ? (
            <CreateComment currentComment={comment} setEditing={setEditing} />
          ) : (
            comment?.body
          )}
        </div>
      </div>
      {currentUser && currentUser.id == comment.user_id && (
        <div className="edit-delete-container">
          <div className="edit-comment-container">
            <button
              onClick={(e) => setEditing((prev) => !prev)}
              className="edit-comment-button"
            >
              <i className="fa-solid fa-pencil fa-sm"></i>
            </button>
          </div>
          <div className="delete-comment-container">
            <button
              onClick={() => dispatch(deleteCommentThunk(comment.id))}
              className="delete-comment-button"
            >
              <i className="fa-solid fa-trash fa-sm"></i>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SongCommentItem;
