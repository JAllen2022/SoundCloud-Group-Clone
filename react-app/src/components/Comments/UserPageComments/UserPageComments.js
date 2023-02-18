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
    <div className="user-page-comments-container">
      <div className="user-page-comment-header-container">
      <Link
        className="user-page-comment-header-link-container"
        to={`/users/${user.id}/comments`}
      >

          <div className="user-page-comment-box-container">
            <img src={commentBox} className="user-page-comment-box" alt="comment tag" />
            <p className="user-page-comment-header-ptags">Latest Comments</p>
          </div>
          <p className="user-page-comment-header-ptags">View all</p>
      </Link>

        </div>
      <div className="user-comments-area">
        {userCommentItems}
      </div>
    </div>
  );
};

export default UserPageComments;
