import { useDispatch } from "react-redux";
import "./AllUserPageComments.css";
import UserPageComments from "../UserPageComments/UserPageComments";
import profPic from "../../../assets/profPic.jpeg";
import { useParams } from 'react-router-dom';

const AllUserPageComments = () => {
    const dispatch = useDispatch();
    const { userId } = useParams();

    return (
        <div className="all-user-comments-container">
            <div className="all-user-comments-header">
                <div className="user-comments-pic">
                    <img className="user-comments-prof-pic" src={user?.profile_image_url ? user.profile_image_url : profPic} alt="" />
                </div>
                <div className="comments-by">
                    Comments by {}
                </div>
            </div>
            <div className="all-user-comments">
                <UserPageComments />
            </div>
        </div>
    )

}

export default AllUserPageComments;
