import { useDispatch, useSelector } from 'react-redux';
import { useParams } from "react-router-dom";
import { useEffect } from 'react';
import { loadUserCommentsThunk } from '../../../store/comments';
import "./UserPageComment.css";
import commentBox from '../../../assets/icons8-comments-30.png';
import { Link } from "react-router-dom";
import UserCommentItem from '../UserCommentItem/userCommentItem';

const UserPageComments = () => {
    const dispatch = useDispatch();
    const userComments = useSelector(state => state.Comments.user);
    const user = useSelector(state => state.session.user);

    let userCommentsArr;
    if (userComments) userCommentsArr = Object.values(userComments);

    const { userId } = useParams;

    useEffect(() => {
        dispatch(loadUserCommentsThunk(userId))
    }, [dispatch, userId])

    if (!userComments) return null;

    const userCommentItems = userCommentsArr.map((comment) => {
        return <UserCommentItem key={comment.id} comment={comment} />
    })

    if (!user) return null;

    return (
        <div className="user-comments-header">
            <Link className="view-all-comments-link" to={`/users/${user.id}/comments`}>
                <div className="latest-comments">
                    <img src={commentBox} className="comment-box" alt="" />
                    <p>Latest Comments</p>
                </div>
                <p>View all</p>
            </Link>
            <div className='user-comments-area'>
                <ul className='user-comment-wrapper'>
                    {userCommentItems}
                </ul>
            </div>
        </div>
    )
}

export default UserPageComments;
