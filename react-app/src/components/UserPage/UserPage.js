import "./UserPage.css";
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

const UserPage = () => {
    const { userId } = useParams();
    const [user, setUser] = useState({});

    useEffect(() => {
        if (!userId) {
            return;
        }
        (async () => {
            const res = await fetch(`/api/users/${userId}`);
            const user = await res.json();
            setUser(user);
        })();
    }, [userId]);

    if (!user) {
        return null;
    }

    return (
        <div className="user-page-container">
            <div className="user-page-header">
                <div className="prof-pic-info">
                    <div className="user-prof-pic">
                        {user.profile_image_url}
                    </div>
                    <div className="user-info">
                        <div className="user-page-display-name">
                            {user.display_name}
                        </div>
                        <div className="user-first-last">
                            {user.first_name} {user.last_name}
                        </div>
                        <div className="user-city">
                            {user.city}
                        </div>
                        <div className="user-country">
                            {user.country}
                        </div>
                    </div>
                </div>
            </div>
            <div className="user-page-nav-container">
                <div className="tracks-edit-prof">
                </div>
            </div>
        </div>
    )

}

export default UserPage;
