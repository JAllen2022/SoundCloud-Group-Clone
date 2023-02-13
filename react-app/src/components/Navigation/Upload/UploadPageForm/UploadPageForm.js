import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
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
}) => {
    return (
        <div className="upload-page-form-container">
            <h1 className="basic-info-tab">Basic Info</h1>
            <div className="form-container">
                <div className="song-image-container">
                    <img className="song-image" alt="" src="" />
                </div>
                <div className="song-details-container">
                    <div className="song-artist-container">
                        <label
                            for="song-artist"
                            className="form-song-artist label-description"
                        >
                            Artist
                        </label>
                        <input
                            className="song-input-field"
                            required
                            name="form-song-artist"
                            value={artist}
                            onChange={(e) => setArtist(e.target.value)}
                        />
                    </div>
                    <div className="song-title-container">
                        <label
                            for="song-title"
                            className="form-song-title label-description"
                        >
                            Title
                        </label>
                        <input
                            className="song-input-field"
                            required
                            name="form-song-title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </div>
                    <div className="genre-container">
                        <label for="genre" className="label-description">
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
                        <lable
                            for="song-description"
                            className="label-description"
                        >
                            Description
                        </lable>
                        <textarea
                            className="song-input-field"
                            placeholder="Describe your track"
                            required
                            name="song-description"
                            value={description}
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
