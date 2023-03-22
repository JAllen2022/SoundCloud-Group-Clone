import "./SongCommentItem.css";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
// import profPic from "../../../assets/profPic.jpeg";
import { deleteCommentThunk } from "../../../store/comments";
import CreateComment from "../CreateComment/CreateComment";
import moment from 'moment'
import { Link } from "react-router-dom";

const SongCommentItem = ({ comment, song }) => {
  const dispatch = useDispatch();

  const currentUser = useSelector(state => state.session.user);
  // const user = useSelector((state) => state.UserPage.user);

  const [editing, setEditing] = useState(false);
  const profPic = "https://user-images.githubusercontent.com/110946315/219914467-8f897a76-7950-4a7d-a20e-f67537f32254.jpeg";


  // console.log("checking what the hell this time is~~~~`", moment(comment?.created_at).fromNow())

  // console.log("what is created at", comment?.created_at)

  return (
    <div className="song-comment-item-container">
      <div className="creator-pic">
        <Link className="link" to={`/users/${comment.user_id}`}><img
          className="prof-pic"
          src={
            comment.user?.profile_image_url
              ? comment.user.profile_image_url
              : profPic
          }
          alt=""
        />
        </Link>
      </div>
      <div className="user-name-time-and-edit-body-outer-container">

        <div className="user-name-time-created-at-body">
          <div className="creator-name">
            <Link className="link" to={`/users/${comment.user_id}`}>{comment.user?.display_name}</Link>
          </div>
          <div className="comment-created-at">{moment(comment?.created_at).fromNow()}</div>

        </div>
        <div className="comment-body">
          {editing ? (
            <CreateComment currentComment={comment} setEditing={setEditing} />
          ) : (
            comment?.body
          )}
        </div>
        <div className="created-at-edit-delete">

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
      </div>
    </div>
  );
};

export default SongCommentItem;
