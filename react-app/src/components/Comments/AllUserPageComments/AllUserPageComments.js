import { useDispatch, useSelector } from "react-redux";
import UserPageComments from "../UserPageComments/UserPageComments";
import profPic from "../../../assets/profPic.jpeg";
import { useParams } from "react-router-dom";
// import commentBox from "../../../assets/icons8-comments-30.png";
import "./AllUserPageComments.css";
import { useEffect } from "react";
import { loadUserCommentsThunk } from "../../../store/comments";
import { loadUserThunk } from "../../../store/userPage";
import UserCommentItem from "../UserCommentItem/UserCommentItem";

const AllUserPageComments = () => {
  const dispatch = useDispatch();
  const { userId } = useParams();
  const user = useSelector((state) => state.UserPage.userProfile);
  const userComments = useSelector((state) => state.Comments.user);

  let userCommentItems;
  if (Object.values(userComments).length) {
    const tempArray = Object.values(userComments);
    userCommentItems = tempArray.map((comment) => (
      <UserCommentItem key={comment.id} comment={comment} />
    ));
  }

  useEffect(() => {
    if (!Object.values(user).length) dispatch(loadUserThunk(userId));
    if (!Object.values(userComments).length)
      dispatch(loadUserCommentsThunk(userId));
  }, [dispatch, userId]);

  return (
    <div className="all-user-comments-container">
      <div className="all-user-comments-header">
        <div className="user-comments-pic">
          <img
            className="user-comments-prof-pic"
            src={user?.profile_image_url ? user.profile_image_url : profPic}
            alt=""
          />
        </div>
        <div className="comments-by">Comments by {user?.display_name}</div>
      </div>
      <div className="all-user-comments">{userCommentItems}</div>
    </div>
  );
};

export default AllUserPageComments;
