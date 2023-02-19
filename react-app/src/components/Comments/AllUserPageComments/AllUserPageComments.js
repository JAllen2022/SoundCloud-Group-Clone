import { useDispatch, useSelector } from "react-redux";
// import UserPageComments from "../UserPageComments/UserPageComments";
import { Link, useParams } from "react-router-dom";
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
  const profPic = "https://user-images.githubusercontent.com/110946315/219914467-8f897a76-7950-4a7d-a20e-f67537f32254.jpeg";

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
    <div className="page-outer-container">
      <div className="page-container">
        <div className="auc-header">
          <Link to={`/users/${user.id}`}>
            <div className="auc-image-title-container">
              <img
                className="auc-prof-pic"
                src={user?.profile_image_url ? user.profile_image_url : profPic}
                alt=""
                />
              <h2 className="auc-comments-name">Comments by {user.display_name ? user.display_name : user.username}</h2>
            </div>
          </Link>
          <div className="auc-tab-container">
            <h2 className='aul-tab-title'>Comments</h2>
          </div>
        </div>
        <div className="auc-main-title">
          <div className="auc-body">
            {userCommentItems}
          </div>
        </div>
      </div>
    </div>

  );
};


// return (
//   <div className="aul-page">
//       <div className="aul-header">
//           <Link to={`users/${user.id}`}>
//               <div className="aul-image-title-container">
//                   <img className="aul-prof-image" src={user?.profile_image_url ? user.profile_image_url : profPic} alt={user?.display_name} />
//                   <h1 className="aul-likes-name">Likes by {user.display_name}</h1>
//               </div>
//           </Link >
//           <div className="aul-tab-container">
//               <h2 className='aul-tab-title'>Likes</h2>
//           </div>
//       </div>
//       <div className="aul-main-title">
//           <div className="aul-body">
//               {userLikeArray}
//           </div>
//       </div>
//   </div>
// )

export default AllUserPageComments;
