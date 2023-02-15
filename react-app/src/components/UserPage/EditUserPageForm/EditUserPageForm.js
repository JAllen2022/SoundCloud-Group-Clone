import { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useModal } from '../../../context/Modal';
import { editUserThunk } from '../../../store/session';
import { loadUser } from '../../../store/userPage';

const EditUserPageForm = () => {
    const dispatch = useDispatch();
    // const history = useHistory();

    const { closeModal } = useModal();
    // const { userId } = useParams();
    // const [user, setUser] = useState({});

    const currentUser = useSelector(state => state.session.user);
    const user = useSelector(state => state.UserPage.user);

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

    const [profilePic, setProfilePic] = useState(currentUser?.profile_image_url || "");
    const [displayName, setDisplayName] = useState(currentUser?.display_name || "");
    const [firstName, setFirstName] = useState(currentUser?.first_name || "");
    const [lastName, setLastName] = useState(currentUser?.last_name || "");
    const [city, setCity] = useState(currentUser?.city || "");
    const [country, setCountry] = useState(currentUser?.country || "");
    const [bio, setBio] = useState(currentUser?.bio || "");
    const [errors, setErrors] = useState([]);

    useEffect(() => {
        const errors = [];
        if (displayName?.length === 0) errors.push("Please enter a display name.");

        setErrors(errors);
    }, [displayName])


    const handleSubmit = async (e) => {
        e.preventDefault();

        const editedUser = {
            profile_image_url:profilePic,
            display_name:displayName,
            first_name:firstName,
            last_name:lastName,
            city,
            country,
            bio,
            id: currentUser.id
        }

        dispatch(editUserThunk(editedUser))
            .then((user) => {
                dispatch(loadUser(user))
                closeModal()
            })
            .catch(async (res) => {
                const data = await res.json();
                if (data && data.errors) setErrors(data.errors)
            })

    };

    return (
        <div className="edit-user-page-container">
            <div className="edit-user-page-close-modal">
                <button onClick={()=>closeModal()} className='x'>
                    <i className="fa-solid fa-x"></i>
                </button>
            </div>
            <div className="edit-user-page-header">
                <h2>Edit your Profile</h2>
            </div>
            <form className="edit-user-page-form" method="POST" onSubmit={handleSubmit} >
                <div className="edit-user-page-body">
                    <div className="edit-user-page-body-left">
                        {/* <div>
                            <label htmlFor="profile-pic-file">Update image</label>
                            <input name="profile-pic-file" type="file" accept="image/*" />
                        </div> */}
                    </div>
                    <div className="edit-user-page-body-right">
                            <ul className='user-page-errors'>
                                {errors.map((error, idx) => <li key={idx}>{error}</li>)}
                            </ul>
                            <div className="edit-user-page-displayname-container">
                                <label htmlFor="edit-user-page-displayname">Display name</label>
                                <input name="edit-user-page-displayname" type="text" required value={displayName} onChange={(e) => setDisplayName(e.target.value)}/>
                            </div>
                            <div className="edit-user-page-name-container">
                                <div className="edit-user-page-grid-field">
                                    <label htmlFor="first_name">First Name</label>
                                    <input name="first_name" type="text" value={firstName} onChange={(e)=>setFirstName(e.target.value)}></input>
                                </div>
                                <div className="edit-user-page-grid-field">
                                    <label htmlFor="first_name">Last Name</label>
                                    <input name="first_name" type="text" value={lastName} onChange={(e) => setLastName(e.target.value)}></input>
                                </div>
                            </div>
                            <div className="edit-user-page-name-container">
                                <div className="edit-user-page-grid-field">
                                    <label htmlFor="city">City</label>
                                    <input name="city" type="text" value={city} onChange={(e) => setCity(e.target.value)}></input>
                                </div>
                                <div className="edit-user-page-grid-field">
                                    <label htmlFor="country">Country</label>
                                    <input name="country" type="text" value={country} onChange={(e) => setCountry(e.target.value)}></input>
                                </div>
                            </div>
                            <div className="edit-user-page-bio-container" >
                                <label htmlFor="biography">Biography</label>
                                <textarea name="biography" placeholder="Tell the world a little bit about yourself. The shorter the better." value={bio} onChange={(e) => setBio(e.target.value)}></textarea>
                            </div>
                        </div>
                    <div className="edit-user-page-footer">
                        <div className="edit-user-page-cancel" onClick={()=>closeModal()}>Cancel</div>
                        <button className="edit-user-page-save-changes"> Save Changes </button>
                    </div>
                </div>
            </form>

        </div>



    )
}

export default EditUserPageForm;
