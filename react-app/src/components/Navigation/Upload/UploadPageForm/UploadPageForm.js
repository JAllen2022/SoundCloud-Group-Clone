import { Link } from "react-router-dom";
import "./UploadPageForm.css";

const genres = [
  "Alternative Rock",
  "Ambient",
  "Classical",
  "Dance & EDM",
  "Dancehall",
  "Deep House",
  "Disco",
  "Drum & Bass",
  "Dubstep",
  "Electronic",
  "Folks & Singer-Songwriter",
  "Hip-hop & Rap",
  "House",
  "Indie",
  "Jazz & Blues",
  "Latin",
  "Metal",
  "Piano",
  "R&B & Soul",
  "Reggaeton",
  "Rock",
  "Soundtrack",
  "Techno",
  "Trance",
  "Trap",
  "Triphop",
  "World",
];

const UploadPageForm = ({
  title,
  setTitle,
  genre,
  setGenre,
  artist,
  setArtist,
  description,
  setDescription,
  // songImage,
  setSongImage,
  errors,
  setErrors,
  imageRef,
}) => {
  const updateImage = (e) => {
    // console.log("updating image");
    const file = e.target.files[0];
    if (file.size > 1000000) {
      const newError = { ...errors };
      newError["ImageSize"] = "File size too large. Maximum image size: 1MB.";
      setErrors(newError);
      e.target.value = "";
      return;
    }
    // If we have a file size error, remove it when a appropriate file is added
    if (errors.ImageSize) {
      const newErrors = { ...errors };
      delete newErrors.ImageSize;
      setErrors(newErrors);
    }

    if (file) {
      const reader = new FileReader();
      reader.onload = function (e) {
        imageRef.current.src = e.target.result;
      }
      reader.readAsDataURL(file)
    }
    setSongImage(file);
  };

  return (

    <div className="upload-page-form-container">
      <div className="tab-container">
        <h2 className="basic-info-tab">Basic Info</h2>
      </div>
      <div className="form-container">
        <div className="up-song-image-container custom-upload">
          <img
            ref={imageRef}
            className="up-song-image"
            src="https://user-images.githubusercontent.com/110946315/218864866-8fe7c616-38fc-460c-a177-1e2065ea8fca.jpeg"
            alt=""
          />
          <label className="up-song-img-label" htmlFor="upload-song-image">
            <img
              className="cam"
              src="https://user-images.githubusercontent.com/110946315/219857807-5feb84a5-23c2-4cb4-b4bf-fc6f78c277f1.png"
              alt=""
            />
            Upload Image
          </label>
          {/* <img src="https://user-images.githubusercontent.com/110946315/218864866-8fe7c616-38fc-460c-a177-1e2065ea8fca.jpeg" alt="preview image"/> */}
          <input
            className="input-item"
            id="upload-song-image"
            name="input-item file-input upload-song-image-file"
            type="file"
            accept="image/*"
            onChange={updateImage}
          />
        </div>
        <div className="song-details-container">
          <div className="song-artist-container">
            <label htmlFor="song-artist" className="input-label">
              Artist
            </label>
            <input
              className="input-item"
              // className="song-input-field"
              required
              name="form-song-artist"
              minLength="4"
              maxLength="20"
              value={artist}
              onChange={(e) => setArtist(e.target.value)}
            />
          </div>
          <div className="song-title-container">
            <label htmlFor="song-title" className="input-label">
              Title
            </label>
            <input
              className="input-item"
              // className="song-input-field"
              required
              name="form-song-title"
              minLength="4"
              maxlength="40"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="genre-container">
            <label htmlFor="genre" className="input-label">
              Genre
            </label>
            <select
              className="input-item select"
              name="genre"
              value={genre}
              onChange={(e) => setGenre(e.target.value)}
            >
              {genres.map((ele, indx) => (
                <option key={indx} value={ele}>
                  {ele}
                </option>
              ))}
            </select>
          </div>
          <div className="description-container">
            <label htmlFor="song-description" className="input-label">
              Description
            </label>
            <textarea
              className="input-item text-area"
              // className="song-input-field"
              placeholder="Describe your track"
              name="song-description"
              value={description}
              maxLength="200"
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
        </div>
      </div>
      <div className="up-buttons">
        <Link id='modal-btns' to='/songs' className=" edit-user-page-button cancel" >
          Cancel
        </Link>
        <button
          id="modal-btns"
          className="upload edit-user-page-button submit"
          type="submit"
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default UploadPageForm;
