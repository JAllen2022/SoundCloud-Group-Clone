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
  setSongImage,
  errors,
  setErrors,
}) => {
  const updateImage = (e) => {
    console.log("updating image");
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
    setSongImage(file);
  };

  return (
    <div className="upload-page-form-container">
      <h1 className="basic-info-tab">Basic Info</h1>
      <div className="form-container">
        <div className="song-image-container">
          <label htmlFor="upload-song-image">Click Here To Choose A File</label>
          {/* <img src="https://user-images.githubusercontent.com/110946315/218864866-8fe7c616-38fc-460c-a177-1e2065ea8fca.jpeg" alt="preview image"/> */}
          <input
            id="upload-song-image-file"
            name="upload-song-image-file"
            type="file"
            accept="image/*"
            onChange={updateImage}
          />
        </div>
        <div className="song-details-container">
          <div className="song-artist-container">
            <label
              htmlFor="song-artist"
              className="form-song-artist label-description"
            >
              Artist
            </label>
            <input
              className="song-input-field"
              required
              name="form-song-artist"
              minlength="4"
              maxlength="20"
              value={artist}
              onChange={(e) => setArtist(e.target.value)}
            />
          </div>
          <div className="song-title-container">
            <label
              htmlFor="song-title"
              className="form-song-title label-description"
            >
              Title
            </label>
            <input
              className="song-input-field"
              required
              name="form-song-title"
              minlength="4"
              maxlength="40"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="genre-container">
            <label htmlFor="genre" className="label-description">
              Genre
            </label>
            <select
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
            <label htmlFor="song-description" className="label-description">
              Description
            </label>
            <textarea
              className="song-input-field"
              placeholder="Describe your track"
              name="song-description"
              value={description}
              maxLength="200"
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <button className="save-song-button" type="submit">
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default UploadPageForm;
