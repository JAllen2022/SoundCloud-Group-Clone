import { useEffect, useState } from "react";
// import { useHistory, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../../context/Modal";
import { editUserThunk } from "../../../store/session";
import { loadUser } from "../../../store/userPage";
import profPic from "../../../assets/profPic.jpeg";

import './EditUserPageForm.css'

const EditUserPageForm = () => {
  const dispatch = useDispatch();
  // const history = useHistory();

  const { closeModal } = useModal();
  // const { userId } = useParams();
  // const [user, setUser] = useState({});

  const currentUser = useSelector((state) => state.session.user);
  // const user = useSelector((state) => state.UserPage.user);

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

  const [profileImage, setProfileImage] = useState("");
  //   const [headerImage, setHeaderImage] = useState("");
  const [displayName, setDisplayName] = useState(
    currentUser?.display_name || ""
  );
  const [firstName, setFirstName] = useState(currentUser?.first_name || "");
  const [lastName, setLastName] = useState(currentUser?.last_name || "");
  const [city, setCity] = useState(currentUser?.city || "");
  const [country, setCountry] = useState(currentUser?.country || "");
  const [bio, setBio] = useState(currentUser?.bio || "");
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const newErrors = { ...errors };
    if (displayName?.length === 0)
      newErrors["DisplayName"] = "Please enter a display name.";
    setErrors(newErrors);
  }, [displayName]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setErrors([]);

    const data = new FormData();
    if (typeof profileImage === "object")
      data.append("profile_picture", profileImage);
    // if (typeof headerImage === "object")
    //   data.append("header_picture", headerImage);
    data.append("display_name", displayName);
    data.append("first_name", firstName);
    data.append("last_name", lastName);
    data.append("city", city);
    data.append("country", country);
    data.append("bio", bio);

    const res = await dispatch(editUserThunk(data, currentUser.id));

    if (res.errors) {
      const newErrors = { ...errors, ...res };
      setErrors(newErrors);
      return;
    } else {
      dispatch(loadUser(res));
      closeModal();
      setErrors({});
    }
  };

  const updateProfileImage = (e) => {
    const file = e.target.files[0];
    if (file?.size > 1000000) {
      const newError = { ...errors };
      newError["ImageSize"] = "File size too large. Maximum image size: 1MB.";
      setErrors(newError);
      // console.log("checking errors", newError, errors);
      e.target.value = "";
      return;
    }
    // If we have a file size error, remove it when a appropriate file is added
    if (errors.ImageSize) {
      const newErrors = { ...errors };
      delete newErrors.ImageSize;
      setErrors(newErrors);
    }
    if (errors.errors) {
      const newErrors = { ...errors };
      delete newErrors.errors;
      setErrors(newErrors);
    }
    setProfileImage(file);
  };
  const profPic = "https://user-images.githubusercontent.com/110946315/219914467-8f897a76-7950-4a7d-a20e-f67537f32254.jpeg";

  return (
    <div className="modal-container edit-user-page-container">
      <div className="edit-user-page-close-modal">
        <button onClick={() => closeModal()} className="x-button">
          <i className="fa-solid fa-x"></i>
        </button>
      </div>
      <div className="edit-user-page-header">
        <h2 className='edit modal-form-title'>Edit your Profile</h2>
      </div>
      {errors.errors && (
        <ul className='errors'>
          <li style={{ color: "red" }} className="upload-page-errors">
            {errors.errors}
          </li>
        </ul>
      )}
      <div className="modal-form-container">
      <form
        className="edit-user-page-form"
        method="POST"
        onSubmit={handleSubmit}
      >
        <div className="edit-user-page-body">
          <div className="edit-user-page-body-left">
            <div className="custom-upload">
              <img className="edit-prof-image" alt='' src={currentUser.profile_image_url ? currentUser.profile_image_url : profPic} />
              {/* <div className="input-image-containe"> */}

                <label className='profile-pic-file-label' htmlFor="profile-pic-file"><img className='cam' src='https://user-images.githubusercontent.com/110946315/219857807-5feb84a5-23c2-4cb4-b4bf-fc6f78c277f1.png' alt='' />Upload Image</label>
              {/* </div> */}
              <input
                id="profile-pic-file"
                className='input-item file-input'
                name="profile-pic-file"
                type="file"
                accept="image/*"
                onChange={updateProfileImage}
              />
            </div>
          </div>
          {errors.ImageSize && (
            <p style={{ color: "red" }}>{errors.ImageSize}</p>
          )}
          <div className="edit-user-page-body-right">
            <div className="edit-user-page-displayname-container">
              <label className='input-label display' htmlFor="edit-user-page-displayname">Display name</label>
              <input
                className='input-item display'
                name="edit-user-page-displayname"
                type="text"
                required
                maxLength="15"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
              />
            </div>
            <div>
              {errors.DisplayName && (
                <p style={{ color: "red" }}>{errors.DisplayName}</p>
              )}
            </div>
            <div className="edit-user-page-name-container">
              <div className="edit-user-page-grid-field">
                <label className='input-label' htmlFor="first_name">First Name</label>
                <input
                  className='input-item double'
                  name="first_name"
                  type="text"
                  value={firstName}
                  maxLength="15"
                  onChange={(e) => setFirstName(e.target.value)}
                ></input>
              </div>
              <div className="edit-user-page-grid-field">
                <label className='input-label' htmlFor="first_name">Last Name</label>
                <input
                  className='input-item double'
                  name="first_name"
                  type="text"
                  value={lastName}
                  maxLength="15"
                  onChange={(e) => setLastName(e.target.value)}
                ></input>
              </div>
            </div>
            <div className="edit-user-page-name-container">
              <div className="edit-user-page-grid-field">
                <label className='input-label' htmlFor="city">City</label>
                <input
                  className='input-item double'
                  name="city"
                  type="text"
                  value={city}
                  maxLength="15"
                  onChange={(e) => setCity(e.target.value)}
                ></input>
              </div>
              <div className="edit-user-page-grid-field">
                <label className='input-label' htmlFor="country">Country</label>
                <input
                  className='input-item double'
                  name="country"
                  type="text"
                  maxLength="15"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                ></input>
              </div>
            </div>
            <div className="edit-user-page-bio-container">
              <label className='input-label text' htmlFor="biography">Biography</label>
              <textarea
                className='input-item text-big'
                name="biography"
                placeholder="Tell the world a little bit about yourself. The shorter the better."
                value={bio}
                maxLength="200"
                onChange={(e) => setBio(e.target.value)}
              ></textarea>
            </div>
          </div>
        </div>
          <div className="edit-user-page-footer">
            <button id='modal-btns' type='button' className="edit-user-page-button cancel" onClick={() => closeModal()}>
            {" "}Cancel{" "}
            </button>
            <button id='modal-btns' className="edit-user-page-button submit">
              {" "}
              Save Changes{" "}
            </button>
          </div>
      </form>
      </div>
    </div>
  );
};

export default EditUserPageForm;
