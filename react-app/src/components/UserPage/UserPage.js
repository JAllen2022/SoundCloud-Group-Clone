import "./UserPage.css";
// import { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import OpenModalButton from "../OpenModalButton";
import EditUserPageForm from "./EditUserPageForm/EditUserPageForm";
import { useEffect } from "react";
import { loadUserThunk } from "../../store/userPage";
import UserSongs from "./UserSongs/UserSongs";
import { getUserSongsThunk } from "../../store/songs";

const UserPage = () => {
    const { userId } = useParams();
    // const [user, setUser] = useState({});
    const dispatch = useDispatch()
    const currentUser = useSelector(state => state.session.user);
    const user = useSelector(state => state.UserPage.userProfile);

    // console.log(user)

    // useEffect(() => {
    //     if (!userId) {
    //         return;
    //     }
    //     (async () => {
    //         const res = await fetch(`/api/users/${userId}`);
    //         const user = await res.json();
    //         setUser(user);
    //     })();
    // }, [userId]);

    // if (!user) {
    //     return null;
    // }

    useEffect(() => {
        dispatch(loadUserThunk(userId))
    }, [dispatch, userId])

    return (
        <div className="user-page-container">
            <div className="user-page-header">
                <div className="prof-pic-info">
                    <div className="user-prof-pic">
                        {user?.profile_image_url}
                    </div>
                    <div className="user-info">
                        <div className="user-page-display-name">
                            {user?.display_name}
                        </div>
                        <div className="user-first-last">
                            {user?.first_name} {user?.last_name}
                        </div>
                        <div className="user-city">
                            {user?.city}
                        </div>
                        <div className="user-country">
                            {user?.country}
                        </div>
                    </div>
                </div>
            </div>
            <div className="user-page-nav-container">
                <div className="user-page-nav">
                    <Link className="user-page-nav-links">
                        Tracks
                    </Link>
                    <Link className="user-page-nav-links">
                        Playlist
                        {/* this is a future feature - will pop-up modal that shows "Feature Pending" */}
                    </Link>
                    {currentUser && currentUser.id == userId ?
                        <div className="edit-user-profile-button">
                            <OpenModalButton
                                className="edit-user-modal-button"
                                modalComponent={<EditUserPageForm />}
                                buttonText={<i className="fa-regular fa-pen-to-square"></i>}
                            />
                        </div> : ""
                    }
                    <div className="edit-user-page-"></div>
                </div>
            </div>
            <div className="user-page-body-container">
                <div className="left-user-page-body-container">
                    <UserSongs />
                </div>

            </div>
        </div>

    )

}

export default UserPage;
