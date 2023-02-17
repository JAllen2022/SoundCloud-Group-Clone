import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { loadUserCommentsThunk } from "../../../store/comments";
import commentBox from "../../../assets/icons8-comments-30.png";
import { Link } from "react-router-dom";
import { loadUserThunk } from "../../../store/userPage";
import UserCommentItem from "../UserCommentItem/UserCommentItem";
import "./UserPageComment.css";

const UserPageComments = () => {
  const dispatch = useDispatch();
  const userComments = useSelector((state) => state.Comments.user);
  console.log("userComments:", userComments);
  const user = useSelector((state) => state.UserPage.userProfile);
  const { userId } = useParams;

  let userCommentItems;
  if (Object.values(userComments).length) {
    const tempArray = Object.values(userComments).slice(0, 7);
    userCommentItems = tempArray.map((comment) => (
      <UserCommentItem key={comment.id} comment={comment} />
    ));
  }

  useEffect(() => {
    // if (Object.values(userComments).length) {
        dispatch(loadUserThunk(userId));
        dispatch(loadUserCommentsThunk(userId));
        console.log('here')
    // }
  }, [dispatch, userId]);

  if (!Object.values(userComments).length) return null;

  return (
    <div className="user-comments-header">
      <Link
        className="view-all-comments-link"
        to={`/users/${user.id}/comments`}
      >
        <div className="latest-view-all">
          <div className="latest-comments">
            <img src={commentBox} className="comment-box" alt="" />
            <p>Latest Comments</p>
          </div>
          <p>View all</p>
        </div>
      </Link>
      <div className="user-comments-area">
        <ul className="user-comment-wrapper">{userCommentItems}</ul>
      </div>
    </div>
  );
};

export default UserPageComments;
